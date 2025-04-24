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
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const LoginScreen = ({ navigateTo }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in both fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password,
            });
            setModalVisible(true); // Show success modal
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Alert.alert('Error', 'Invalid credentials');
            } else {
                Alert.alert('Error', 'Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#00f2fe', '#004953']}
            style={styles.container}
        >
            {/* Logo Section */}
            <Image
                source={require('../assets/images/Logo.png')} // Update the path to your logo
                style={styles.logo}
            />

            <Text style={styles.title}>Welcome to FoodiePal</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={loading}
            >
                <LinearGradient
                    colors={['#6a11cb', '#2575fc']}
                    style={styles.buttonGradient}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigateTo('Register')}
            >
                <Text style={styles.registerButtonText}>
                    Don't have an account? Register
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Successfully Logged In!</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigateTo('Home');
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
    },
    logo: {
        width: 150, // Adjust size as needed
        height: 150, // Adjust size as needed
        marginBottom: 20,
        borderRadius: 75, // If your logo is circular
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
    registerButton: {
        marginTop: 15,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 14,
        textDecorationLine: 'underline',
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
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalButton: {
        backgroundColor: '#4F6D7A',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LoginScreen;
