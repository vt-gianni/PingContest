import {useContext, useState} from "react";
import LoginScreen from "../screen/LoginScreen";
import {ProfileScreen} from "../screen/ProfileScreen";
import authContext from "../context/AuthContext";
import React from 'react'

export const ProfileTab = ({navigation}) => {
    const {token} = useContext(authContext)

    return (
        !token ? <LoginScreen navigation={navigation}/> : <ProfileScreen/>
    )
}