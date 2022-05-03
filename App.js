import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, View, Image } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import TaskFormScreen from "./screens/TaskFormScreen";
import SettingsScreen from './screens/SettingsScreen';
import TaskScreen from "./screens/TaskScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Jesse's Tasks",
            headerStyle: {
              backgroundColor: "#09002b",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#e9e9e9",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("SettingsScreen")}
              >
                <Text style={{ color: "#e9e9e9", marginRight: 20, fontSize: 40, marginTop: 0 }}>
                  <Image style={{width: 30, height: 30}} source={require('./assets/options.svg')} />
                </Text>
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={({navigation}) =>({
            title: 'Opciones',
            headerStyle: {
              backgroundColor: "#09002b",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
              textAlign: "right",
              marginRight: 24
            }
          })}
        />
        <Stack.Screen
          name="TaskFormScreen"
          component={TaskFormScreen}
          options={({navigation}) => ({
            title: 'Nueva tarea',
            headerStyle: {
              backgroundColor: "#09002b",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
              textAlign: "right",
              marginRight: 24
            }
          })}
        />
        <Stack.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{
          title: 'Tarea Actual',
            headerStyle: {
              backgroundColor: "#09002b",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
              textAlign: "center"
            }
        }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
