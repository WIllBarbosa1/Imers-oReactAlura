import React, { useState, useEffect } from "react"
import { Box, Button, Image } from "@skynexui/components";
import appConfig from "../../config.json"

function pegaDadosGithub(user) {

    return fetch(`https://api.github.com/users/${user}`)
}

function Modal({ onClose, user }) {

    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        pegaDadosGithub(user).then(async (res) => {
            const resposta = await res.json()
            setUserInfo(resposta)
        })
    }, [])

    console.log('Info: ', userInfo)

    return (
        <Box
            styleSheet={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                position: 'fixed',
                disabled: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5%',
            }}
        >
            < Box
                styleSheet={{
                    overflow: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '5px',
                    position: 'absolute',
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    width: '60%',
                    height: '80%',
                    left: '0',
                    marginHorizontal: 'auto',
                    right: '0',
                    padding: '16px',
                    boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <h2>{user}</h2>
                    <Button
                        label="Close"
                        onClick={onClose}
                    />
                </Box>

                <Box
                    styleSheet={{
                        marginTop: '5%'
                    }}
                >
                    <Box
                        styleSheet={{
                            display: 'flex',
                            padding: '1%',
                            marginBottom: '5%',
                        }}
                    >
                        <Image
                            src={`https://github.com/${user}.png`}
                            styleSheet={{
                                width: '30%',
                                border: 'solid 1px #F23202',
                                borderRadius: '50%',
                            }}
                        />
                        <Box styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2%',
                            width: '100%',
                            justifyContent: 'space-between',
                            border: 'solid 1px #F23202',
                            borderRadius: '15px',
                            color: '#FFF',
                            backgroundColor: '#101418',
                            marginLeft: '2%'
                        }}>
                            <p>Nome: {userInfo.name}</p>
                            <p>Usuário: {userInfo.login}</p>
                            <p>Localização: {userInfo.location}</p>
                            <p>Biografia: {userInfo.bio === null ? "não existe" : userInfo.bio}</p>
                        </Box>
                    </Box>

                    <img width="50%" height="35%" src={`https://github-readme-stats.vercel.app/api?username=${userInfo.login}&show_icons=true&theme=dark&include_all_commits=true&count_private=true`} />
                    <img width="50%" height="35%" src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${userInfo.login}&layout=compact&langs_count=6&theme=dark`} />
                </Box>
            </ Box>
        </Box >
    )
}

export default Modal;