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
        color: '#3C038C',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    input: {
        width: 240,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        color:'black',
        marginBottom: 10,
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

const NewComplaint = (props) => {
  const { dispatch, user } = props;

  const [content, setContent] = useState('');

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
          <View style={{alignItems: 'center'}}>
              <Text style={styles.headerText}>תלונות</Text>
          </View>

      <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={"תוכן התלונה"}
          style={styles.input}
          onChangeText={setContent}
          value={content}/>


          <TouchableOpacity style={styles.button} onPress={() => {

              if(!content){
                  Alert.alert("לא ניתן להגיש תלונה ריקה")
                  return;
              }

              firestore()
                  .collection('complaints')
                  .add({
                      id: user.id,
                      name: user.name,
                      content: content,
                      dateStr: new Date().myToString(),
                      date: Date.now(),
                  })
                  .then(res => {
                      console.log(res)
                      Alert.alert("התלונה נשלחה בהצלחה למנהל")
                      dispatch(setScreen(USER_SCREEN))
                  })
                  .catch(() => {
                      Alert.alert("קרתה שגיאה")
                  });
          }}>
              <Text style={styles.buttonText}>שלח</Text>
          </TouchableOpacity>

      </View>
  );
}

const mapStateToProps = state => ({
    user: state.data.user
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComplaint)
