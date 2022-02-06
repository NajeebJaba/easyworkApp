import { Component, default as React, useEffect, useState } from 'react'
import {
    Alert,
    BackHandler,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { Input, ListItem } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import { setScreen, setUser } from "../store/dataActions";
import { USER_SCREEN } from "../consts/Screens";
import Spinner from "./Spinner";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
    headerText: {
        color: '#3C038C',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
})

const WorkersComplaints = (props) => {
  const { dispatch } = props;

  const [complaints, setComplaints] = useState(null);

  const handleBackButton = () => {
    dispatch(setScreen(USER_SCREEN));
    return true;
  };

  useEffect(() => {
      firestore()
          .collection('complaints')
          .get()
          .then(res => {
              const comp = [];
              for(const doc of res.docs){
                  comp.push(doc._data);
              }

              comp.sort((c1, c2) => c1.date - c2.date);

              setComplaints(comp);
          })
          .catch(() => {
              ToastAndroid.show("שגיאה בשליפת תלונות העובדים", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
              setComplaints([])
          });
      console.log("run 2")
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  console.log(complaints)

  if(complaints === null){
      return <Spinner />;
  }

  const textStyle = {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'grey'
  };

  return (
      <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
              <Text style={styles.headerText}>תלונות</Text>
          </View>
          <FlatList
              numColumns={1}
              data={complaints}
              keyExtractor={c => c.index}
              contentContainerStyle={{
                  // do styling..
              }}
              renderItem={c => (
                      <ListItem  style={{
                          display:'flex',
                      }}>
                          <ListItem.Content style={{
                              display:'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                              borderWidth: 1,
                              borderColor: 'rgba(0,0,0,0.25)',
                              borderRadius: 16,
                              padding: 16
                          }}>
                              <View style={{
                                  display: 'flex',
                                  flexDirection: 'row-reverse',
                                  width: '100%',
                                  justifyContent: 'space-between'
                              }}>
                                  <ListItem.Title style={{
                                      fontSize: 16,
                                      fontWeight: 'bold'
                                  }}>{c.item.name}</ListItem.Title>
                                  <ListItem.Subtitle style={textStyle}>{c.item.dateStr}</ListItem.Subtitle>
                              </View>
                              <ListItem.Subtitle style={textStyle}>ת"ז: {c.item.id}</ListItem.Subtitle>
                              <ListItem.Subtitle style={textStyle}>תוכן: {c.item.content}</ListItem.Subtitle>
                          </ListItem.Content >
                      </ListItem>
              )}
          />
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
)(WorkersComplaints)
