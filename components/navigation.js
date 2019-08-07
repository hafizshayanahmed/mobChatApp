import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, Header } from "react-navigation"
import * as Routes from "./index"

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Routes.Front
    },
    Requests: {
        screen: Routes.Requests
    }
},
    {
        tabBarOptions: {
            style: {
                paddingBottom: 8,
            },
            labelStyle: {
                fontSize: 20,
              },
        },
    }
)

const switchNavigator = createSwitchNavigator({
    Login: {
        screen: Routes.Login
    },
    Register: {
        screen: Routes.Register
    },
    Status: {
        screen: Routes.Status
    }
})

const MainNavigator = createStackNavigator({
    Login: {
        screen: switchNavigator,
        navigationOptions: {
            header: null,
        },
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
            headerLeft: null
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