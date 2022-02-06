import { default as React, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, ToastAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { setScreen, setUser } from "../store/dataActions";
import Spinner from "./Spinner";
import { NEW_WORKER } from "../consts/Screens";


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
    height: 45,
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

const LoginScreen = (props) => {
  const { dispatch } = props;

  const [id, setId] = useState('205288459'); // 1
  const [password, setPassword] = useState('123456'); // 1
    const [loading, setLoading] = useState(false);

  const onLogin = () => {
      console.log("login")
      setLoading(true)
    firestore()
        .collection('users')
        .where('id','==',id)
        .where('password','==',password)
        .get()
        .then(res => {
            console.log(res)
            if(res.docs.length > 0){
                const user = res.docs[0]._data;
                console.log(user)
                setLoading(false);
                dispatch(setUser(user));
            } else {
                ToastAndroid.show("פרטים שגויים", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                setLoading(false);
            }
        }).catch(res => {
        Alert.alert("קרתה שגיאה")
        setLoading(false);
    });
  };

  if(loading){
      return <Spinner />;
  }

  // not logged in
  return (
    <View style={styles.container}>

      <Text style={styles.headerText}>easyworks</Text>


      <TextInput
        value={id}
        onChangeText={setId}
        placeholder={'תעודת זהות'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={'סיסמה'}
        secureTextEntry={true}
        style={styles.input}
      />


        <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>התחבר</Text>
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
)(LoginScreen)
