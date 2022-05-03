import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { saveTask, getTaskById, updateTask } from "../api";
import Layout from "../components/Layout";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    shortName: "",
    category: "", 
    endAt: "",
    objectives: []
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
        const task = await getTaskById(route.params.id);
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
        value={task.shortName}
        onChangeText={(text) => handleChange("shortName", text)}
      />

      <Text style={styles.label}>
        Fecha final de la tarea
      </Text>
      <TextInput
      style={styles.input}
      placeholder="DD/MM/YYYY   Ej: 24/07/2022"
      placeholderTextColor="#576574"
      value={task.endAt}
      onChangeText={(text) => handleChange("endAt", text)}
      />

      <Text style={styles.label}>
        Categoría
      </Text>
      <TextInput
      style={styles.input}
      placeholder="Solo una. Ej: urgent, important, special, unique, escolar, normal"
      placeholderTextColor="#576574"
      value={task.category}
      onChangeText={(text) => handleChange("category", text)}
      />

      <Text style={styles.label}>
        Objetivos
      </Text>
      <TextInput
      style={styles.input}
      placeholder="Separados por '-' Ej: Cargar peso - Buscar tierra - atraer"
      placeholderTextColor="#576574"
      value={task.objectives}
      onChangeText={(text) => {
        let objectives = text.split("-");
        handleChange("objectives", objectives)
      }}
      />

      <Text style={styles.label}>
        Descripción de la tarea
      </Text>
      <TextInput 
      style={styles.textarea}
      placeholder="Ej: debes recoger patatas mañana y no te olvides de sacarlas con una pala de madera para que ninguna salga estropeada."
      placeholderTextColor="#576574"
      value={task.description}
      multiline={true}
      onChangeText={(text) => handleChange("description", text)}
      />

      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Tarea</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 4,
    color: "#fff",
  },
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 40,
    color: "#ffffff",
    textAlign: "left",
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 5,
  },
  textarea: {
    height: 250,
    width: "90%",
    marginBottom: 16,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    color: "#fff",
    textAlign: "left",
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 24,
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
