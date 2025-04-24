import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Cart = ({ navigateTo }) => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Sandwich', price: 2.2, quantity: 1 },
    { id: '2', name: 'Pizza', price: 3, quantity: 2 },
  ]);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>
        Price: ${item.price} | Quantity: {item.quantity}
      </Text>
      <Text style={styles.itemTotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />

      {/* Total Price */}
      <Text style={styles.totalPrice}>Total: ${calculateTotal()}</Text>

      {/* Checkout Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4CAF50' }]}  // Green Checkout Button
        onPress={() => navigateTo('Checkout')}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="home-outline" size={28} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Cart')}>
          <Ionicons name="cart-outline" size={28} color="#4CAF50" />  {/* Highlight Cart Icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Settings')}>
          <Ionicons name="settings-outline" size={28} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('AboutUs')}>
          <Ionicons name="information-circle-outline" size={28} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Profile')}>
          <Ionicons name="person-outline" size={28} color="#444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f7fc' },  // Light background
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#4CAF50',  // Green header
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',  // White text in header
  },
  cartList: { marginBottom: 20 },
  cartItem: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',  // White background for items
    elevation: 5,  // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  itemDetails: { fontSize: 14, color: '#777' },
  itemTotal: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold', marginTop: 5 },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'right',
    color: '#333',  // Dark text for total price
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16 },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,  // Rounded corners for navigation
    elevation: 3,  // Slight shadow for navigation
  },
  navIcon: { fontSize: 28 },
});

export default Cart;
