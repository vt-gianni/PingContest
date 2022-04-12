import React, {useEffect, useState} from "react"
import {BeforeStack} from "./stack/BeforeStack"
import AuthContext from "./context/AuthContext"
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from "jwt-decode";
import {apiAddress} from "./service/APIService";

export default function App() {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const authContextValue = {
        token,
        setToken,
        user,
        setUser
    }

    useEffect(() => {
        checkForStorageToken().then(async (token) => {
            if (token) {
                await setUserData(token)
                setToken(token)
            }
        })
    }, [])

    const setUserData = (token) => {
        setUser(jwtDecode(token))
    }

    const checkForStorageToken = async () => {
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        const token = await AsyncStorage.getItem('token')
        const now = new Date()
        const exp = jwtDecode(token).exp

        // Token expiré
        if (exp * 1000 < now.getTime()) {
            const response = await fetch(apiAddress + '/token/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh_token: refreshToken
                })
            })

            const data = await response.json()

            return data.token
        }
        return token
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            <BeforeStack/>
        </AuthContext.Provider>
    )
}

