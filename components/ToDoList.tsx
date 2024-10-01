import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TodoRead } from "@/interface/todoInterface";
import { Timestamp } from "firebase/firestore";

interface TodoListProps {
  todos: TodoRead[];
}

const formatDate = (timestamp: Timestamp) => {
  return timestamp.toDate().toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <View>
      {todos.map((todo) => (
        <View key={todo.id} style={styles.row_container}>
          <Text>{todo.title}</Text>
          <Text style={styles.date}>Created: {formatDate(todo.createdAt)}</Text>
          <View
            style={[
              styles.statusContainer,
              todo.done ? styles.statusDone : styles.statusNotDone,
            ]}
          >
            <Text style={styles.statusText}>
              {todo.done ? "Done" : "Pending"}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },

  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusDone: {
    backgroundColor: "#4CAF50",
  },
  statusNotDone: {
    backgroundColor: "#FFA000",
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TodoList;
