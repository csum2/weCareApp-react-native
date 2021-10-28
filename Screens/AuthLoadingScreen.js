/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
import { Colors } from './../components/styles';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {logoColor, buttonColors, blackColor, backgroundApp} = Colors;

const AuthLoadingScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          value === null ? 'LoginScreen' : 'HomeScreen'
        ),
      );
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
          source={require('../Images/wecarelogo.png')}
          style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color={logoColor}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: {backgroundApp},
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
