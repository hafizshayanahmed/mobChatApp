import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { sendMessageToDb } from "../config/firebase"
import { firebase } from "../config/firebase"
import "firebase/firestore"
import EmojiInput from "react-native-emoji-input"

const db = firebase.firestore();

class Msg extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "",
            con: false
        }
    }

    componentDidMount() {
        this.getMessages()
    }

    async sendMessage() {
        await sendMessageToDb(this.state.text, this.props.navigation.state.params)
        this.setState({ text: "" })
    }

    getMessages() {
        const roomId = this.props.navigation.state.params
        var messages = []
        db.collection("chatrooms").doc(roomId).collection("messages")
            .orderBy("timestamp")
            .onSnapshot(snapshot => {
                messages = []
                snapshot.forEach(elem => {
                    messages.push({ data: elem.data(), _id: elem.id })
                })
                this.setState({
                    msg: messages,
                    con: true
                })
            })
    }

    render() {
        console.log(this.messageList)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View ref={(el) => { this.messageList = el }}>
                        {this.state.con && this.state.msg.map((e) => {
                            return <View style={e.user === 1
                                ?
                                { display: "flex", flexDirection: "column", alignItems: "flex-start" }
                                :
                                { display: "flex", flexDirection: "column", alignItems: "flex-end" }
                            }>
                                <Text style={e.user === 1 ? { textAlign: "right", height: 20, backgroundColor: "#0084FF", } : { textAlign: "left", height: 20, backgroundColor: "lightgrey" }}>
                                    {e.data.message}
                                </Text>
                            </View>
                        })}
                    </View>
                </ScrollView>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={95}
                    behavior="padding" >
                    <View style={{ width: "100%" }}>
                        <EmojiInput
                            onEmojiSelected={(emoji) => { console.log(emoji) }}
                        />
                        <TextInput style={{ height: 30, borderColor: "grey", borderWidth: 1 }} value={this.state.text} onChangeText={(e) => this.setState({ text: e })} />
                        <Button
                            onPress={() => { this.sendMessage() }}
                            title="Send"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default Msg

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});