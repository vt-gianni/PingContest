import {Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useContext, useEffect, useState} from "react"
import contestCreationContext from "../context/ContestCreationContext";
import {RadioButton} from "react-native-paper";
import CustomInput from "../component/CustomInput";

export const ContestCategoryCreationScreen = () => {
    const {
        address, city, hallName, date, endDate, endRegistrationDate,
    } = useContext(contestCreationContext)

    const [checked, setChecked] = useState('none')
    const [checkedAge, setCheckedAge] = useState('none')
    const [checkedPoints, setCheckedPoints] = useState('none')

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

    return (
        <View style={ styles.container }>
            <Text style={styles.title}>Choix du type de la série</Text>

            <View style={styles.radioBlock}>
                <RadioButton
                    value="none"
                    status={ checked === 'none' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('none') }
                    color='#00A1E7'
                />

                <Text>Aucune restriction</Text>
            </View>

            <View style={styles.radioBlock}>
                <RadioButton
                    value="women"
                    status={ checked === 'women' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('women') }
                    color='#00A1E7'
                />

                <Text>Femmes</Text>
            </View>

            <View style={styles.radioBlock}>
                <RadioButton
                    value="open"
                    status={ checked === 'open' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('open') }
                    color='#00A1E7'
                />

                <Text>Open</Text>
            </View>

            <View style={styles.radioBlock}>
                <RadioButton
                    value="disability"
                    status={ checked === 'disability' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('disability') }
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
                    { maxAgeError && <Text style={styles.error}>{maxAgeError}</Text> }
                    <CustomInput
                        field={maxAge}
                        placeholder={"Age maximal"}
                        setField={setMaxAge}
                        secure={false}
                        type={'number'}
                        onBlur={async () => {
                            await setMaxAge(maxAge.replace('.', '').replace(' ', '').replace('-', '').replace(',', ''))
                            parseInt(maxAge) > 18 ? setMaxAgeError('L\'âge maximal ne peut dépasser 18.') : setMaxAgeError(null)
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
                    { minPointsError && <Text style={styles.error}>{minPointsError}</Text> }
                    <CustomInput
                        field={minPoints}
                        placeholder={"Points minimaux (exemple : 1200)"}
                        setField={setMinPoints}
                        secure={false}
                        type={'number'}
                        onBlur={async () => {
                            await setMinPoints(minPoints.replace('.', '').replace(' ', '').replace('-', '').replace(',', ''))
                            parseInt(minPoints) < 599 ? setMinPointsError('La restriction de points minimale est de 599.') : setMinPointsError(null)
                            parseInt(minPoints) > 3000 ? setMinPointsError('La restriction de points maximale est de 3000.') : setMinPointsError(null)
                        }}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 18,
        marginVertical: 10
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