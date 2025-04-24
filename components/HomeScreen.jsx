import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigateTo, user }) => {
  const [username, setUsername] = useState('John');
  const [greeting, setGreeting] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [foods, setFoods] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchFoods();
    calculateGreeting();
  }, []);

  const calculateGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  };

  const fetchFoods = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/foods'); 
      const data = await response.json();
      console.log('Foods data:', data);
      setFoods(data);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch food items');
      console.error('Error fetching foods:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigateTo('LoginScreen') },
      ],
      { cancelable: false }
    );
  };

  const addToCart = async (foodId) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodId, userId }), 
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to add to cart:', data.error);
        Alert.alert('Error', 'Failed to add to cart');
        return;
      }

      Alert.alert('Success', 'Item added to cart successfully!');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding to cart.');
    }
  };

  const addToFavorites = async (foodId) => {
    try {
      const response = await fetch('http://localhost:5000/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to favorites');
      }

      Alert.alert('Success', 'Item added to favorites!');
    } catch (error) {
      Alert.alert('Error', 'Unable to add item to favorites');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {greeting}, {username}!
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.cartIconContainer}
            onPress={() => navigateTo('Cart')} // Navigate to Cart
          >
            <Ionicons name="cart" size={28} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.cartCountContainer}>
                <Text style={styles.cartCount}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search foods..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Food List */}
      <FlatList
        data={foods.filter((food) =>
          food.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodTile}>
            <Image source={require('../assets/images/1.jpg')} style={styles.foodImage} />
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodPrice}>${item.price}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => addToCart(item.id)}>
                <Ionicons name="cart-outline" size={24} color="#6a11cb" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addToFavorites(item.id)}>
                <Ionicons name="heart-outline" size={24} color="#ff5252" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="home-outline" size={28} color="#6a11cb" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Cart')}>
          <Ionicons name="cart-outline" size={28} color="#6a11cb" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Settings')}>
          <Ionicons name="settings-outline" size={28} color="#6a11cb" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('AboutUs')}>
          <Ionicons name="information-circle-outline" size={28} color="#6a11cb" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Profile')}>
          <Ionicons name="person-outline" size={28} color="#6a11cb" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#6a11cb',
    padding: 15,
    borderRadius: 15,
  },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  cartIconContainer: { position: 'relative', marginRight: 10 },
  cartCountContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartCount: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  logoutButton: {
    marginLeft: 15,
  },
  searchBar: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  foodTile: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  foodImage: { width: '100%', height: 120, borderRadius: 8 },
  foodName: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  foodPrice: { fontSize: 16, color: '#888', marginVertical: 4 },
  iconContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;