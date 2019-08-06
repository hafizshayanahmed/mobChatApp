import React from "react"
import { register } from "../config/firebase"
import { View, TextInput, Button, Text, TouchableOpacity, Image } from "react-native"

class Login extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    async register() {
        const { email, password, username } = this.state;
        console.log(email, password, username)
        try {
            const reg = await register(email, password, username)
            console.log(reg)
            this.props.navigation.navigate("Login");
        }
        catch (e) {
            alert(e.message)
        }
    }

    render() {
        return (
            <View style={{ display: "flex", flex: 1 }}>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 50, marginBottom: 25 }}>
                    <Image style={{ width: 150, height: 150 }} source={require('../download.jpg')} />
                </View>
                
                <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 5 }}>Email:</Text>
                <TextInput style={{ borderWidth: 1, borderColor: "lightgrey", height: 40, borderRadius: 5, paddingLeft: 10 }} onChangeText={(e) => this.setState({ email: e })} />
                <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 5 }}>Username:</Text>
                <TextInput style={{ borderWidth: 1, borderColor: "lightgrey", height: 40, borderRadius: 5, paddingLeft: 10 }} onChangeText={(e) => this.setState({ username: e })} />
                <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 5 }}>Password:</Text>
                <TextInput secureTextEntry={true} style={{ borderWidth: 1, borderColor: "lightgrey", height: 40, marginBottom: 10, borderRadius: 5, paddingLeft: 10 }} onChangeText={(e) => this.setState({ password: e })} />
                <View style={{ width: "100%", alignItems: "center" }}>                
                <TouchableOpacity style={{
                        width: "75%",
                        height: 40,
                        alignItems: "center",
                        backgroundColor: "#0084FF",
                        justifyContent: "center",
                        marginTop: 10,
                        borderRadius: 5,
                    }}
                        onPress={() => this.register()}><Text style={{ color: "white" }}>Register</Text></TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                    this.props.navigation.navigate("Login")
                }}><Text>Already have an account? click here to login</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Login