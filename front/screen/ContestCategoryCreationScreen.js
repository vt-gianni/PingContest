import {Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useContext, useEffect, useState} from "react"
import contestCreationContext from "../context/ContestCreationContext";
import {RadioButton} from "react-native-paper";
import CustomInput from "../component/CustomInput";

export const ContestCategoryCreationScreen = () => {
    const {
        address, city, hallName, date, endDate, endRegistrationDate,
    } = useContext(contestCreationContext)

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

    useEffect(() => {
        checked !== 'none' && setCheckedAge('none')
        checked !== 'none' && setCheckedPoints('none')
    }, [checked])

    useEffect(() => {
        checkedAge === 'none' && setMaxAge(null)
    }, [checkedAge])

    useEffect(() => {
        maxAge === null && setMaxAgeError(null)
    }, [maxAge])

    useEffect(() => {
        checkedPoints === 'none' && setMinPoints(null)
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

    return (
        <ScrollView style={styles.container}>
            <View style={{paddingBottom: 30}}>
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
                                        await setMinParticipants(minParticipants.replace('.', '').replace(' ', '').replace('-', '').replace(',', ''))
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
                                        await setMaxParticipants(maxParticipants.replace('.', '').replace(' ', '').replace('-', '').replace(',', ''))
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
                                        await setPrice(price.replace('.', '').replace(' ', '').replace('-', '').replace(',', ''))
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
                                        await setWinPrice(winPrice.replace('.', '').replace(' ', '').replace('-', '').replace(',', ''))
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
                                    await setMaxAge(maxAge.replace('.', '').replace(' ', '').replace('-', '').replace(',', ''))
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
                                    await setMinPoints(minPoints.replace('.', '').replace(' ', '').replace('-', '').replace(',', ''))
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
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    rowElement: {
        width: '49%'
    },
    radioBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    error: {
        color: '#E1673D',
        marginVertical: 10
    }
})