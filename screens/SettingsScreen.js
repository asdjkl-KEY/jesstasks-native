import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import Layout from '../components/Layout';

const SettingsScreen = ({navigation, route}) => {

    const navHome = () => {
        navigation.navigate("HomeScreen")
    }
    const navTaskForm = () => {
        navigation.navigate("TaskFormScreen")
    }

    return (
        <Layout>
            <TouchableOpacity
            style={styles.option}
            >
            <Text style={styles.buttonText }>Buscar Tarea</Text>
            <Image style={styles.icon} source={require('../assets/search.svg')} />
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.option}
            onPress={navHome}
            >
            <Text style={styles.buttonText }>Ver Tareas</Text>
            <Image style={styles.icon} source={require('../assets/search.svg')} />
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.option}
            onPress={navTaskForm}
            >
            <Text style={styles.buttonText }>Nueva Tarea </Text> 
            <Text style={{fontSize: 20, color: "#fff"}}></Text>
            <Image style={styles.icon} source={require('../assets/search.svg')} />
            </TouchableOpacity>
        </Layout>
    )
}


const styles = StyleSheet.create({
    option: {
        width: "80%",
        padding: 12,
        textAlign: "center",
        backgroundColor: "#100844",
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 8,
        position: "relative"
    },
    icon: {
        height: 20,
        width: 20,
        marginTop: -20
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    }
});

export default SettingsScreen;