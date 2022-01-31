import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { IoCloseOutline } from 'react-icons/io5';
import React, { useEffect } from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/Components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNjA4MiwiZXhwIjoxOTU4ODkyMDgyfQ.kt0_M_4PARTmDTLiKhwvHSmp6aCKH4xVN9qmzTZagYs';
const SUPABASE_URL = 'https://djhffvaqgiebncwviver.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// function updateNew(addMsg){
//     return supabaseClient.from('mensagens')
//     .on('INSERT', (res) => {
//         addMsg(res.new);
//         console.log(addMsg);
//     }).subscribe();
// }

    function listenerModify(addUpdates){
        return supabaseClient.from('mensagens')
        .on('*', res => addUpdates(res)).subscribe();
    }

export default function ChatPage() {
    const roteamento = useRouter();
    const user = roteamento.query.username;
    const [mensagens, setMensagens] = React.useState('');
    const [listaMsg, setListaMsg] = React.useState([]);

    const handleNovaMsg = (msg) => {
        //monta um objeto com a mensagem nova
        const newMsg = {
            from: user,
            content: msg,
        }

        //insert da nova mensagem
        supabaseClient.from('mensagens')
        .insert([newMsg])
        .then();

        setMensagens(''); //limpa o textarea
    }

    useEffect(() => {
        supabaseClient.from('mensagens').select('*').order('id', { ascending: false }).then(({ data }) => {
            setListaMsg(data);
        });

        listenerModify(async (data) => { //dispara sempre que houver uma modificação na tabela mensagens.
            // console.log(data);
            if(data.eventType === 'INSERT'){
                /* 
                    Passando uma callback no setState, capturamos sempre
                    seu valor atualizado
                */
                await setListaMsg(updateValue => {
                    //setando um array no state; equivalente a push()
                    return [
                        data.new,
                        ...updateValue //... espalha o array para não criar um array dentro do array
                    ]
                })
            }else if(data.eventType === 'DELETE'){
                await setListaMsg(updateValue => {
                    return updateValue.filter(msg => msg.id !== data.old.id);
                });
            }
        })

        // updateNew((newMsg) => {
        //     setListaMsg((updateValue) => {
        //         return [
        //             newMsg,
        //             ...updateValue, //... espalha o array para não criar um array dentro do array
        //         ]
        //     });
        // });
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
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: {
                            sm: '70%',
                            xs: '50%',
                        },
                        flexDirection: 'column',
                        padding: '16px',
                        borderRadius: '15px',
                        marginBottom: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.129)',
                        boxShadow: 'inset 0px 0px 6px 0px #0000007c',
                        backgroundColor: 'rgba(235, 235, 235, 0)',
                    }}
                >

                    <MessageList listaMsg={listaMsg} />

                </Box>
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
                        value={mensagens}
                        onChange={event => setMensagens(event.target.value)}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleNovaMsg(mensagens);
                                // console.log(event.key);
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
                        onClick={() => handleNovaMsg(mensagens)}
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
                            border: {
                                xs: `1px solid ${appConfig.theme.colors.primary[300]}`,
                                sm: '1px solid rgba(255, 255, 255, 0.129)',
                            },
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
                Astro chat
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

function MessageList({ listaMsg }) {

    const handleDelMsg = async (id) => {
        await supabaseClient
        .from('mensagens').delete().match({ 'id': id });
    }


    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals['000'],
            }}
        >
            {listaMsg.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '15px',
                            padding: '24px 16px',
                            transition: 'background 200ms ease',
                            hover: {
                                backgroundColor: '#9898981f',
                                backdropFilter: 'blur(2px)',
                            }
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
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />
                            <Text tag="strong"
                                styleSheet={{
                                    fontSize: '16px',
                                    color: appConfig.theme.colors.secondary[200],
                                }}
                            >
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                onClick={() => handleDelMsg(mensagem.id)}
                                label={<IoCloseOutline style={{ width: '32px', height: '32px' }} />}
                                variant="secondary"
                                rounded="full"
                                styleSheet={{
                                    marginLeft: 'auto',
                                    lineHeight: '5px',
                                    padding: '0',
                                    border: 'none',
                                    color: appConfig.theme.colors.secondary[200],
                                    hover: {
                                        backgroundColor: 'transparent',
                                        color: appConfig.theme.colors.secondary[200],
                                    },
                                    focus: {
                                        backgroundColor: 'transparent',
                                        color: appConfig.theme.colors.secondary[200],
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
                                <Image src={mensagem.content.replace(':sticker:', '')} 
                                    styleSheet={{
                                        maxWidth: {
                                            xs: '100px',
                                            sm: '200px',
                                        }
                                    }}
                                /> //trocando para nada || deletando
                            )
                            :
                            (
                                mensagem.content
                            )}
                        </Text>
                    </Text>
                );
            })}
        </Box>
    )
}