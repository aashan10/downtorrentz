import AsyncStorage from '@react-native-community/async-storage';

export default  class DB{
    static set = async(key, value) => {
        try{
            console.log(key, value);
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }catch(e){
            console.log(e);
        }
    }

    static get = async(key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if(value !== null) {
              return value;
            }
          } catch(e) {
            console.log(e);
          }
    }
}

