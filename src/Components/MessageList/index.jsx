import React from 'react';
import { Image, Box, Button, Text } from '@skynexui/components';
import LoadContent from '../../Components/PlaceholderLoad';
import ClickNHold from 'react-click-n-hold';
import appConfig from '../../../config.json';
import { createClient } from '@supabase/supabase-js';


export default function MessageList({ listaMsg, setListaMsg, load, SUPABASE_ANON_KEY, SUPABASE_URL, setProfile }) {

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const handleDelMsg = async id => {
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
                const date = new Date(mensagem.created_at);
                return (
                    <ClickNHold
                        key={key}
                        time={1}
                        onClickNHold={() => setProfile({show: true, user: mensagem.origin})}
                    >
                        
                        <Text
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
                                    src={`https://github.com/${mensagem.origin}.png`}
                                    onClick={() => setProfile({show: true, user: mensagem.origin})}
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
                                        {mensagem.origin}
                                    </Text>
                                    <Text
                                        styleSheet={{
                                            fontSize: '10px',
                                            marginRight: '8px',
                                            color: appConfig.theme.colors.neutrals[200],
                                        }}
                                        tag="span"
                                    >
                                        {date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }) + ' às ' + date.toLocaleTimeString('pt-BR', {timeStyle: 'short'})}
                                    </Text>
                                </Box>
                                <Button
                                    onClick={() => handleDelMsg(mensagem.id)}
                                    iconName="FaTimes"
                                    variant="secondary"
                                    rounded="full"
                                    styleSheet={{
                                        display: { xs: 'none', sm: 'block' },
                                        marginLeft: 'auto',
                                        fontSize: '22px',
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