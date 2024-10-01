import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Timestamp } from "firebase/firestore";

// interface TodoItemProps {
//   id: string;
//   title: string;
//   done: boolean;
//   createdAt: Timestamp;
// }
import { TodoRead } from "@/interface/todoInterface";

const TodoItem: React.FC<TodoRead> = ({ title, done, createdAt }) => {
  const formatDate = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.date}>Created: {formatDate(createdAt)}</Text> */}
      </View>
      <View
        style={[
          styles.statusContainer,
          done ? styles.statusDone : styles.statusNotDone,
        ]}
      >
        <Text style={styles.statusText}>{done ? "Done" : "Pending"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default TodoItem;
