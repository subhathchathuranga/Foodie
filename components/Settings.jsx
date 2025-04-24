import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Settings = ({ navigateTo }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationsEnabled((prev) => !prev);
    Alert.alert(
      'Notifications',
      isNotificationsEnabled ? 'Notifications Disabled' : 'Notifications Enabled'
    );
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    Alert.alert(
      'Theme',
      isDarkTheme ? 'Switched to Light Theme' : 'Switched to Dark Theme'
    );
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

  const theme = {
    backgroundColor: isDarkTheme ? '#121212' : '#fff',
    textColor: isDarkTheme ? '#fff' : '#000',
    cardBackgroundColor: isDarkTheme ? '#1e1e1e' : '#f9f9f9',
    borderColor: isDarkTheme ? '#444' : '#ccc',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="arrow-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.textColor }]}>Settings</Text>
      </View>

      {/* Notification Toggle */}
      <View
        style={[
          styles.settingItem,
          { backgroundColor: theme.cardBackgroundColor },
        ]}
      >
        <Text style={[styles.settingText, { color: theme.textColor }]}>
          Enable Notifications
        </Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Theme Toggle */}
      <View
        style={[
          styles.settingItem,
          { backgroundColor: theme.cardBackgroundColor },
        ]}
      >
        <Text style={[styles.settingText, { color: theme.textColor }]}>
          Dark Theme
        </Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: '#ff5252' }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View
        style={[
          styles.bottomNavigation,
          { borderTopColor: theme.borderColor, backgroundColor: theme.backgroundColor },
        ]}
      >
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="home-outline" size={28} color={theme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Cart')}>
          <Ionicons name="cart-outline" size={28} color={theme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Settings')}>
          <Ionicons name="settings-outline" size={28} color={theme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('AboutUs')}>
          <Ionicons
            name="information-circle-outline"
            size={28}
            color={theme.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Profile')}>
          <Ionicons name="person-outline" size={28} color={theme.textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  settingText: { fontSize: 16, fontWeight: '500' },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Settings;
