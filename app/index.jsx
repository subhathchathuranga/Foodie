import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from '../components/LoginScreen';
import HomeScreen from '../components/HomeScreen';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import RegisterScreen from '../components/RegisterScreen';
import Settings from '../components/Settings';
import AboutUs from '../components/AboutUs';
import Profile from '../components/Profile';


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('LoginScreen'); // State for current screen

  // Function to navigate to a different screen
  const navigateTo = (screenName) => {
    setCurrentScreen(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Pass navigateTo as a prop to the screens */}
      {currentScreen === 'Register' && <RegisterScreen navigateTo={navigateTo} />}
      {currentScreen === 'LoginScreen' && <LoginScreen navigateTo={navigateTo} />}
      {currentScreen === 'Home' && <HomeScreen navigateTo={navigateTo} />}
      {currentScreen === 'Cart' && <Cart navigateTo={navigateTo} />}
      {currentScreen === 'Checkout' && <Checkout navigateTo={navigateTo} />}
      {currentScreen === 'Settings' && <Settings navigateTo={navigateTo} />}
      {currentScreen === 'AboutUs' && <AboutUs navigateTo={navigateTo} />}
      {currentScreen === 'Profile' && <Profile navigateTo={navigateTo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
