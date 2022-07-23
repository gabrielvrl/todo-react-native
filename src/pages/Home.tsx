import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundedTask = tasks.find(task => task.title === newTaskTitle)

    if(foundedTask){
      return(
        Alert.alert(
          "Você não pode cadastrar uma task com o mesmo nome",
          `Tarefa com nome de ${newTaskTitle} já foi cadastrada`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
      )
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(previousTasks => [...previousTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task => ({ ...task })));

    const foundedTask = updatedTasks.find(task => task.id === id);

    if(!foundedTask)
      return;

    
    foundedTask.done = !foundedTask.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      `Tem certeza que você deseja remover esse item?`,
      [
        {
          text: "NÃO",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "SIM", onPress: () => setTasks(previousTasks => previousTasks.filter(task => task.id !== id)) }
      ]
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const updatedTasks = tasks.map((task => ({ ...task })));

    const foundedTask = updatedTasks.find(task => task.id === taskId);

    if(!foundedTask)
      return;
    
    foundedTask.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})