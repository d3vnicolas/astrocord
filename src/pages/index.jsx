import React from 'react';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import appConfig from '../../config.json';

export default function PaginaInicial() {
    const [username, setUserName] = React.useState('github');
    const Route = useRouter();

    return (
        <>
            <Box /* fundo */
                styleSheet={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1504333638930-c8787321eee0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb)',
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover'
                }}
            >
                <Box /* card */
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column-reverse',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '15px', padding: '32px', margin: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.149)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'rgba(235, 235, 235, 0.1)',
                        backdropFilter: 'blur(2px)',
                    }}
                >
                    <Box /* box login */
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            Route.push(`/chat?username=${username}`);
                        }}
                        styleSheet={{
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            width: { xs: '100%', sm: '50%' }, 
                            textAlign: 'center',
                            marginBottom: {
                                xs: '16px'
                            }
                        }}
                    >
                        <Text
                            styleSheet={{
                                fontSize: '22px',
                                fontWeight: '700',
                                marginBottom: '8px',
                                color: appConfig.theme.colors.neutrals[200]
                            }}
                        >
                            Boas vindas de volta!
                        </Text>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', fontWeight: '700', color: appConfig.theme.colors.secondary[100] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            fullWidth
                            styleSheet={{
                                backgroundColor: 'rgba(235, 235, 235, 0)',
                                border: '1px solid transparent',
                                boxShadow: 'inset 0px 0px 6px 0px #0000007e',
                            }}
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[300],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[300],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                },
                            }}
                            value={username}
                            onChange={function (event) {
                                setUserName(event.target.value);
                            }}
                        />
                        <Button
                            styleSheet={{

                            }}
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[400],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>

                    <Box /* box foto */
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                                background: `linear-gradient(to top left, ${appConfig.theme.colors.primary[500]}, ${appConfig.theme.colors.secondary[600]}) border-box`,
                                border: `4px solid transparent`
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body3"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[300],
                                padding: '4px 16px',
                                borderRadius: '1000px',
                                boxShadow: 'inset 0px 0px 3px 0px #0000008f',
                            }}
                        >
                            {username}
                        </Text>
                    </Box>

                </Box>
            </Box>
        </>
    );
}