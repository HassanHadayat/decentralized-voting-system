import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully.');
    } catch (error) {
      console.log('Error while storing data:', error);
    }
  };
  

const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Retrieved data:', value);
      } else {
        console.log('No data found for the given key.');
      }
    } catch (error) {
      console.log('Error while retrieving data:', error);
    }
  };
  

const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data removed successfully.');
    } catch (error) {
      console.log('Error while removing data:', error);
    }
  };
  
const saveUserData = async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
  
    await storeData('user', JSON.stringify(user));
  };
  
  const retrieveUserData = async () => {
    const data = await retrieveData('user');
    if (data) {
      const user = JSON.parse(data);
      console.log('User data:', user);
    }
  };
  