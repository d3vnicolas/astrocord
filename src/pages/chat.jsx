import React, { useEffect } from 'react';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { IoCloseOutline } from 'react-icons/io5';
import appConfig from '../../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../Components/ButtonSendSticker';
import LoadContent from '../Components/PlaceholderLoad';
import Profile from '../Components/Profile';
import ClickNHold from 'react-click-n-hold';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNjA4MiwiZXhwIjoxOTU4ODkyMDgyfQ.kt0_M_4PARTmDTLiKhwvHSmp6aCKH4xVN9qmzTZagYs';
const SUPABASE_URL = 'https://djhffvaqgiebncwviver.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listenerInsert(addUpdates) {
    return supabaseClient.from('mensagens')
        .on('INSERT', res => addUpdates(res)).subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const user = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaMsg, setListaMsg] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const [showProfile, setShowProfile] = React.useState(false);
    const handleNovaMsg = (msg) => {
        //monta um objeto com a mensagem nova
        const newMsg = {
            from: user,
            content: msg,
        }

        //insert da nova mensagem no supabase
        supabaseClient.from('mensagens')
            .insert([newMsg])
            .then();

        setMensagem(''); //limpa o textarea
    }

    useEffect(() => {
        supabaseClient.from('mensagens').select('*').order('id', { ascending: false }).then(({ data }) => {
            setListaMsg(data);
            setLoad(false);
        });

        listenerInsert((data) => { //dispara sempre que houver um insert na tabela mensagens.
            /* 
                Passando uma callback no setState, capturamos sempre
                seu valor atualizado
            */
            setListaMsg(updateValue => {
                return [
                    data.new,
                    ...updateValue //... espalha o array para não criar um array dentro do array
                ]
            });
        });
    }, []);

    return (

        <Box /* background */
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(https://images.unsplash.com/photo-1504333638930-c8787321eee0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}

        >
            <Box /* card */
                className='card'
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    maxWidth: '1440px',
                    height: '100%',
                    maxHeight: '90%',
                    overflow: 'auto',
                    padding: '32px',
                    borderRadius: '15px', padding: '32px', margin: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.149)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(235, 235, 235, 0.1)',
                    backdropFilter: 'blur(3px)',
                }}
            >
                <Header />
                <style jsx>{`
                    div.card{
                        position: relative;
                        display: flex;
                        flex: 1;
                        height: 50%;
                        flex-direction: column;
                        padding: 0px 16px 0px 0;
                        border-radius: 15px;
                        margin-bottom: 16px;
                        border: 1px solid rgba(255, 255, 255, 0.129);
                        box-shadow: inset 0px 0px 6px 0px #0000007c;
                        background-color: rgba(235, 235, 235, 0);
                        -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
                        -ms-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
                        -moz-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);
                    } 
                `}</style>
                <div className='card'>

                    <MessageList listaMsg={listaMsg} setListaMsg={setListaMsg} load={load} setShowProfile={setShowProfile} />
                    {showProfile && <Profile setShowProfile={setShowProfile} />}

                </div>
                <Box
                    as="form"
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: {
                            sm: 'nowrap',
                            xs: 'wrap',
                        },
                    }}
                >
                    <TextField
                        value={mensagem}
                        onChange={event => setMensagem(event.target.value)}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                mensagem === '' ? false : handleNovaMsg(mensagem);
                            }
                        }}
                        placeholder="Digite aqui..."
                        type="textarea"
                        fullWidth
                        styleSheet={{
                            minHeight: '64px',
                            resize: 'none',
                            borderRadius: '15px',
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(1px)',
                            border: '1px solid rgba(255, 255, 255, 0.129)',
                            boxShadow: '0px 0px 6px 0px #0000007c',
                            color: appConfig.theme.colors.neutrals[200],
                            marginBottom: '-8px',
                            padding: '6px 8px',
                            hover: {
                                border: `1px solid ${appConfig.theme.colors.primary[300]}`,
                            },
                            focus: {
                                border: `1px solid ${appConfig.theme.colors.secondary[300]}`,
                            },
                        }}
                    />
                    <ButtonSendSticker
                        onStickerClick={(sticker) => {
                            handleNovaMsg(':sticker:' + sticker);
                        }}
                    />
                    <Button
                        onClick={() => handleNovaMsg(mensagem)}
                        disabled={mensagem === '' ? true : false}
                        label="Enviar"
                        styleSheet={{
                            flex: 1,
                            minWidth: '100px',
                            minHeight: '64px',
                            borderRadius: '15px',
                            margin: '0',
                            padding: '14px 0px',
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(1px)',
                            border: '1px solid rgba(255, 255, 255, 0.129)',
                            boxShadow: '0px 0px 6px 0px #0000007c',
                            hover: {
                                border: `1px solid ${appConfig.theme.colors.primary[300]}`,
                                backgroundColor: 'transparent'
                            },
                            focus: {
                                backgroundColor: 'transparent',
                                border: `1px solid ${appConfig.theme.colors.secondary[300]}`,
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <Box styleSheet={{
            width: '100%',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }} >
            <Text variant='heading3'
                styleSheet={{
                    color: appConfig.theme.colors.secondary[300],
                }}
            >
                Astro chat 🪐
            </Text>
            <Button
                iconName="arrowLeft"
                variant="secondary"
                href="/"
                styleSheet={{
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(1px)',
                    borderColor: 'rgba(255, 255, 255, 0.129)',
                    boxShadow: '0px 0px 6px 0px #0000007c',
                    color: appConfig.theme.colors.neutrals[200],
                    fontSize: '18px',
                    hover: {
                        borderColor: appConfig.theme.colors.secondary[300],
                        backgroundColor: 'transparent',
                        color: appConfig.theme.colors.neutrals[200],
                    },
                    focus: {
                        backgroundColor: 'transparent',
                    }
                }}
            />
        </Box>
    )
}

function MessageList({ listaMsg, setListaMsg, load, setShowProfile }) {

    // const [dragClose, setDragClose] = React.useState(false);

    const handleDelMsg = async (id) => {
        setListaMsg(updateValue => {
            return updateValue.filter(msg => msg.id !== id);
        });
        await supabaseClient
            .from('mensagens').delete().match({ 'id': id });
    }
    return (
        <Box
            tag="ul"
            styleSheet={{
                width: '100%',
                paddingRight: '4%',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals['000'],
                zIndex: 9,
            }}
        >
            {load && <LoadContent />}
            {listaMsg.map((mensagem, key) => {
                return (
                    <ClickNHold
                        time={1}
                        // onClickNHold={() => setDragClose(true)}
                    >
                        <Text
                            key={key}
                            tag="li"
                            styleSheet={{
                                borderRadius: '15px',
                                padding: '24px 16px',
                                transition: 'background 200ms ease',
                                hover: {
                                    backgroundColor: '#9898981f',
                                    backdropFilter: 'blur(2px)',
                                },
                            }}
                        >
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '8px',
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                        cursor: 'pointer'
                                    }}
                                    src={`https://github.com/${mensagem.from}.png`}
                                    onClick={() => setShowProfile(true)}
                                />
                                <Box
                                    styleSheet={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        justifyContent: 'left',
                                        flexWrap: { sm: 'no-wrap', xs: 'wrap' },
                                    }}
                                >
                                    <Text tag="strong"
                                        styleSheet={{
                                            fontSize: '16px',
                                            marginRight: '8px',
                                            color: appConfig.theme.colors.secondary[200],
                                        }}
                                    >
                                        {mensagem.from}
                                    </Text>
                                    <Text
                                        styleSheet={{
                                            fontSize: '10px',
                                            marginRight: '8px',
                                            color: appConfig.theme.colors.neutrals[200],
                                        }}
                                        tag="span"
                                    >
                                        {(new Date().toLocaleDateString())}
                                    </Text>
                                </Box>
                                <Button
                                    onClick={() => handleDelMsg(mensagem.id)}
                                    label={<IoCloseOutline style={{ width: '32px', height: '32px' }} />}
                                    variant="secondary"
                                    rounded="full"
                                    styleSheet={{
                                        display: { xs: 'none', sm: 'block' },
                                        marginLeft: 'auto',
                                        lineHeight: '5px',
                                        padding: '0',
                                        border: 'none',
                                        color: appConfig.theme.colors.primary[200],
                                        hover: {
                                            backgroundColor: 'transparent',
                                            color: appConfig.theme.colors.primary[200],
                                        },
                                        focus: {
                                            backgroundColor: 'transparent',
                                            color: appConfig.theme.colors.primary[200],
                                        },
                                    }}
                                />
                            </Box>
                            <Text
                                tag="p"
                                styleSheet={{
                                    marginLeft: '4px',
                                    marginTop: '16px',
                                }}
                            >
                                {mensagem.content.startsWith(':sticker:')
                                    ? (
                                        <Image src={mensagem.content.replace(':sticker:', '')}//trocando para nada || deletando
                                            styleSheet={{
                                                maxWidth: {
                                                    xs: '100px',
                                                    sm: '200px',
                                                }
                                            }}
                                        />
                                    )
                                    :
                                    (
                                        mensagem.content
                                    )}
                            </Text>
                        </Text>
                    </ClickNHold>
                );
            })}
        </Box>
    )
}