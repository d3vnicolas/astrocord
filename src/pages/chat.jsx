import React, { useEffect } from 'react';
import { Box, Text, TextField, Button } from '@skynexui/components';
import MessageList from '../Components/MessageList';
import appConfig from '../../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../Components/ButtonSendSticker';


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

    const handleNovaMsg = (msg) => {
        //monta um objeto com a mensagem nova
        const newMsg = {
            origin: user,
            content: msg,
        }

        //insert da nova mensagem no supabase
        supabaseClient.from('mensagens')
            .insert([newMsg])
            .then();

        setMensagem(''); //limpa o textarea
    }

    useEffect(() => {
        /* 
            desvio temporário caso o username não seja preenchido
        */
        if(user){
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
        }else{
            roteamento.push('/')
        }
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

                    <MessageList listaMsg={listaMsg} setListaMsg={setListaMsg} load={load} SUPABASE_ANON_KEY={SUPABASE_ANON_KEY} SUPABASE_URL={SUPABASE_URL} />

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

