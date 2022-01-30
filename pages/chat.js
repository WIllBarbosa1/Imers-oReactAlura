import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import Modal from '../src/components/ModalGithub';

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzUwMDQxMywiZXhwIjoxOTU5MDc2NDEzfQ.JmCt3LTHB8-AKJNLBZXaJqh-SEIey_sN5dyUhK86rf0"
const SUPABASE_URL = "https://zoqpvvhkiogokkguokob.supabase.co"
const supabaseCliente = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function listnerRealTimeMensages(addMensage) {
    return supabaseCliente.from("mensages").on('INSERT', ({ new: newMensage }) => {
        addMensage(newMensage)
    }).subscribe()
}

export default function ChatPage() {

    const router = useRouter()
    const user = router.query.username

    const [mensage, setMensage] = useState("")
    const [mensageList, setMensageList] = useState([])
    const [ismodalOpen, setIsModalOpen] = useState(false)
    const [modalUser, setModalUser] = useState(user)

    useEffect(() => {
        supabaseCliente.from("mensages").select("*").order("id", { ascending: false }).then(({ data }) => {
            setMensageList([...data])
        })

        listnerRealTimeMensages((newMensage) => {
            setMensageList((mensageList) => {
                return [newMensage, ...mensageList]
            })
        })
    }, [])

    function handleNewMensage(newMensage) {
        const menssage = {
            from: user,
            text: newMensage
        }

        supabaseCliente.from("mensages").insert([
            menssage
        ]).then(({ data }) => {

        })

        setMensage("")
    }


    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: `url(https://i.pinimg.com/originals/13/31/20/13312045ba691fcb8d1fbae330d937e0.gif)`,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    color: appConfig.theme.colors.neutrals['000'], padding: '5%'
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

                        <MessageList mensagens={mensageList} onOpen={() => setIsModalOpen(true)} onModalUser={(user) => setModalUser(user)} />

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
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    handleNewMensage(`:sticker: ${sticker}`)
                                }}
                            />
                            <Button
                                iconName='arrowRight'
                                styleSheet={{
                                    borderRadius: '50%',
                                    padding: '0 3px 0 0',
                                    minWidth: '50px',
                                    minHeight: '50px',
                                    fontSize: '20px',
                                    marginBottom: '8px',
                                    marginLeft: '8px',
                                    lineHeight: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: "white",
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
            {ismodalOpen && <Modal
                onClose={() => setIsModalOpen(false)}
                user={modalUser}
            />}
        </>
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
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const { mensagens, onOpen, onModalUser } = props

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
                                    src={`https://github.com/${mensagem.from}.png`}
                                    onClick={() => {
                                        onOpen(true)
                                        onModalUser(mensagem.from)
                                    }}
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
                            {/* <Button
                                styleSheet={{
                                    color: "white",
                                }}
                                buttonColors={{
                                    contrastColor: "#FFF",
                                    mainColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[300],
                                    mainColorStrong: appConfig.theme.colors.primary[700],
                                }}
                                label='Delete'
                                onClick={() => {
                                    console.warn("Em desenvolvimento!")
                                }}
                            /> */}
                        </Box>
                        {mensagem.text.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.text.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.text
                            )
                        }
                    </Text>
                )
            })}

        </Box>
    )
}