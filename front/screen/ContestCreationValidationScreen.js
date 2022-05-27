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

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(true)

    const createCategories = async (contestId) => {
        let categoriesResponse = await createContestCategories(token, contestId, categories)

        const contest = await categoriesResponse.json()

        if (categoriesResponse.status === 201) {
            setSuccess('Le tournoi a bien été créé !')
        }
        else {
            setError(contest.error)
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
        else {
            setError(contest.error)
        }
    }

    useEffect(() => {
        createContestAndCategories()
    }, [])

    useEffect(() => {
        if (success || error) {
            setLoading(false)
        }
    }, [success, error])

    useEffect(() => {
        console.log('loading', loading)
    }, [loading])

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
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            { success ?
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <LottieView source={require('../assets/success.json')} autoPlay={true} loop={false} style={{ width: '70%' }} />
                                    <Text style={styles.success}>{success}</Text>
                                </View> :
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <LottieView source={require('../assets/error.json')} autoPlay={true} loop={false} style={{ width: '70%' }} />
                                    <Text style={styles.error}>{error}</Text>
                                </View>}
                        </View>
                    </View>
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
    },
    error: {
        color: '#E1673D',
        fontSize: 18
    },
    success: {
        color: '#00A1E7',
        fontSize: 18
    },
    logo: {
        width: 150,
        height: 150,
        marginVertical: 20
    }
})