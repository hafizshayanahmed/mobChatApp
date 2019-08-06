import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';

class Msg extends React.Component {
  constructor() {
    super();
    this.state = {
     
  }
}
  render() {
    return (
      <View style={styles.container}>
        <Text>In progress</Text>
      </View>
    );
  }
}

export default Msg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});