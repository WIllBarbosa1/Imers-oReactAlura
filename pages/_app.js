function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: nome;
            }

            body {
                font-family: 'Open Sans', sans-serif;
            }

            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }

            #__next {
                flex: 1;    
            }

            #__next > * {
                flex: 1;
            }

            .cyber-font {
                font-family: "Press Start 2P", cursive;
            }
            
            .link {
                font-family: "Press Start 2P", cursive;
                font-size: small;
                text-decoration: none;
                color: white;
            }

            .link:hover{
                color: #4F008F;
            }
        `}</style>
    )
}

export default function MyApp({ Component, pageProps }) {

    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}