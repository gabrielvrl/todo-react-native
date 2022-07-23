import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
  done: boolean;
  id: number;
  index: any;
  title: string;
}

export function TaskItem({ toggleTaskDone, removeTask, editTask, done, id, index, title }: TaskItemProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing(){
    setIsBeingEdited(true);
  }

  function handleCancelEditing(){
    setEditedTitle(title)
    setIsBeingEdited(false);
  }

  function handleSubmitEditing(){
    editTask(id, editedTitle);
    setIsBeingEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdited])
  
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(id)}
        >
          <View 
            testID={`marker-${index}`}
            style={ done ? styles.taskMarkerDone : styles.taskMarker }
          >
            { done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            style={ done ? styles.taskTextDone : styles.taskText }
            value={editedTitle}
            onChangeText={setEditedTitle}
            editable={isBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        testID={`trash-${index}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => removeTask(id)}
      >
        <View style={ styles.iconsContainer } >
          { isBeingEdited ? (
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          ) }

          <View 
            style={ styles.iconsDivider }
          />

          <TouchableOpacity
            disabled={isBeingEdited}
            onPress={() => removeTask(id)}
          >
            <Image source={trashIcon} style={{ opacity: isBeingEdited ? 0.2 : 1 }} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row'
  },
  iconsDivider: {
    height: 24,
    width: 10,
    left: 319,
    top: 12,
    borderRadius: 0,
    backgroundColor: 'red',
    opacity: 1,
    marginLeft: 12,
    marginRight: 12,
  }
})