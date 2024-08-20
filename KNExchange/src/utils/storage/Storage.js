import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key,data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('Data Set Success');
    } catch (error) {
      console.log('Error Storing Data',error);
    }
};

export const getData = async (key) => {
    try {
      value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log("Error retrieving data", error);
      return null;
    }
    
};

export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Item Remove Success");
    } catch (error) {
      console.log("Error Removing item", error);
    }
};
