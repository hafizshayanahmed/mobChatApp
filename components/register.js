import React from "react"
import { register } from "../config/firebase"
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native"

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
            <View>
                <Text>Email:</Text><TextInput onChangeText={text => this.setState({ email: text })} />
                <Text>Username:</Text><TextInput onChangeText={(e) => this.setState({ username: e })} />
                <Text>Password:</Text><TextInput onChangeText={(e) => this.setState({ password: e })} />
                <Button title="Register" onPress={() => this.register()} />
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("Login")
                }}><Text>Already have an account? click here to login</Text></TouchableOpacity>
            </View>
        )
    }
}

export default Login