import React from 'react';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import appConfig from '../../config.json';
import { MutatingDots } from 'react-loader-spinner';

export default function PaginaInicial() {
    const [username, setUserName] = React.useState('');
    const [hasImage, setHasImage] = React.useState(false);
    const Route = useRouter();
    const textUser = React.useRef();

    const handleNotUser = (component) => {
        const el = component.current;
        el.innerText = 'Usuário inexistente';
        el.style.border = '1px solid #d60d17';
    }

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
                        borderRadius: '15px', padding: '16px', margin: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.149)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'rgba(235, 235, 235, 0.1)',
                        backdropFilter: 'blur(2px)',
                    }}
                >
                    <Box /* box image */
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            if (username) {
                                hasImage ? Route.push(`/chat?username=${username}`) : handleNotUser(textUser);
                            }
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
                                fontSize: {
                                    md: '22px',
                                    sm: '16px',
                                },
                                fontWeight: '700',
                                marginBottom: '8px',
                                marginTop: '14px',
                                color: appConfig.theme.colors.neutrals[200]
                            }}
                        >
                            Bem-vindo!
                        </Text>
                        <Text variant="body3"
                            styleSheet={{
                                marginBottom: { xs: '16px', sm: '42px' },
                                fontWeight: '700',
                                color: appConfig.theme.colors.secondary[100]
                            }}>
                            {appConfig.name}
                        </Text>
                        <Text
                            variant='body4'
                            styleSheet={{
                                marginBottom: '16px',
                                color: appConfig.theme.colors.secondary[100]
                            }}
                        >
                            {appConfig.alert}
                        </Text>

                        <TextField
                            fullWidth
                            placeholder="Login..."
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
                                //retira a borda sempre que o input mudar e sempre que o span estiver visivel
                                textUser.current ? textUser.current.style.border = 'none' : false;
                            }}
                            required
                        />
                        <Button
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

                    <Box
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
                        <Box /* box foto */
                            styleSheet={{
                                position: 'relative',
                                width: '170px',
                                height: '170px',
                                borderRadius: '50%',
                                background: hasImage ? `linear-gradient(to top left, ${appConfig.theme.colors.primary[500]}, ${appConfig.theme.colors.secondary[600]}) border-box` : 'none',
                                border: `4px solid transparent`,
                                marginBottom: '8px',
                            }}
                        >

                            <Box
                                styleSheet={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    display: hasImage ? 'none' : 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <MutatingDots
                                    width={100}
                                    color={appConfig.theme.colors.secondary[200]}
                                    secondaryColor={appConfig.theme.colors.secondary[900]}
                                    ariaLabel="loading-indicator"
                                />
                            </Box>


                            <Image
                                styleSheet={{
                                    borderRadius: '50%',
                                    marginBottom: '16px',
                                    display: 'none',
                                }}
                                src={`https://github.com/${username}.png`}
                                onError={event => { event.target.style.display = 'none'; setHasImage(false) }}
                                onLoad={event => { event.target.style.display = 'block'; setHasImage(true) }}
                            />

                        </Box>
                        {username !== '' &&
                            <span
                                ref={textUser}
                                style={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    padding: '4px 16px',
                                    background: 'none',
                                    borderRadius: '12px',
                                    boxShadow: 'inset 0px 0px 3px 0px #0000008f',
                                    fontSize: '14px',
                                }}
                            >{username}</span>
                        }
                    </Box>

                </Box>
            </Box>
        </>
    );
}