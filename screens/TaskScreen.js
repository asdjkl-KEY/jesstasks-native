import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { getTaskById, updateTask, deleteTask } from '../api';

import Layout from '../components/Layout';

const TaskScreen = ({ navigation, route}) => {
    let { task } = route.params
    let states = {
        unstart: "Tarea No Iniciada",
        current: "En curso",
        noended: "Tarea No Realizada",
        ended: "Tarea Completada"
    }
    let categories = {
        urgent: "Urgente",
        important: "Importante",
        special: "Especial",
        unique: "Tarea Única",
        escolar: "Tarea de escuela",
        normal: "Tarea Normal"
    }

    const handleDelete = async (id) => {
        await deleteTask(id).then(resp => {
            if(resp == error) {
                console.log(resp);
            }
        })
        navigation.navigate("HomeScreen")
    }
    const handleUpdate = async (id, data, value) => {
        await updateTask(id, data, value).then(newtask => {
            console.log(newtask)
            navigation.navigate("TaskScreen", {task: newtask})
        })
    }

    return (
        <Layout>
            {(task.state == 'noended') ? 
            <View style={styles.stateContent}>
                <Text style={styles.stateText}>
                    Tarea no realizada
                </Text>
                <Image
                style={styles.stateIcon}
                source={require('../assets/error.svg')}
                />
            </View>
            :
            "" 
            }
            {(task.state == 'ended') ? 
            <View style={styles.stateYesContent}>
                <Text style={styles.stateYesText}>
                    Tarea Completada!
                </Text>
                <Image
                style={styles.stateYesIcon}
                source={require('../assets/check.svg')}
                />
            </View>
            :
            "" 
            }
            <View>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.paragraph}>
                    {task.description}
                </Text>
                <Text style={styles.label}>Objetivos: </Text>
                
            </View>
            <View style={{marginBottom: 120}}>
                {
                    (task.objectives).map(element => {
                        return (<Text style={styles.objective}>* {element} </Text>)
                    })
                }
            </View>
            <View style={styles.timestamp}>
                <Text style={styles.timestampItem}>Finaliza en: "{task.endAt}"</Text>
                <Text style={styles.timestampItem}>Estado: "{states[task.state]}"</Text>
                <Text style={styles.timestampItem}>Categoría: "{categories[task.category]}"</Text>
            </View>
            {
            (task.state == "unstart") ? 
            <TouchableOpacity style={styles.startTask} onPress={() => handleUpdate(task.id, "state", "current")}>
                <Text style={styles.startTaskText}>
                    Iniciar Tarea
                </Text>
            </TouchableOpacity> : 
            <TouchableOpacity style={styles.deleteTask} onPress={() => handleDelete(task.id)}>
                <Text style={styles.deleteTaskText}>
                Eliminar Tarea
                </Text>
            </TouchableOpacity>
            }
        </Layout>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        textAlign: "center",
        width: "100%",
        color: "#fff",
        marginTop: 12,
        marginBottom: 8
    },
    paragraph: {
        fontSize: 16,
        textAlign: "left",
        padding: 24,
        marginTop: 8,
        color: "#fff",
        borderWidth: 1,
        borderColor: "#cdcdcd",
        width: "80%",
        marginLeft: "10%",
        borderRadius: 8
    },
    label: {
        fontSize: 22,
        color: "#fff",
        padding: 8,
        width: "80%",
        marginLeft: "10%",
        marginTop: 12,
        marginBottom: 4,
        textAlign: "center"
    },
    objective: {
        fontSize: 14,
        margin: 8,
        color: "#fff"
    },
    timestamp: {
        color: "#fff",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 24,
        display: "flex",
        flexDirection: "column"
    },
    timestampItem: {
        color: "#fff",
        fontSize: 12,
        display: "block",
        marginTop: 12
    },
    startTask: {
        color: "#fff",
        borderRadius: 12,
        backgroundColor: "#100888",
        textAlign: "center",
        padding: 12,
        position: "absolute",
        left: 0,
        bottom: 0,
        margin: 24,
        width: 120
    },
    startTaskText: {
        color: "#fff"
    },
    stateYesContent: {
        borderWidth: 1,
        borderColor: "#24fc24",
        backgroundColor: "#28ab2890",
        height: 72,
        width: "70%",
        position: "relative",
        marginTop: 24,
        borderRadius: 8
    },
    stateYesText: {
        color: "#80fc80",
        textAlign: "center",
        position: "absolute",
        left: 0,
        top: 0,
        margin: 24
    },
    stateYesIcon: {
        height: 24,
        width: 24,
        position: "absolute",
        right: 0,
        top: 0,
        margin: 24
    },
    stateContent: {
        borderWidth: 1,
        borderColor: "#fc2424",
        backgroundColor: "#ab282890",
        height: 72,
        width: "70%",
        position: "relative",
        marginTop: 24,
        borderRadius: 8
    },
    stateText: {
        color: "#fc8080",
        textAlign: "center",
        position: "absolute",
        left: 0,
        top: 0,
        margin: 24
    },
    stateIcon: {
        height: 24,
        width: 24,
        position: "absolute",
        right: 0,
        top: 0,
        margin: 24
    },
    deleteTask: {
        padding: 12,
        textAlign: "center",
        borderRadius: 12,
        backgroundColor: "#ab2020",
        width: 120,
        position: "absolute",
        left: 0,
        bottom: 0,
        margin: 24
    },
    deleteTaskText: {
        color: "#fcabab"
    }
})

export default TaskScreen;