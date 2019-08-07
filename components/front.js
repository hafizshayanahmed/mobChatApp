import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { getAllUsers, createRoom, getStory, addStory, getMyUid } from "../config/firebase";
import * as ImagePicker from 'expo-image-picker';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            arr: [{ key: 'Shayan' }, { key: 'Ahmed' }, { key: 'Shah' }, { key: 'Zeeshan' }],
            storyArr: [],
            con: false,
            storyCon: false,
            flag: 0,
        }
    }

    componentDidMount() {
        this.getusers()
        this.getAllStory()
        this.getUid()

    }

    async getUid() {
        const uid = await getMyUid()
        this.setState({
            uid: uid.uid,
            name: uid.username
        })
    }

    async getAllStory() {
        const allStr = await getStory()
        this.setState({
            storyArr: allStr,
            storyCon: true
        })
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
            this.props.navigation.navigate("Msg", chatRoom._id)
        } catch (e) {
            alert(e)
        }
    }

    async addMyStory() {
        try {
            await this.pickImage()
        } catch (e) {
            alert(e)
        }
    }

    async pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
            try {
                let resp = await addStory(result.uri, this.state.name)
                alert(resp.message)
                this.getAllStory()
            } catch (e) {
                alert(e.message)
            }
        }
    };

    changeFlag() {
        this.setState({ flag: this.state.flag + 1 });
    }

    showStatus(e){
        this.props.navigation.navigate("Status", e)
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 5, padding: 5 }}>
                <ScrollView>
                    <Text style={{ fontWeight: "bold" }}>
                        Stories
        </Text>
                    <View style={styles.container}>
                        {this.state.storyArr.length === 0 &&
                            <View style={{ flexDirection: 'row', width: 60, alignItems: "center" }}>
                                <TouchableOpacity onPress={() => this.addMyStory()}>
                                    <View style={{ width: 55, height: 55 }}>
                                        <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={require('../dummy.jpg')} />
                                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                            Add story
                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        {this.state.storyArr.map((e) => {
                            if (e.uid === this.state.uid && this.state.flag === 0) {
                                this.changeFlag()
                            }
                            if (e.uid.indexOf(this.state.uid) !== -1) {
                                return <View style={{ flexDirection: 'row', width: 60, alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => this.showStatus(e)}>
                                        <View style={{ width: 55, height: 55 }}>
                                            <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={{ uri: e.story }} />
                                            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                                {e.username}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                this.state.flag > 0 && <View style={{ flexDirection: 'row', width: 60, alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => this.addMyStory()}>
                                        <View style={{ width: 55, height: 55 }}>
                                            <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={require('../dummy.jpg')} />
                                            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                                Add story
                                    </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        })}
                        {this.state.storyArr && this.state.storyArr.map((e) => {
                            if (e.uid !== this.state.uid) {
                                return <View style={{ flexDirection: 'row', width: 60, alignItems: "center" }}>
                                    <TouchableOpacity onPress={()=> this.showStatus(e)}>
                                        <View style={{ width: 55, height: 55 }}>
                                            <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={{ uri: e.story }} />
                                            <Text style={{ textAlign: "center" }}>
                                                {e.username}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
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
                                    {e.data.photo
                                        ?
                                        <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={{ uri: e.data.photo }} />
                                        :
                                        <Image style={{ width: 56, height: 56, borderWidth: 2, borderColor: "#0084FF", borderRadius: 28 }} source={require('../dummy.jpg')} />
                                    }
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
        paddingBottom: 46,
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