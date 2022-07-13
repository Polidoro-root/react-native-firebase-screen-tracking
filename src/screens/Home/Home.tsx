import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import analytics from '@react-native-firebase/analytics';

const Home = () => {
  const navigation = useNavigation();

  const navigateToDetails = async () => {
    await analytics().logEvent('navigate_to_Details', {
      screen: 'Details',
    });

    navigation.navigate('Details');
  };

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Text>Home</Text>
      <TouchableOpacity onPress={navigateToDetails}>
        <Text>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
