import {Modal, Pressable, Text, View, StyleSheet} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {useNavigation} from "@react-navigation/native";

export const AnonymousModal = ({modalVisible, setModalVisible}) => {
    const navigation = useNavigation()

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable
                        style={styles.crossBlock}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <MaterialCommunityIcon name="close" color="#E1673D"
                                               size={26}/>
                    </Pressable>
                    <LottieView source={require('../assets/user.json')} autoPlay={true} loop={true} style={{ width: '70%' }} />
                    <Text style={styles.text}>Vous devez être connecté pour effectuer cette action.</Text>

                    <Pressable style={styles.connectionBtn} onPress={() => {
                        setModalVisible(false)
                        navigation.navigate('Account', {screen: 'Profile'})
                    }}>
                        <Text style={styles.connectionBtnText}>Se connecter</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingBottom: 25,
        paddingTop: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    },
    crossBlock: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cross: {
        fontSize: 30
    },
    button: {
        marginTop: 20
    },
    buttonText: {
        color: '#E1673D'
    },
    connectionBtn: {
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 25,
        width: '100%',
        backgroundColor: '#00A1E7',
    },
    connectionBtnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    }
})