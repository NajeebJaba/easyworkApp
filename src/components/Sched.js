import { Component, default as React, useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import {
    Alert,
    BackHandler,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View
} from 'react-native'

import { connect } from 'react-redux'
import { Input } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import { setScreen, setUser } from "../store/dataActions";
import { USER_SCREEN } from "../consts/Screens";
import Spinner from "./Spinner";

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

const updateDB = (date, data) => {
    console.log("updating",date, data)
    firestore()
        .collection('sched')
        .doc(date)
        .set(data)
        .then(res => {
        })
        .catch(() => {
            ToastAndroid.show("שגיאה בעדכון", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        });
}


const SchedItem = (props) => {
    const { date , shift1, shift2, workers } = props.item;

    const editable = props.editable;

    const [s1, setS1] = useState(shift1);
    const [s2, setS2] = useState(shift2);


    useEffect(() => {
        updateDB(date, {
            shift1: s1,
            shift2: s2,
        });
    }, [s1, s2]);

    const selectStyle = {
        flex: 1,
        padding: 16,
    };

    const titleStyle = {
      fontSize: 16,
      fontWeight: 'bold',

    };

    return (
        <View>
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline'}}>{date}</Text>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 8,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.25)',
                borderRadius: 16,
            }}>
                <View style={{
                    ...selectStyle,
                    borderRightWidth: 1,
                    borderColor: 'rgba(0,0,0,0.25)',
                }}>
                    <Text style={titleStyle}>משמרת 7:00-15:00</Text>
                    {
                        editable ?

                            <Picker
                                selectedValue={s1}
                                onValueChange={(itemValue, itemIndex) => {
                                    setS1(itemValue);
                                }}>
                                {
                                    workers.map(w => {
                                        return (
                                            <Picker.Item key={w.id} label={w.name} value={w.id} />
                                        )
                                    })
                                }
                            </Picker>
                            :
                            <Text>{workers.filter(w => w.id === s1)[0].name}</Text>
                    }
                </View>
                <View style={selectStyle}>
                    <Text style={titleStyle}>משמרת 15:00-23:00</Text>
                    {
                        editable ?
                            <Picker
                                selectedValue={s2}
                                onValueChange={(itemValue, itemIndex) => {
                                    setS2(itemValue);
                                }}>
                                {
                                    workers.map(w => {
                                        return (
                                            <Picker.Item key={w.id} label={w.name} value={w.id} />
                                        )
                                    })
                                }
                            </Picker>
                            :
                            <Text>{workers.filter(w => w.id === s2)[0].name}</Text>
                    }
                </View>
            </View>
        </View>
    );
}

const Sched = (props) => {
  const { dispatch, editable = false } = props;

    const [data, setData] = useState(null);
    const [workers, setWorkers] = useState(null);

  const handleBackButton = () => {
    dispatch(setScreen(USER_SCREEN));
    return true;
  };

    useEffect(() => {
        firestore()
            .collection('sched')
            .get()
            .then(res => {
                const d = [];
                for(const doc of res.docs){
                    d.push({
                        ...doc._data,
                        date: doc.id
                    });
                }
                setData(d);
            })
            .catch(() => {
                ToastAndroid.show("שגיאה בשליפת הנתונים", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                setData([])
            });

        firestore()
            .collection('users')
            .get()
            .then(res => {
                const d = [{ id: "", name: ""}];
                for(const doc of res.docs){
                    if(!doc._data.admin){
                        d.push(doc._data);
                    }
                }
                setWorkers(d);
            })
            .catch(() => {
                ToastAndroid.show("שגיאה בשליפת הנתונים", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                setWorkers([])
            });
    }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);


    if(data === null || workers == null){
        return <Spinner />;
    }

    const days = [];
    const today = new Date();

    for(let i =0; i< 7; i++){
        const nday = new Date(today);
        nday.addDays(i);

        const d = {
            date: nday.myToString(),
            workers,
            shift1: "",
            shift2: "",
        };

        const t = data.filter(s => s.date === d.date);

        if(t.length > 0) {
            if(t[0].shift1) {
                d.shift1 = t[0].shift1;
            }
            if(t[0].shift2) {
                d.shift2 = t[0].shift2;
            }
        }

        days.push(d)
    }
    console.log(days)
    console.log(data)
    console.log(workers)
    console.log(editable)

  return (
      <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
              <Text style={styles.headerText}>סידור עבודה</Text>
          </View>

          <FlatList
              numColumns={1}
              data={days}
              keyExtractor={d => d.date}
              renderItem={d => {
                  return <SchedItem editable={editable} item={d.item} />;
              }}
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
)(Sched)
