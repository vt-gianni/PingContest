import {Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useContext, useEffect, useRef, useState} from "react"
import contestCreationContext from "../context/ContestCreationContext";
import {RadioButton} from "react-native-paper";
import CustomInput from "../component/CustomInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message"
import {getDateFormat} from "../service/APIService";


export const ContestCategoryCreationScreen = ({navigation}) => {
    const {
        date, endDate, categories, setCategories
    } = useContext(contestCreationContext)

    const [catDate, setCatDate] = useState(null)
    const [catTime, setCatTime] = useState(null)
    const [mode, setMode] = useState('date')
    const [timeMode, setTimeMode] = useState('time')
    const [show, setShow] = useState(false)
    const [timeShow, setTimeShow] = useState(false)

    const [minParticipants, setMinParticipants] = useState(null)
    const [maxParticipants, setMaxParticipants] = useState(null)

    const [price, setPrice] = useState(null)
    const [winPrice, setWinPrice] = useState(null)

    const [checked, setChecked] = useState('none')
    const [checkedAge, setCheckedAge] = useState('none')
    const [checkedPoints, setCheckedPoints] = useState('none')

    const [participantsError, setParticipantsError] = useState(null)
    const [priceError, setPriceError] = useState(null)

    const [maxAge, setMaxAge] = useState(null)
    const [maxAgeError, setMaxAgeError] = useState(null)

    const [minPoints, setMinPoints] = useState(null)
    const [minPointsError, setMinPointsError] = useState(null)

    const categoryCreationRef = useRef('categoryCreation')

    useEffect(() => {
        checked !== 'none' && setCheckedAge('none')
        checked !== 'none' && setCheckedPoints('none')
    }, [checked])

    useEffect(() => {
        console.log(categories)
        emptyData()
    }, [categories])

    useEffect(() => {
        checkedAge === 'none' && setMaxAge(null)
        checkedAge !== 'none' && setCheckedPoints('none')
    }, [checkedAge])

    useEffect(() => {
        maxAge === null && setMaxAgeError(null)
    }, [maxAge])

    useEffect(() => {
        checkedPoints === 'none' && setMinPoints(null)
        checkedPoints !== 'none' && setCheckedAge('none')
    }, [checkedPoints])

    useEffect(() => {
        minPoints === null && setMinPointsError(null)
    }, [minPoints])

    const checkParticipantsError = () => {
        const minP = parseInt(minParticipants)
        const maxP = parseInt(maxParticipants)

        if (minP < 8) {
            setParticipantsError('Il faut au moins 8 participants.')
        } else if (minP > 192) {
            setParticipantsError('Il peut y avoir au maximum 192 inscriptions.')
        } else if (maxP < 8) {
            setParticipantsError('Il faut au moins 8 participants.')
        } else if (maxP > 192) {
            setParticipantsError('Il peut y avoir au maximum 192 inscriptions.')
        } else if (minP && maxP && minP > maxP) {
            setParticipantsError('Le minimum doit être inférieur au maximum.')
        } else {
            setParticipantsError(null)
        }
    }

    const checkPriceError = () => {
        const p = parseInt(price)
        const wP = parseInt(winPrice)

        if (p < 1) {
            setPriceError('Le coût minimal est de 1€.')
        } else if (p > 20) {
            setPriceError('Le coût maximal est de 20€.')
        } else if (wP < 20) {
            setPriceError('La dotation minimale est de 20€.')
        } else if (wP > 1000) {
            setPriceError('La dotation maximale est de 1 000€.')
        } else {
            setPriceError(null)
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setCatDate(currentDate)
    }

    const onTimeChange = (event, selectedTime) => {
        const currentDate = selectedTime || date
        setTimeShow(Platform.OS === 'ios')
        setCatTime(currentDate)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const showDatepicker = () => {
        showMode('date')
    }

    const checkParticipants = () => {
        if (minParticipants === null || maxParticipants === null) {
            return false
        }
        const minP = parseInt(minParticipants)
        const maxP = parseInt(maxParticipants)

        return minP >= 8 && minP <= 192 && maxP >= 8 && maxP <= 192 && minP <= maxP
    }

    const checkPrice = () => {
        if (price === null || winPrice === null) {
            return false
        }

        const p = parseInt(price)
        const wP = parseInt(winPrice)

        return p >= 1 && p <= 20 && wP >= 20 && wP <= 1000
    }

    const checkTypeAgePoints = () => {
        if (checked !== 'none') {
            return true
        }
        if (checkedPoints === 'none' && checkedAge !== 'none' && maxAge && parseInt(maxAge) <= 18) {
            return true
        }
        if (checkedAge === 'none' && checkedPoints !== 'none' && minPoints && parseInt(minPoints) >= 599 && parseInt(minPoints) <= 3000) {
            return true
        }
        return false
    }

    const checkRequirements = () => {
        return catDate && catTime && checkParticipants() && checkPrice() && checkTypeAgePoints()
    }

    const saveCategory = () => {
        let category = {}

        category.startDate = getDateFormat(catDate)
        category.time = catTime
        category.minParticipants = minParticipants
        category.maxParticipants = maxParticipants
        category.price = price
        category.winPrice = winPrice
        category.open = checked === 'open'
        category.disability = checked === 'disability'
        category.onlyWomen = checked === 'women'
        category.checkedAge = checkedAge
        category.checkedPoints = checkedPoints
        category.maxAge = maxAge
        category.minPoints = minPoints

        setCategories([...categories, category])
    }

    const emptyData = () => {
        setCatDate(null)
        setCatTime(null)
        setMinParticipants(null)
        setMaxParticipants(null)
        setPrice(null)
        setWinPrice(null)
        setChecked('none')
        setCheckedAge('none')
        setCheckedPoints('none')
        setMaxAge(null)
        setMinPoints(null)
    }

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    const replaceAll = (str, find, replace) => {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    const replaceAllWithCharacters = (string) => {
        return replaceAll(
            replaceAll(
                replaceAll(
                    replaceAll(string, '.', ''), ' ', ''
                ), '-', ''
            ), ',', ''
        )
    }

    const createContest = async (save) => {
        save && saveCategory()

        navigation.navigate('ContestCreationValidation')
    }

    return (
        <ScrollView style={styles.container}>
            <FlashMessage position="top" ref={categoryCreationRef} />
            <SafeAreaView style={{paddingHorizontal: 20, paddingVertical: 20}}>
                <View>
                    <Text style={styles.title}>Date et heure</Text>

                    <View style={styles.row}>
                        <View style={styles.rowElement}>
                            <Pressable onPress={showDatepicker} style={styles.date}>
                                {!catDate ?
                                    <View style={styles.row}>
                                        <Text style={styles.placeholder}>dd</Text>
                                        <Text style={styles.placeholder}> / </Text>
                                        <Text style={styles.placeholder}>mm</Text>
                                        <Text style={styles.placeholder}> / </Text>
                                        <Text style={styles.placeholder}>yyyy</Text>
                                    </View> : <View style={styles.row}>
                                        <Text style={styles.dateFilled}>{catDate.getDate()}</Text>
                                        <Text style={styles.dateFilled}> / </Text>
                                        <Text
                                            style={styles.dateFilled}>{(catDate.getUTCMonth() + 1) < 10 ? '0' + (catDate.getUTCMonth() + 1) : catDate.getUTCMonth() + 1}</Text>
                                        <Text style={styles.dateFilled}> / </Text>
                                        <Text style={styles.dateFilled}>{catDate.getFullYear()}</Text>
                                    </View>
                                }
                            </Pressable>
                        </View>

                        <View style={styles.rowElement}>
                            <Pressable onPress={() => {
                                setTimeShow(true)
                                setTimeMode('time')
                            }} style={styles.date}>
                                {!catTime ?
                                    <View style={styles.row}>
                                        <Text style={styles.placeholder}>hh</Text>
                                        <Text style={styles.placeholder}> : </Text>
                                        <Text style={styles.placeholder}>mm</Text>
                                    </View> : <View style={styles.rowStrict}>
                                        <Text style={styles.dateFilled}>{catTime.getHours()}</Text>
                                        <Text style={styles.dateFilled}>h</Text>
                                        <Text style={styles.dateFilled}>{catTime.getMinutes()}</Text>
                                    </View>
                                }
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Nombre de participants</Text>

                    {participantsError && <Text style={styles.error}>{participantsError}</Text>}

                    <View style={styles.row}>
                        <View style={styles.rowElement}>
                            <Text>Minimum</Text>
                            <CustomInput
                                field={minParticipants}
                                placeholder={"8"}
                                setField={setMinParticipants}
                                secure={false}
                                type={'number'}
                                onBlur={async () => {
                                    if (minParticipants) {
                                        await setMinParticipants(replaceAllWithCharacters(minParticipants))
                                        checkParticipantsError()
                                    }
                                }}
                            />
                        </View>

                        <View style={styles.rowElement}>
                            <Text>Maximum</Text>
                            <CustomInput
                                field={maxParticipants}
                                placeholder={"192"}
                                setField={setMaxParticipants}
                                secure={false}
                                type={'number'}
                                onBlur={async () => {
                                    if (maxParticipants) {
                                        await setMaxParticipants(replaceAllWithCharacters(maxParticipants))
                                        checkParticipantsError()
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={styles.title}>Coût et dotation</Text>

                    {priceError && <Text style={styles.error}>{priceError}</Text>}

                    <View style={styles.row}>
                        <View style={styles.rowElement}>
                            <Text>Coût (en €)</Text>
                            <CustomInput
                                field={price}
                                placeholder={"6"}
                                setField={setPrice}
                                secure={false}
                                type={'number'}
                                onBlur={async () => {
                                    if (price) {
                                        await setPrice(replaceAllWithCharacters(price))
                                        checkPriceError()
                                    }
                                }}
                            />
                        </View>

                        <View style={styles.rowElement}>
                            <Text>Dotation (en €)</Text>
                            <CustomInput
                                field={winPrice}
                                placeholder={"200"}
                                setField={setWinPrice}
                                secure={false}
                                type={'number'}
                                onBlur={async () => {
                                    if (winPrice) {
                                        await setWinPrice(replaceAllWithCharacters(winPrice))
                                        checkPriceError()
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>

                <Text style={styles.title}>Choix du type de la série</Text>

                <View style={styles.radioBlock}>
                    <RadioButton
                        value="none"
                        status={checked === 'none' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('none')}
                        color='#00A1E7'
                    />

                    <Text>Aucune restriction</Text>
                </View>

                <View style={styles.radioBlock}>
                    <RadioButton
                        value="women"
                        status={checked === 'women' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('women')}
                        color='#00A1E7'
                    />

                    <Text>Femmes</Text>
                </View>

                <View style={styles.radioBlock}>
                    <RadioButton
                        value="open"
                        status={checked === 'open' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('open')}
                        color='#00A1E7'
                    />

                    <Text>Open</Text>
                </View>

                <View style={styles.radioBlock}>
                    <RadioButton
                        value="disability"
                        status={checked === 'disability' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('disability')}
                        color='#00A1E7'
                    />

                    <Text>Handicap</Text>
                </View>

                {checked === 'none' &&
                    <View>

                        <Text style={styles.title}>Restrictions d'âge</Text>

                        <View style={styles.radioBlock}>
                            <RadioButton
                                value="none"
                                status={checkedAge === 'none' ? 'checked' : 'unchecked'}
                                onPress={() => setCheckedAge('none')}
                                color='#00A1E7'
                            />

                            <Text>Aucune restriction</Text>
                        </View>
                        <View style={styles.radioBlock}>
                            <RadioButton
                                value="max"
                                status={checkedAge === 'max' ? 'checked' : 'unchecked'}
                                onPress={() => setCheckedAge('max')}
                                color='#00A1E7'
                            />

                            <Text>Âge maximal</Text>
                        </View>
                    </View>
                }

                {checkedAge === 'max' &&
                    <View>
                        {maxAgeError && <Text style={styles.error}>{maxAgeError}</Text>}
                        <CustomInput
                            field={maxAge}
                            placeholder={"Age maximal"}
                            setField={setMaxAge}
                            secure={false}
                            type={'number'}
                            onBlur={async () => {
                                if (maxAge) {
                                    await setMaxAge(replaceAllWithCharacters(maxAge))
                                    parseInt(maxAge) > 18 ? setMaxAgeError('L\'âge maximal ne peut dépasser 18.') : setMaxAgeError(null)
                                }
                            }}
                        />
                    </View>
                }

                {checked === 'none' &&
                    <View>

                        <Text style={styles.title}>Restrictions de points</Text>

                        <View style={styles.radioBlock}>
                            <RadioButton
                                value="none"
                                status={checkedPoints === 'none' ? 'checked' : 'unchecked'}
                                onPress={() => setCheckedPoints('none')}
                                color='#00A1E7'
                            />

                            <Text>Aucune restriction</Text>
                        </View>
                        <View style={styles.radioBlock}>
                            <RadioButton
                                value="max"
                                status={checkedPoints === 'min' ? 'checked' : 'unchecked'}
                                onPress={() => setCheckedPoints('min')}
                                color='#00A1E7'
                            />

                            <Text>Points minimaux</Text>
                        </View>
                    </View>
                }

                {checkedPoints === 'min' &&
                    <View>
                        {minPointsError && <Text style={styles.error}>{minPointsError}</Text>}
                        <CustomInput
                            field={minPoints}
                            placeholder={"Points minimaux (exemple : 1200)"}
                            setField={setMinPoints}
                            secure={false}
                            type={'number'}
                            onBlur={async () => {
                                if (minPoints) {
                                    await setMinPoints(replaceAllWithCharacters(minPoints))
                                    if (parseInt(minPoints) < 599) {
                                        setMinPointsError('La restriction de points minimale est de 599.')
                                    } else if (parseInt(minPoints) > 3000) {
                                        setMinPointsError('La restriction de points maximale est de 3000.')
                                    } else {
                                        setMinPointsError(null)
                                    }
                                }
                            }}
                        />
                    </View>
                }

                {!checkRequirements() && categories.length > 0 &&
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: '#FFB700', textAlign: 'center' }}>ATTENTION</Text>
                        <Text style={{ color: '#FFB700', textAlign: 'center' }}>Les données de la série en cours seront perdues.</Text>

                        <Pressable style={styles.nextYellowBtn} onPress={() => {
                            createContest(false)
                        }}>
                            <Text style={[styles.nextBtnText, { textAlign: 'center' }]}>Créer le tournoi</Text>
                        </Pressable>
                    </View>
                        }

                {checkRequirements() &&
                    <View style={styles.row}>
                        <Pressable style={styles.nextBtn} onPress={() => {
                            createContest(true)
                        }}>
                            <Text style={styles.nextBtnText}>Créer le tournoi</Text>
                        </Pressable>

                        <Pressable style={styles.nextBtnWhite} onPress={() => {
                            saveCategory()
                            showMessage({
                                message: "Série ajoutée temporairement.",
                                type: "info",
                            })
                        }}>
                            <Text style={styles.nextBtnTextWhite}>Ajout de série</Text>
                        </Pressable>
                    </View>
                }

                {show &&
                    <DateTimePicker
                        minimumDate={date}
                        maximumDate={endDate}
                        testID="dateTimePicker"
                        value={catDate ? catDate : new Date()}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                }

                {timeShow &&
                    <DateTimePicker
                        testID="timePicker"
                        value={catTime ? catTime : new Date()}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onTimeChange}
                    />
                }

            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 18,
        marginVertical: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowStrict: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowElement: {
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
    dateFilled: {
        color: '#000000'
    },
    radioBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    error: {
        color: '#E1673D',
        marginVertical: 10
    },
    nextBtn: {
        marginTop: 20,
        backgroundColor: '#00A1E7',
        padding: 15,
        borderRadius: 5,
    },
    nextYellowBtn: {
        marginTop: 5,
        backgroundColor: '#FFB700',
        padding: 15,
        borderRadius: 5,
    },
    nextBtnWhite: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderColor: '#00A1E7',
        borderWidth: 2,
        padding: 15,
        borderRadius: 5,
    },
    nextBtnText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    nextBtnTextWhite: {
        fontSize: 18,
        color: '#00A1E7',
        fontWeight: 'bold'
    }
})