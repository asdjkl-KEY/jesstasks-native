import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { saveTask, getTask, updateTask } from "../api";
import Layout from "../components/Layout";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);

  // if (route && route.params) {
  //   navigation.setOptions({ headerTitle: "Updating Task" });
  // }

  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Updating Task" });
      (async () => {
        const task = await getTask(route.params.id);
        setTask({ title: task.title, description: task.description });
      })();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveTask(task);
      } else {
        console.log(route.params.id, task)
        await updateTask(route.params.id, {...task});
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setTask({ ...task, [name]: value });
  return (
    <Layout>
      <Text style={styles.label}>
        Título de la Tarea:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Recoger patatas el miércoles en la tarde"
        placeholderTextColor="#576574"
        value={task.title}
        onChangeText={(text) => handleChange("title", text)}
      />

      <Text style={styles.label}>
        Nombre Corto de la tarea
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Recoger Patatas - Miércoles"
        placeholderTextColor="#576574"
        value={task.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      <Text style={styles.label}>
        Fecha final de la tarea
      </Text>
      <TextInput
      style={styles.input}
      placeholder="DD/MM/YYYY   Ej: 24/07/2022"
      placeholderTextColor="#576574"
      value={task.date}
      onChangeText={(text) => handleChange("date", text)}
      />

      {!editing ? (
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar Tarea</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Task</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 4,
    color: "#fff"
  },
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 40,
    color: "#ffffff",
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#e58e26",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TaskFormScreen;
