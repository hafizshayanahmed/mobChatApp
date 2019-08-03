import React from 'react';
import { View } from 'react-native';
import Navigation from "./components/navigation"

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <View style={{ flex: 1 ,padding: 5, paddingtop: 0 }}>
        <Navigation />
      </View>
    );
  }
}

export default App