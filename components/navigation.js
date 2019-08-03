import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, Header } from "react-navigation"
import * as Routes from "./index"

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Routes.Front
    },
    Requests: {
        screen: Routes.Requests
    }
})

const switchNavigator = createSwitchNavigator({
    Login: {
        screen: Routes.Login
    },
    Register: {
        screen: Routes.Register
    }
})

const MainNavigator = createStackNavigator({
    Login: {
        screen: switchNavigator
    },
    Tab: {
        screen: TabNavigator,
        navigationOptions: {
            headerTitleStyle: {
                color: "white",
                paddingBottom: 23,
            },
            headerStyle: {
                backgroundColor: "#0084FF",
                height: 30,
                marginTop: 25
            },
            title: "Messanger",

        },
    },
    Msg: {
        screen: Routes.Msg,
        navigationOptions: {
            headerStyle: {

            }
        },
    },
})

export default createAppContainer(MainNavigator);