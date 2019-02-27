import React, { Component } from 'react';
import PhoneInput from './components/PhoneInput'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PhoneInput defaultCountry='de'/>
      </div>
    );
  }
}

export default App;
