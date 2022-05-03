
// const API = "http://localhost:4040";

// export const deleteTask = async (id) => {
//   const res = await fetch(`${API}/${id}`, {
//     method: "DELETE",
//   });
//   return await res.json();
// };

// //obtener todas las tareas
// export const getTasks = async () => {
//   const res = await fetch(API, {
//     method: "GET",
//   });
//   return await res.json();
// };

// export const saveTask = async (newTask) => {
//   const res = await fetch(`${API}/newtask`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newTask),
//   });
//   return await res.json();
// };

// export const getTaskById = async (id) => {
//   const res = await fetch(`${API}/id/${id}`, {
//     method: "GET"
//   });
//   return await res.json();
// }
// export const getTasksByCategoryAndState = async (category, state) => {
//   const res = await fetch(`${API}/tasks/category-state/${category}-${state}`, {
//     method: "GET"
//   });
//   return await res.json();
// }
// export const getTasksByCategory = async (category) => {
//   const res = await fetch(`${API}/tasks/category/${category}`, {
//     method: "GET"
//   });
//   return await res.json();
// }
// export const getTasksByState = async (state) => {
//     const res = await fetch(`${API}/tasks/state/${state}`, {
//       method: "GET"
//     });
//     return await res.json();
// }

// export const updateTask = async (id, data, value) => {
//   const res = await fetch(`${API}/${id}/${data}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: {
//       value: value
//     },
//   });
//   return await res.json();
// };

import database from './database.json';

let alltasks = database.root;

export const saveTask = async (newTask) => {
  newTask.state = 'unstart',
  newTask.numberId = allTasks.length + 1;
  (database.root).push(newTask);
  return database.root;
}
export const deleteTask =  async (id) => {
  for (let i in database.root) {
    if(((database.root)[i]).id == id){
      (database.root).splice(i, 1);
    }
  }
  return await database.root;
}

export const updateTask = async (id, data, value) => {}

export const getTasks = async () => {
  return await alltasks;
}

export const getTaskById = async (id) => {
  for (let task of allTasks) {
    if(task.numberId == id) {
      return await task;
    }
  }
}

export const getTasksByCategoryAndState = async (category, state) => {
  let newAllTasks = [];
  for (let task of allTasks) {
    if(task.category == category && task.state == state) {
      newAllTasks.push(task);
    }
  }
  return await newAllTasks;
}

export const getTasksByCategory = async (category) => {
  let newAllTasks = [];
  for (let task of allTasks) {
    if(task.category == category) {
      newAllTasks.push(task);
    }
  }
  return await newAllTasks;
}

export const getTasksByState = async (state) => {
  let newAllTasks = [];
  for(let task of allTasks) {
    if(task.state == state) {
      newAllTasks.push(task);
    }
  }
  return await newAllTasks;
}

