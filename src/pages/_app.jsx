function GlobalStyle() {
  return (
    <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
          -webkit-tap-highlight-color: transparent;
          -moz-tap-highlight-color: transparent;
          -ms-tap-highlight-color: transparent;
        }
        body, html{
          width: 100%;
          height: 100vh;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        *::-webkit-scrollbar {
          width: 8px;
        }
        *::-webkit-scrollbar-track {
          background: #1e1e1e51;        
          border-radius: 10px;       
        }
        
        *::-webkit-scrollbar-thumb {
          background-color: #1e1e1e;    
          border-radius: 10px;       
        }

        /* App fit Height */ 
        html, body, #__next {
          display: flex;
          height: 100%;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}