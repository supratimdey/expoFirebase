import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TodoRead } from "@/interface/todoInterface";
import { db } from "@/FirebaseConfig";

import {
  Firestore,
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import TodoItem from "./ToDoItems";

const FullTodoList = () => {
  const [todos, setTodos] = useState<TodoRead[]>([]);

  useEffect(() => {
    const todoRef = collection(db, "todos");

    const unsubscribe = onSnapshot(todoRef, {
      next: (snapshot: QuerySnapshot<DocumentData>) => {
        console.log(
          "🚀 ~ File: [ TodoList.tsx ] ~ snapshotSubscribe ~ getting data:"
        );
        const fetchedTodos: TodoRead[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as TodoRead)
        );

        setTodos(fetchedTodos);

        console.log("Fetched todos:");
        fetchedTodos.forEach((todo) => {
          console.log(todo);
        });
      },
      error: (error) => {
        console.error("Error fetching todos:", error);
      },
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, []); // Only re-run if db changes

  const formatDate = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const renderItem = ({ item }: { item: TodoRead }) => {
    console.log("ri -" + item.title);
    return <TodoItem {...item} />;
  };

  return (
    <View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* {todos.map((todo) => (
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
      ))} */}
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

export default FullTodoList;
