import React from "react"
import { Box, Image } from "@skynexui/components"
import appConfig from "../../config.json"

function Load() {

    return (
        <>
            <Box
                className='cyber-font'
                src="https://tenor.com/view/cyberpunk-dangiuz-outrun-synthwave-vaporwave-gif-15605667"
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals[300],
                    backgroundImage: `url(https://c.tenor.com/izqsmK_x6nAAAAAd/cyberpunk-dangiuz.gif)`,
                    backgroundRepeat: 'repeat', backgroundBlendMode: 'multiply',
                    backgroundPosition: 'center center',
                    height: '100%',
                    marginBottom: '2%',
                }}
            >
                <h2>
                    Loading...
                </h2>
            </Box>
        </>
    )
}

export default Load
