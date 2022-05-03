import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ task, handleDelete }) => {
  const navigation = useNavigation();

  let p = (task.description).split(' ');
  let simpleDescription = "";
  if(p.length >= 5) {
    simpleDescription = p[0] +" "+ p[1] +" "+ p[2] +" "+ p[3] +" "+ p[4] + "...";
  }
  return (
    <View style={styles.itemContainer}>
      {(task.state == 'noended') ? 
      <Image 
      style={styles.icon}
      source={require('../assets/error.svg')}
      />
      :
      ""
      }
      {(task.state == 'ended') ? 
      <Image 
      style={styles.icon}
      source={require('../assets/check.svg')}
      />
      :
      ""
      }
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskScreen", { task: task })}
      >
        <Image 
        source={require(`../assets/${task.category}.svg`)}
        style={{width: 50, height: 50, marginBottom: 12}}
        />
        <Text style={styles.itemTitle}>{task.title}</Text>
        <Text style={{ color: "#8395a7" }}>{simpleDescription}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#5352ee", padding: 7, borderRadius: 5 }}
        onPress={() => navigation.navigate("TaskScreen", {task: task})}
      >
        <Text style={{ color: "#fff" }}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#09001a",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    position: "relative"
  },
  itemTitle: {
    color: "#ffffff",
  },
  icon: {
    height: 20,
    width: 20,
    position: "absolute",
    right: 0,
    top: 0,
    margin: 12
  }
});
export default TaskItem;
