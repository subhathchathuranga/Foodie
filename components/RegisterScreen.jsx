import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Modal,
    Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const RegisterScreen = ({ navigateTo }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleRegister = async () => {
        if (!username || !email || !password || !phoneNumber) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                username,
                email,
                password,
                phoneNumber,
            });

            setModalVisible(true); // Show success modal
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'Something went wrong.');
            }
        }
    };

    return (
        <LinearGradient
        colors={['#00f2fe', '#004953']}
            style={styles.container}
        >
            <Text style={styles.title}>Create an Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor="#aaa"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <LinearGradient
                    colors={['#6a11cb', '#2575fc']}
                    style={styles.buttonGradient}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </LinearGradient>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Successfully Signed Up!</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigateTo('LoginScreen');
                            }}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    input: {
        width: '85%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    button: {
        width: '85%',
        borderRadius: 25,
        marginTop: 20,
    },
    buttonGradient: {
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    modalButton: {
        backgroundColor: '#6a11cb',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
