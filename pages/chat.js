import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensage, setMensage] = useState("")
    const [mensageList, setMensageList] = useState([])
    // ./Sua lógica vai aqui

    function handleNewMensage(newMensage) {
        const menssage = {
            id: mensageList.length + 1,
            from: "Will de Azevedo",
            text: newMensage
        }
        setMensageList([menssage, ...mensageList])
        setMensage("")
    }


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/* Lista de Mensagens: {mensageList.map((mens) => {
                        return (
                            <li key={mens.id}>
                                {mens.from}: {mens.text}
                            </li>
                        )
                    })} */}
                    <MessageList mensagens={mensageList} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensage}
                            onChange={(event) => {
                                const { target: { value } } = event
                                setMensage(value)
                            }}
                            onKeyPress={(event) => {

                                const { key } = event;

                                if (key === "Enter") {
                                    event.preventDefault()
                                    handleNewMensage(mensage)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            label='Send'
                            styleSheet={{
                                color: "white",
                                //     backgroundColor: appConfig.theme.colors.primary[500]
                            }}
                            buttonColors={{
                                contrastColor: "#FFF",
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[300],
                                mainColorStrong: appConfig.theme.colors.primary[700],
                            }}
                            onClick={() => {
                                handleNewMensage(mensage)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='secondary'
                    colorVariant='negative'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    const { mensagens } = props

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                    display: "flex",
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/github.png`}
                                />
                                <Text tag="strong">
                                    {mensagem.from}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            <Button
                                styleSheet={{
                                    color: "white",
                                    //     backgroundColor: appConfig.theme.colors.primary[500]
                                }}
                                buttonColors={{
                                    contrastColor: "#FFF",
                                    mainColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[300],
                                    mainColorStrong: appConfig.theme.colors.primary[700],
                                }}
                                label='Delete'
                                // variant='secondary'
                                onClick={() => {
                                    console.warn("Em desenvolvimento!")
                                }}
                            />
                        </Box>
                        {mensagem.text}
                    </Text>
                )
            })}

        </Box>
    )
}