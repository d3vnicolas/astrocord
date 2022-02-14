import { Box, Button, Text } from '@skynexui/components';
import React from 'react';
import appConfig from '../../../config.json';
import { TailSpin } from 'react-loader-spinner';

const Profile = (props) => {

    // const handleHideProfile = (id) => {
    //     const element = document.getElementById(id);
    //     element.style.display = 'none';
    // }
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${props.user}`).then(async request => {
            const response = await request.json();
            setUser(response);
        })
    }, []);

    console.log(user);

    return (
        <Box id={props.id}
            styleSheet={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${appConfig.theme.colors.primary[900]}`,
                backgroundColor: 'rgba(0, 0, 0, .5)',
                backdropFilter: 'blur(2px)',
                width: '100%',
                maxWidth: '580px',
                marginBottom: '24px',
                borderRadius: '15px',
                zIndex: 1,
            }}
        >
            {Object.keys(user).length > 0
                ?
                <Box
                    styleSheet={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        gap: '12px',
                        flexDirection: { xs: 'column-reverse', sm: 'row-reverse' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '16px',
                    }}
                >
                    <Box
                        styleSheet={{
                            width: { xs: '100%', sm: '60%' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            tag="h1"
                            styleSheet={{
                                fontSize: '26px',
                            }}
                        >
                            {user.name}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '12px',
                                marginBottom: '12px',
                            }}
                        >
                            {user.location}
                        </Text>
                        <Box
                            styleSheet={{
                                marginBottom: '56px',
                                fontSize: '14px',
                            }}
                        >
                            <p style={{ marginBottom: '12px', textAlign: 'center' }}>{user.bio}</p>
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <p>Repositórios: {user.public_repos}</p>
                                <p>Seguidores: {user.followers}</p>

                            </Box>
                        </Box>
                        <Text
                            tag="a"
                            href={user.html_url}
                            target="_blank"
                            styleSheet={{
                                textDecoration: 'none',
                                color: '#fff',
                                backgroundColor: appConfig.theme.colors.primary[500],
                                transition: 'background-color 300ms ease',
                                padding: '8px 12px 10px 12px',
                                marginTop: '-32px',
                                borderRadius: '8px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.secondary[500],
                                }
                            }}
                        >Abrir perfil</Text>
                    </Box>
                    <img src={`https://github.com/${props.user}.png`} alt={`Foto de perfil ${props.user}`}
                        style={{
                            width: '35vw',
                            maxWidth: '200px',
                            minWidth: '130px',
                            height: '35vw',
                            maxHeight: '200px',
                            minHeight: '130px',

                            borderRadius: '50%',
                        }}
                    />
                </Box>
                :
                <Box
                    styleSheet={{
                        width: '100%',
                        minHeight: '232px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TailSpin
                        radius={0}
                        width={80}
                        color={appConfig.theme.colors.secondary[200]}
                        ariaLabel="loading-indicator"
                    />
                </Box>
            }
            <Button
                onClick={() => props.setProfile({ show: false, user: '' })}
                style={{
                    position: 'absolute',
                    top: -1,
                    right: -1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    fontSize: '22px',
                    background: 'transparent',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}
                iconName="FaTimes"
                buttonColors={{
                    contrastColor: '#c20808',
                }}
            />
        </Box>
    );
}

export default Profile;