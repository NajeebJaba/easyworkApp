import React, { Component, Fragment } from 'react';
import MainScreen from './src/components/MainScreen';


class App extends Component {
  render() {

    Date.prototype.addDays = function (d) {
      if (d) {
        let t = this.getTime();
        t = t + (d * 86400000);
        this.setTime(t);
      }
    };

    Date.prototype.myToString = function() {
      const mm = this.getMonth() + 1; // getMonth() is zero-based
      const dd = this.getDate();

      return [(dd>9 ? '' : '0') + dd,(mm>9 ? '' : '0') + mm,this.getFullYear()].join('-');
    };


    return (
      <Fragment>
        <MainScreen />
      </Fragment>
    )
  }
}


export default App;
