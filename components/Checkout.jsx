import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Modal,
    Alert,
    ScrollView,  // Import ScrollView
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Checkout = ({ navigateTo }) => {
    const [receptionName, setReceptionName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const [showPopup, setShowPopup] = useState(false);

    const handlePayment = async () => {
        if (
            !receptionName ||
            !phoneNumber ||
            !district ||
            !city ||
            !address ||
            !zipCode ||
            !cardNumber ||
            !nameOnCard ||
            !expiry ||
            !cvv
        ) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        const data = {
            userId: 1, // Replace with actual user ID
            receptionName,
            phoneNumber,
            district,
            city,
            address,
            zipCode,
            cardNumber,
            nameOnCard,
            expiryDate: expiry,
            cvv,
        };

        try {
            await axios.post('http://localhost:5000/api/checkout', data);
            setShowPopup(true); // Show success popup
        } catch (error) {
            console.error('Payment failed:', error.response?.data || error.message);
            Alert.alert('Error', 'Payment failed. Please try again.');
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        navigateTo('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Cart')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>
            

            <Text style={styles.sectionTitle}>Address Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Reception Name"
                value={receptionName}
                onChangeText={setReceptionName}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="District"
                value={district}
                onChangeText={setDistrict}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Zip Code"
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="number-pad"
            />

            <Text style={styles.sectionTitle}>Card Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="number-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Name on Card"
                value={nameOnCard}
                onChangeText={setNameOnCard}
            />
            <TextInput
                style={styles.input}
                placeholder="Expiry (MM/YY)"
                value={expiry}
                onChangeText={setExpiry}
                keyboardType="number-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="number-pad"
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={handlePayment}>
                <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>

            <Modal
                visible={showPopup}
                transparent
                animationType="fade"
                onRequestClose={closePopup}
            >
                <View style={styles.popupOverlay}>
                    <View style={styles.popup}>
                        <Ionicons name="checkmark-circle" size={60} color="green" />
                        <Text style={styles.popupTitle}>Payment Successful</Text>
                        <Text style={styles.popupMessage}>Your order has been placed!</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
                            <Text style={styles.closeButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
    button: {
        padding: 15,
        backgroundColor: 'green',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    popupOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,},
    popup: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    popupTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
    popupMessage: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 20 },
    closeButton: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        width: '50%',
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Checkout;
