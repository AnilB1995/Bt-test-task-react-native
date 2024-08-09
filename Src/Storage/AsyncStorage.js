import AsyncStorage from '@react-native-async-storage/async-storage';

export const FillData = (key, body) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(body));
  } catch (e) {
    console.log('AsyncStorage Error in ' + key + '& Data' + data);
  }
};

export const getData = async key => {
  try {
    var data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (e) {
    console.log('Error in' + key, e);
  }
};

export const removeData = key => {
  try {
    AsyncStorage.removeItem('userData');
    return JSON.parse(data);
  } catch (e) {
    console.log('Error in' + key, e);
  }
};
