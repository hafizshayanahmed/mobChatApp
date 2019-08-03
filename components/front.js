import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { getAllUsers, createRoom } from "../config/firebase";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            arr: [{ key: 'Shayan' }, { key: 'Ahmed' }, { key: 'Shah' }, { key: 'Zeeshan' }],
            con: false
        }
    }

    componentDidMount() {
        this.getusers()
    }

    async getusers() {
        const users = await getAllUsers()
        this.setState({
            users,
            con: true
        })
    }

    async startChat(e) {
        try {
            let chatRoom = await createRoom(e)
            console.log(chatRoom._id)
            this.props.navigation.navigate("Msg", chatRoom._id)
        } catch (e) {
            alert(e)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 5, padding: 5 }}>
                <ScrollView>
                    <Text style={{ fontWeight: "bold" }}>
                        Stories
        </Text>
                    <View style={styles.container}>
                        {this.state.arr.map((e) => {
                            return <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ width: 55, height: 55 }}>
                                    <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={require('../dummy.jpg')} />
                                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                        {e.key}
                                    </Text>
                                </View>
                            </View>
                        })}
                    </View>
                    <Text style={{ fontWeight: "bold" }}>
                        Birthdays
        </Text>
                    <View style={styles.container1}>
                        <FlatList
                            data={[{ key: 'Shayan' }, { key: 'Ahmed' }, { key: 'Shah' }, { key: 'Zeeshan' }]}
                            renderItem={({ item }) =>
                                <View style={{ flex: 1, flexDirection: 'row', width: "100%", height: 60 }}>
                                    <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={require('../dummy.jpg')} />
                                    <Text style={{ textAlignVertical: "center", marginLeft: 10, fontWeight: "bold" }}>{item.key}</Text>
                                </View>
                            }
                        />
                    </View>
                    <Text style={{ fontWeight: "bold" }}>
                        Active
        </Text>
                    <View style={styles.container2}>
                        {this.state.con && this.state.users.map((e) => {
                            return <TouchableOpacity onPress={() => this.startChat(e._id)}>
                                <View style={{ flex: 1, flexDirection: 'row', width: "100%", height: 60 }}>
                                    <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={require('../dummy.jpg')} />
                                    <Text style={{ textAlignVertical: "center", marginLeft: 10, fontWeight: "bold" }}>{e.data.username}</Text>
                                </View>
                            </TouchableOpacity>
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default App

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "lightgrey",
        borderBottomColor: "lightgrey",
        paddingBottom: 25,
        marginBottom: 22
    },
    container1: {
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "lightgrey",
        borderBottomColor: "lightgrey",
        marginBottom: 22
    },
    container2: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "lightgrey",
    }
});


        //key store is the secret key 
        // production apk banne ko bolte hen. sign and unsign
// key store ko use krte hue jo banaoge use signed apk kete hen