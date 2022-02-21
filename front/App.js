import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from "./screen/HomeScreen"
import React from "react"

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <HomeScreen/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
