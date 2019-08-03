import React from "react"
import { login, logIn } from "../config/firebase"
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native"

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
            <View>
                <Text>Email:</Text><TextInput type="email" onChangeText={(e) => this.setState({ email: e })} />
                <Text>Password:</Text><TextInput type="password" onChangeText={(e) => this.setState({ password: e })} />
                <Button title="Login" onPress={() => this.login()} />
                <Button title="Login with fb" onPress={() => this.loginfb()} />
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("Register")
                }}><Text>Dont have an account? click here to register</Text></TouchableOpacity>
            </View>
        )
    }
}

export default Login