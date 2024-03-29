import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { sendMessageToDb, getMyUid } from "../config/firebase"
import { firebase } from "../config/firebase"
import "firebase/firestore"
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { Audio } from 'expo-av';

const db = firebase.firestore();

class Msg extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "",
            con: false,
            image: null,
            emojiCon: false,
            bar: true
        }
    }

    componentDidMount() {
        this.getMessages()
        this.getUid()
    }

    async getUid() {
        const uid = await getMyUid()
        this.setState({
            uid: uid.uid
        })
    }

    async sendMessage() {
        await sendMessageToDb(this.state.text, this.props.navigation.state.params)
        this.setState({ text: "" })
    }

    async sendEmoji() {
        await sendMessageToDb(this.state.emoji, this.props.navigation.state.params)
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

    async pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    async recording() {
        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            // You are now recording!
        } catch (error) {
            // An error occurred!
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        {this.state.con && this.state.msg.map((e) => {
                            return <View style={e.data.userId === this.state.uid
                                ?
                                { display: "flex", flexDirection: "column", alignItems: "flex-end" }
                                :
                                { display: "flex", flexDirection: "column", alignItems: "flex-start" }
                            }>
                                <View style={e.data.userId === this.state.uid ? { borderRadius: 20, textAlign: "right", backgroundColor: "#0084FF" } : { borderRadius: 20, textAlign: "left", backgroundColor: "lightgrey" }}>
                                    <Text style={e.data.userId === this.state.uid ? { padding: 10, color: "white", fontSize: 16 } : { padding: 8, fontSize: 16 }}>{e.data.message}</Text>
                                </View>
                                <Text>
                                    {moment(e.data.timestamp).fromNow()}
                                </Text>
                            </View>
                        })}
                    </View>
                </ScrollView>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={93}
                    behavior="padding" >
                    {this.state.image &&
                        <Image source={{ uri: this.state.image }} style={{width: "100%", height: 200, alignSelf: "center", alignItems: "center" }} />}
                    {this.state.bar &&
                        <View style={{ flexDirection: "row", marginBottom: 5 }}>
                            <TouchableOpacity
                                onPress={() => { this.pickImage(), this.setState({ emojiCon: false }) }}
                                style={{
                                    width: "20%",
                                    height: 30,
                                    backgroundColor: "#841584",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: "white" }}>Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ emojiCon: true, bar: false })}
                                style={{
                                    width: "20%",
                                    height: 30,
                                    backgroundColor: "#841584",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: "white" }}>Emoji</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.recording()}
                                style={{
                                    width: "20%",
                                    height: 30,
                                    backgroundColor: "#841584",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: "white" }}>Audio</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ width: "100%" }}>
                        {this.state.emojiCon && <EmojiSelector
                            style={{ width: "100%", height: "93.6%", paddingBottom: 10, paddingTop: 10 }}
                            onEmojiSelected={emoji => this.setState({
                                emoji: emoji,
                                emojiCon: false,
                                bar: true
                            }, () => {
                                this.sendEmoji()
                            })}
                        />
                        }
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput onFocus={() => this.setState({ emojiCon: false, bar: true })} style={{ height: 35, borderColor: "lightgrey", borderWidth: 1, borderRadius: 5, width: "80%" }} value={this.state.text} onChangeText={(e) => this.setState({ text: e })} />
                        <TouchableOpacity
                            onPress={() => this.sendMessage()}
                            accessibilityLabel="Learn more about this purple button"
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#841584",
                                width: "20%",
                                height: 35,
                                borderRadius: 5,
                            }}
                        >
                            <Text style={{ color: "white" }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View >
        );
    }
}

export default Msg

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});