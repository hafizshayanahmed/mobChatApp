import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { getMyUid, deleteStoryFromDatabase } from "../config/firebase";

class Status extends React.Component {
    constructor() {
        super();
        this.state = {
            con: true,
            count: 5
        }
    }

    componentDidMount() {
        this.timer();
        this.getUid();
    }

    async getUid() {
        const uid = await getMyUid()
        this.setState({
            uid: uid.uid,
            name: uid.username
        })
    }

    async deleteStory() {
        try {
            let resp = await deleteStoryFromDatabase()
            alert(resp.message)
            this.props.navigation.navigate("Home")
        } catch (e) {
            alert(e)
        }
    }

    timer() {
        var interval;
        var intervalCallback = () => {
            if (this.state.count === 1) {
                clearInterval(interval)
                this.props.navigation.navigate("Tab")
            }
            else {
                this.setState({
                    count: this.state.count - 1
                })
            }
        }
        interval = setInterval(intervalCallback, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height: "95%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{ color: "black", fontSize: 32, paddingBottom: 30 }}>{this.state.count}</Text>
                    <Image style={{ width: "100%", height: 400, borderWidth: 1, borderColor: "black", borderRadius: 5 }} source={{ uri: this.props.navigation.state.params.story }} />
                </View>
                <View style={{height: "5%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                    {this.state.uid === this.props.navigation.state.params.uid &&
                        <TouchableOpacity onPress={() => this.deleteStory()}>
                            <Image style={{ width: 20, height: 20 }} source={require('../bin.png')} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
}

export default Status

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%"
    }
});