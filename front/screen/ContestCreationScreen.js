import {Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useContext, useEffect, useState} from "react"
import authContext from "../context/AuthContext";
import CustomInput from "../component/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

export const ContestCreationScreen = ({route, navigation}) => {
    const {token, setToken, user, setUser} = useContext(authContext)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [hallName, setHallName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState()
    const [endRegistrationDate, setEndRegistrationDate] = useState()
    const [date, setDate] = useState(null)
    const [mode, setMode] = useState('date')
    const [modeEnd, setModeEnd] = useState('date')
    const [show, setShow] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
    const [error, setError] = useState(null)

    const showDatepicker = () => {
        showMode('date')
    }

    const showDatepickerEnd = () => {
        showModeEnd('date')
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const showModeEnd = (currentMode) => {
        setShowEnd(true)
        setModeEnd(currentMode)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate);
    }

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate
        setShowEnd(Platform.OS === 'ios')
        setEndDate(currentDate);
    }

    const getMinDate = () => {
        const minDate = new Date()
        minDate.setDate(minDate.getDate() + 1)
        return minDate
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View>
                    {/*error && <Text style={styles.redText}>{error}</Text>*/}
                    <View style={styles.inputsContainerRow}>
                        <View style={styles.inputsRow}>
                            <CustomInput field={city} placeholder={"Ville *"}
                                         setField={setCity}
                                         secure={false}/>
                        </View>
                        <View style={styles.inputsRow}>
                            <CustomInput field={address} placeholder={"Adresse *"}
                                         setField={setAddress}
                                         secure={false}/>
                        </View>
                    </View>
                    <View style={styles.inputsContainer}>
                        <CustomInput field={hallName} placeholder={"Nom de la salle *"}
                                     setField={setHallName}
                                     secure={false}/>
                    </View>

                    <View
                        style={[styles.row, {alignItems: 'center', justifyContent: 'space-evenly', width: '100%'}]}>
                        <Text>Date de début *</Text>
                        <Pressable onPress={showDatepicker} style={styles.date}>
                            {!date ?
                                <View style={styles.row}>
                                    <Text style={styles.placeholder}>dd</Text>
                                    <Text style={styles.placeholder}> / </Text>
                                    <Text style={styles.placeholder}>mm</Text>
                                    <Text style={styles.placeholder}> / </Text>
                                    <Text style={styles.placeholder}>yyyy</Text>
                                </View> : <View style={styles.row}>
                                    <Text style={styles.dateFilled}>{date.getDate()}</Text>
                                    <Text style={styles.dateFilled}> / </Text>
                                    <Text
                                        style={styles.dateFilled}>{(date.getUTCMonth() + 1) < 10 ? '0' + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1}</Text>
                                    <Text style={styles.dateFilled}> / </Text>
                                    <Text style={styles.dateFilled}>{date.getFullYear()}</Text>
                                </View>
                            }
                        </Pressable>
                    </View>

                    <View
                        style={[styles.row, {alignItems: 'center', justifyContent: 'space-evenly', width: '100%'}]}>
                        <Text>Date de fin *</Text>
                        <Pressable onPress={showDatepickerEnd} style={styles.date}>
                            {!endDate ?
                                <View style={styles.row}>
                                    <Text style={styles.placeholder}>dd</Text>
                                    <Text style={styles.placeholder}> / </Text>
                                    <Text style={styles.placeholder}>mm</Text>
                                    <Text style={styles.placeholder}> / </Text>
                                    <Text style={styles.placeholder}>yyyy</Text>
                                </View> : <View style={styles.row}>
                                    <Text style={styles.dateFilled}>{endDate.getDate()}</Text>
                                    <Text style={styles.dateFilled}> / </Text>
                                    <Text
                                        style={styles.dateFilled}>{(endDate.getUTCMonth() + 1) < 10 ? '0' + (endDate.getUTCMonth() + 1) : endDate.getUTCMonth() + 1}</Text>
                                    <Text style={styles.dateFilled}> / </Text>
                                    <Text style={styles.dateFilled}>{endDate.getFullYear()}</Text>
                                </View>
                            }
                        </Pressable>
                    </View>
                </View>
            </View>
            {show && (
                <DateTimePicker
                    minimumDate={getMinDate()}
                    testID="dateTimePicker"
                    value={date ? date : new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {showEnd && (
                <DateTimePicker
                    minimumDate={getMinDate()}
                    testID="dateTimePicker"
                    value={endDate ? endDate : new Date()}
                    mode={modeEnd}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEnd}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row'
    },
    blueText: {
        color: '#00A1E7',
        marginHorizontal: 5
    },
    fwBold: {
        fontWeight: 'bold'
    },
    where: {
        marginVertical: 15
    },
    inputsContainer: {
        width: '100%'
    },
    inputsContainerRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        marginHorizontal: 20
    },
    inputsRow: {
        width: '49%'
    },
    date: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#00A1E7',
        borderRadius: 3
    },
    placeholder: {
        color: '#9b9b9b'
    },
    dateFilled: {
        color: '#000000'
    }
})