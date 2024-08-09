import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({navigation}) => {
  const animatedValue = React.useRef(new Animated.Value(1)).current;

  
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short').required('Required'),
  });

  const handleSignup = async values => {
    await AsyncStorage.setItem('user', JSON.stringify(values));
    alert('User registered successfully!');
    navigation.navigate('Login');
  };

  
  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{scale: animatedValue}],
  };

  return (
    <ImageBackground
      source={require('../Assest/bg1.jpg')}
      style={styles.backgroundImage}>
      <Formik
        initialValues={{firstName: '', lastName: '', email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSignup}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
              style={styles.input}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholder="First Name"
              placeholderTextColor="#ccc"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholder="Last Name"
              placeholderTextColor="#ccc"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
              placeholderTextColor="#ccc"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleSubmit}
              activeOpacity={0.8}>
              <Animated.View style={[styles.button, animatedStyle]}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </Animated.View>
            </TouchableOpacity>

            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate('Login')}>
              Already have an account? Login
            </Text>
          </View>
        )}
      </Formik>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#1e90ff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Signup;
