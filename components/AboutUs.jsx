import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutUs = ({ navigateTo }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>About Us</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{
            uri: 'https://www.netsolutions.com/insights/wp-content/uploads/2021/11/essential-feature-of-building-an-on-demand-food-ordering-app.jpg', // Replace with your company logo or relevant image
          }}
          style={styles.image}
        />
        <Text style={styles.heading}>Welcome to FOODIE</Text>
        <Text style={styles.description}>
          At FOODIE, we’re passionate about connecting people with the best meals in their area. Since our
          founding in 2015, we've made it our mission to deliver delicious food quickly, efficiently, and affordably.
        </Text>

        <Text style={styles.sectionTitle}>Our Services</Text>
        <Text style={styles.description}>
          - Fast and reliable food delivery from your favorite restaurants.
          {'\n'}- Flexible order scheduling to fit your lifestyle.
          {'\n'}- Exclusive deals and discounts to help you save.
        </Text>

        <Text style={styles.sectionTitle}>Our Values</Text>
        <Text style={styles.description}>
          - Customer First: Your satisfaction is our priority.
          {'\n'}- Quality Assurance: We partner with trusted restaurants.
          {'\n'}- Community Impact: Supporting local businesses and reducing food waste.
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.description}>
          Have questions or feedback? We’d love to hear from you!
          {'\n'}Email: support@foodexpress.com
          {'\n'}Phone: +1 (555) 123-4567
        </Text>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Ionicons name="home-outline" size={28} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Cart')}>
          <Ionicons name="cart-outline" size={28} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Settings')}>
          <Ionicons name="settings-outline" size={28} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('AboutUs')}>
          <Ionicons name="information-circle" size={28} color="#4CAF50" />  {/* Highlight AboutUs Icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Profile')}>
          <Ionicons name="person-outline" size={28} color="#444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7fc' },  // Soft light background
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF50',  // Green header
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',  // White text in header
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 10,  // Rounded corners for the image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',  // Darker heading for contrast
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
    marginVertical: 10,
    textAlign: 'justify',
    color: '#444',  // Darker text for readability
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    paddingHorizontal: 20,
    color: '#4CAF50',  // Green section titles for consistency
  },
  scrollContainer: {
    paddingBottom: 80,  // Padding to avoid bottom content overlap
  },
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,  // Shadow for bottom nav
  },
});

export default AboutUs;
