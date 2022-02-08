import { Box, Button, Text } from '@skynexui/components';
import React from 'react';

const Profile = (props) => {

    const handleHideProfile = (id) => {
        const element = document.getElementById(id);
        element.style.display = 'none';
    }

    return (
        <Box id={props.id}
            styleSheet={{
                position: 'relative',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(75, 75, 75, 0.624)',
                width: '100%',
                maxWidth: '580px',
                display: 'none',
                gap: '8px',
                flexDirection: 'row-reverse',
                padding: '16px',
                marginBottom: '24px',
                borderRadius: '15px',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    left: 20,
                    bottom: -20,
                    borderRight: '32px solid transparent',
                    borderTop: `20px solid rgba(75, 75, 75, 0.624)`,
                }}
            ></span>
            <Box
                styleSheet={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    tag="h1"
                    styleSheet={{
                        marginBottom: 'auto',
                    }}
                >
                    Nicolas Soares
                </Text>
                <p>Seguidores: 235</p>
                <p>Projetos: 15</p>
            </Box>
            <img src={`https://github.com/${props.user}.png`} alt={`Foto de perfil ${props.user}`}
                style={{
                    width: '40%',
                    borderRadius: '50%',
                    marginRight: 'auto',
                }}
            />
            <Button
                onClick={() => handleHideProfile(props.id)}
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
                    contrastColor: 'orange'
                }}
            />
        </Box>
    );
}

export default Profile;