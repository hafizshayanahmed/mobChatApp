import React from "react"
import { login, logIn } from "../config/firebase"
import { View, TextInput, Button, Text, TouchableOpacity, Image } from "react-native"

class Login extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    async login() {
        const { email, password } = this.state;
        try {
            await login(email, password)
            this.props.navigation.navigate("Home");
        } catch (e) {
            alert(e)
        }
    }

    async loginfb() {
        try {
            await logIn()
            this.props.navigation.navigate("Home");
        } catch (e) {
            alert(e)
        }
    }

    render() {
        return (
            <View style={{ display: "flex", flex: 1 }}>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 50, marginBottom: 25 }}>
                    <Image style={{ width: 150, height: 150 }} source={require('../download.jpg')} />
                </View>
                <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 10 }}>Email:</Text>
                <TextInput style={{ borderWidth: 1, borderColor: "lightgrey", height: 40, borderRadius: 5, paddingLeft: 10 }} onChangeText={(e) => this.setState({ email: e })} />
                <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 10 }}>Password:</Text>
                <TextInput secureTextEntry={true} style={{ borderWidth: 1, borderColor: "lightgrey", height: 40, marginBottom: 10, borderRadius: 5, paddingLeft: 10 }} onChangeText={(e) => this.setState({ password: e })} />
                <View style={{ width: "100%", alignItems: "center" }}>
                    <TouchableOpacity style={{
                        width: "75%",
                        height: 40,
                        alignItems: "center",
                        backgroundColor: "#0084FF",
                        justifyContent: "center",
                        borderRadius: 5,
                    }}
                        onPress={() => this.login()}><Text style={{ color: "white" }}>Login</Text></TouchableOpacity>
                    <TouchableOpacity style={{
                        width: "75%",
                        height: 40,
                        alignItems: "center",
                        backgroundColor: "#0084FF",
                        justifyContent: "center",
                        marginTop: 10,
                        borderRadius: 5,
                    }}
                        onPress={() => this.loginfb()}><Text style={{ color: "white" }}>Login with facebook</Text></TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                        this.props.navigation.navigate("Register")
                    }}><Text>Dont have an account? click here to register</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Login