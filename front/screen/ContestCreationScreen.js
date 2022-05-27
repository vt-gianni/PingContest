import {Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useContext, useEffect, useState} from "react"
import authContext from "../context/AuthContext";
import CustomInput from "../component/CustomInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import contestCreationContext from "../context/ContestCreationContext";

export const ContestCreationScreen = ({route, navigation}) => {
    const {token, setToken, user, setUser} = useContext(authContext)
    const {
        address, setAddress,
        city, setCity,
        hallName, setHallName,
        date, setDate,
        endDate, setEndDate,
        endRegistrationDate, setEndRegistrationDate
    } = useContext(contestCreationContext)

    const [mode, setMode] = useState('date')
    const [modeEnd, setModeEnd] = useState('date')
    const [modeReg, setModeReg] = useState('date')

    const [show, setShow] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
    const [showReg, setShowReg] = useState(false)

    const [error, setError] = useState(null)

    useEffect(() => {
        if (endDate < date) {
            setError('La date de fin ne peut être inférieure à la date de début.')
        } else {
            setError(null)
        }
    }, [date, endDate])

    useEffect(() => {
        if (endRegistrationDate > date) {
            setError('La date de fin d\'inscription ne peut être ultérieure à la date de début du tournoi.')
        } else {
            setError(null)
        }
    }, [endRegistrationDate, date])

    const showDatepicker = () => {
        showMode('date')
    }

    const showDatepickerEnd = () => {
        showModeEnd('date')
    }

    const showDatepickerReg = () => {
        showModeReg('date')
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const showModeEnd = (currentMode) => {
        setShowEnd(true)
        setModeEnd(currentMode)
    }

    const showModeReg = (currentMode) => {
        setShowReg(true)
        setModeReg(currentMode)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate
        setShowEnd(Platform.OS === 'ios')
        setEndDate(currentDate);
    }

    const onChangeReg = (event, selectedDate) => {
        const currentDate = selectedDate || endRegistrationDate
        setShowReg(Platform.OS === 'ios')
        setEndRegistrationDate(currentDate);
    }

    const getMinDate = () => {
        const minDate = new Date()
        minDate.setDate(minDate.getDate() + 1)
        return minDate
    }

    const checkRequirements = () => {
        return address !== '' && city !== '' && hallName !== '' && date !== null && endDate !== null && endRegistrationDate !== null && endDate > date && endRegistrationDate < date
    }

    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View>
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

                        {error &&
                            <Text style={styles.error}>{error}</Text>
                        }

                        <View style={[styles.row, {
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                        }]}>
                            <View style={{width: '49%'}}>
                                <Text style={{textAlign: 'center'}}>Date de début *</Text>
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

                            <View style={{width: '49%'}}>
                                <Text style={{textAlign: 'center'}}>Date de fin *</Text>
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
                        <View style={{marginTop: 10}}>
                            <Text style={{textAlign: 'center'}}>Date de fin d'inscription *</Text>
                            <Pressable onPress={showDatepickerReg} style={styles.date}>
                                {!endRegistrationDate ?
                                    <View style={styles.row}>
                                        <Text style={styles.placeholder}>dd</Text>
                                        <Text style={styles.placeholder}> / </Text>
                                        <Text style={styles.placeholder}>mm</Text>
                                        <Text style={styles.placeholder}> / </Text>
                                        <Text style={styles.placeholder}>yyyy</Text>
                                    </View> : <View style={styles.row}>
                                        <Text style={styles.dateFilled}>{endRegistrationDate.getDate()}</Text>
                                        <Text style={styles.dateFilled}> / </Text>
                                        <Text
                                            style={styles.dateFilled}>{(endRegistrationDate.getUTCMonth() + 1) < 10 ? '0' + (endRegistrationDate.getUTCMonth() + 1) : endRegistrationDate.getUTCMonth() + 1}</Text>
                                        <Text style={styles.dateFilled}> / </Text>
                                        <Text style={styles.dateFilled}>{endRegistrationDate.getFullYear()}</Text>
                                    </View>
                                }
                            </Pressable>
                        </View>

                        {checkRequirements() &&
                            <Pressable style={styles.nextBtn} onPress={() => {
                                navigation.navigate('ContestCategoryCreation')
                            }}>
                                <Text style={styles.nextBtnText}>Créer les séries</Text>
                            </Pressable>
                        }

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

                {showReg && (
                    <DateTimePicker
                        minimumDate={getMinDate()}
                        testID="dateTimePicker"
                        value={endRegistrationDate ? endRegistrationDate : new Date()}
                        mode={modeReg}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeReg}
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
    },
    nextBtn: {
        marginTop: 20,
        backgroundColor: '#00A1E7',
        padding: 15,
        borderRadius: 5,
    },
    nextBtnText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    error: {
        color: '#E1673D',
        marginVertical: 10
    }
})