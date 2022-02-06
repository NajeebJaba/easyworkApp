import { Component, default as React } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import LoginScreen from './LoginScreen'
import { setScreen, setUser } from "../store/dataActions";
import NewWorker from "./NewWorker";
import { COMPLAINTS, MY_SCHED, NEW_COMP, NEW_SCHED, NEW_WORKER } from '../consts/Screens';
import WorkersComplaints from "./WorkersComplaints";
import NewComplaint from "./NewComplaint";
import Sched from "./Sched";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#3C038C',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  buttonText: {
    color: 'white'
  },
  h1: {
    margin: 10,
    fontSize: 26,
  }
})

class MainScreen extends Component {
  componentDidMount() {
  }

  render() {
    const { user, dispatch, screen } = this.props;

    if (!user) {
      // not logged in
      return <LoginScreen />
    }

    if(user.admin) {

      if(screen === NEW_WORKER) {
        return <NewWorker />;
      }

      if(screen === COMPLAINTS) {
        return <WorkersComplaints />;
      }

      if(screen === NEW_SCHED) {
        return <Sched editable={true} />;
      }


      return (
          <View style={styles.container}>
            <Text style={styles.h1}>תפריט מנהל</Text>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(setScreen(NEW_WORKER))}>
              <Text style={styles.buttonText}>הכנס עובד חדש</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(setScreen(COMPLAINTS))}>
              <Text style={styles.buttonText}>תלונות העובדים</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(setScreen(NEW_SCHED))}>
              <Text style={styles.buttonText}>סידור עבודה</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(setUser(null))}>
              <Text style={styles.buttonText}>התנתק</Text>
            </TouchableOpacity>
          </View>
      );

    }

    if(screen === MY_SCHED) {
      return <Sched editable={false}  />;
    }
    if(screen === NEW_COMP) {
      return <NewComplaint />;
    }

    return (
      <View style={styles.container}>
       <Text style={styles.h1}>תפריט עובד</Text>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(setScreen(NEW_COMP))}>
          <Text style={styles.buttonText}>תלונות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(setScreen(MY_SCHED))}>
          <Text style={styles.buttonText}>צפה בסידור עבודה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(setUser(null))}>
          <Text style={styles.buttonText}>התנתק</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.data.user,
  screen: state.data.screen,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
