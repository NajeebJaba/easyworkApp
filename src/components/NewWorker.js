import { Component, default as React, useEffect, useState } from 'react'
import { Alert, BackHandler, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Input } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import { setScreen, setUser } from "../store/dataActions";
import { USER_SCREEN } from "../consts/Screens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    color: 'orange',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
    input: {
        width: 240,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        color:'black',
        marginBottom: 10,
    },
    h1: {
        margin: 10,
        fontSize: 26,
    },
    button: {
        backgroundColor: '#3C038C',
        width: 240,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 5,
    },
    buttonText: {
        color: 'white'
    },
})

const NewWorker = (props) => {
  const { dispatch } = props;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleBackButton = () => {
    dispatch(setScreen(USER_SCREEN));
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
      <View style={styles.container}>
          <View style={{
              alignItems: 'center'
          }}>
        <Text style={styles.h1}>הכנס עובד חדש</Text>
          </View>
        <TextInput value={name} placeholder={"שם מלא"} onChangeText={setName} style={styles.input} />
        <TextInput value={phone} placeholder={"טלפון"} onChangeText={setPhone} style={styles.input} />
        <TextInput value={id} placeholder={"ת.ז."} onChangeText={setId} style={styles.input} />
        <TextInput value={password} placeholder={"סיסמת התחברות של העובד"} onChangeText={setPassword} style={styles.input} />


          <TouchableOpacity style={styles.button} onPress={() => {

              if(!name || !phone || !password || !id){
                  Alert.alert("אחד הפרטים חסר")
                  return;
              }

              firestore()
                  .collection('users')
                  .add({
                      id,
                      password,
                      admin: false,
                      phone,
                      name
                  })
                  .then(res => {
                      console.log(res)
                      Alert.alert("העובד הוכנס בהצלחה")
                      dispatch(setScreen(USER_SCREEN))
                  })
                  .catch(() => {
                      Alert.alert("קרתה שגיאה")
                  });
          }}>
              <Text style={styles.buttonText}>הכנס</Text>
          </TouchableOpacity>

      </View>
  );
}

const mapStateToProps = state => ({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewWorker)
