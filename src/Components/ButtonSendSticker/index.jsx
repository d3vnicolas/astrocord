import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../../config.json';

/* 
    se não houver uma exportação default
    o import deve ser feito por desestruturação
*/

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState('');

  return (
    <Box
      styleSheet={{
        position: 'relative',
        marginBottom: '-8px',
      }}
    >
      <Button
        styleSheet={{
          borderRadius: '50%',
          padding: '0 3px 0 0',
          minWidth: '64px',
          minHeight: '64px',
          fontSize: '20px',
          marginBottom: '8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.149)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(235, 235, 235, 0.1)',
          hover: {
            backgroundColor: 'transparent',
            border: `1px solid ${appConfig.theme.colors.primary[300]}`,
          },
          focus: {
            border: `1px solid ${appConfig.theme.colors.secondary[300]}`,
            backgroundColor: 'transparent',
          },
        }}
        label="😋"
        onClick={() => setOpenState(!isOpen)}
      />
      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            overflowY: 'hidden',
            width: {
              xs: '220px',
              sm: '290px',
            },
            height: '300px',
            right: {sm: '30px', xs: '-180px'},
            bottom: '30px',
            padding: '16px',
            border: '1px solid rgba(255, 255, 255, 0.149)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.87)',
            backdropFilter: 'blur(3px)',
            zIndex: '1',
          }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: '16px',
              overflow: 'auto',
              overflowX: 'hidden',
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                onClick={() => {
                  // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker);
                  }
                }}
                tag="li" key={sticker}
                styleSheet={{
                  width: '50%',
                  borderRadius: '5px',
                  padding: '10px',
                  transition: 'transform 200ms ease',
                  cursor: 'pointer',
                  hover: {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}