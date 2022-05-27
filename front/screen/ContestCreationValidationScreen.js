import {ActivityIndicator, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import contestCreationContext from "../context/ContestCreationContext";
import LottieView from "lottie-react-native";
import {createContest, createContestCategories} from "../service/APIService";
import authContext from "../context/AuthContext";

export const ContestCreationValidationScreen = ({route, navigation}) => {
    const {token} = useContext(authContext)
    const {
        address, city, hallName, date, endDate, endRegistrationDate, categories
    } = useContext(contestCreationContext)

    const [loading, setLoading] = useState(true)

    const createCategories = async (contestId) => {
        let categoriesResponse = await createContestCategories(token, contestId, categories)

        console.log('STATUS RESPONSE CATEGORY', categoriesResponse.status)

        const contest = await categoriesResponse.json()

        console.log('la raison', contest)

        if (categoriesResponse.status === 201) {
            console.log('OK')
        }
    }

    const createContestAndCategories = async () => {
        let contestResponse = await createContest(token, {
            startDate: date,
            address: address,
            city: city,
            hallName: hallName,
            endDate: endDate,
            endRegistrationDate: endRegistrationDate
        })

        const contest = await contestResponse.json()

        if (contestResponse.status === 201) {
            createCategories(contest.id)
        }


        console.log(contest)

        /*if (contestResponse.statusCode === 201) {
            const data = await contestResponse.json()
            console.log(data)
        }
        else {
            console.log('error', contestResponse.statusCode)
        }*/
    }

    useEffect(() => {
        createContestAndCategories()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LottieView source={require('../assets/splash.json')} autoPlay={true} loop={true} style={{ width: '70%', marginVertical: 20 }} />
                        <Text style={styles.text}>Création du tournoi en cours..</Text>
                        <Text>Veuillez ne pas fermer l'application.</Text>
                    </View>
                    :
                    <View><Text>Done!</Text></View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    }
})