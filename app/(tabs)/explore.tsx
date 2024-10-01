import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Firebase imports
import { auth } from "@/FirebaseConfig";
import { getAuth } from "firebase/auth";
import { db } from "@/FirebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  query,
  where,
  QuerySnapshot,
  Timestamp,
} from "firebase/firestore";

import { router } from "expo-router";

import { TodoRead } from "@/interface/todoInterface";
import TodoItem from "@/components/ToDoItems";
import TodoList from "@/components/ToDoList";
import getTodos from "@/services/getTodos";
import { SafeAreaView } from "react-native-safe-area-context";
import FullTodoList from "@/components/FullToDoList";

export default function TabTwoScreen() {
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  // const [todos, setTodos] = useState<TodoRead[]>([]);

  useEffect(() => {
    getUserDetails();

    // getTodosLocal();
    // getTodoasync(id);

    // const { fetchTodos, unsubscribe } = getTodos(db, id);

    // fetchTodos().then(setTodos).catch(console.error);

    // // Cleanup function to unsubscribe when component unmounts
    // return () => {
    //   unsubscribe();
    // };

    console.log("here...");
    // const todoRef = collection(db, "todos");

    // const subscriber = onSnapshot(todoRef, {
    //   next: (snapshot) => {
    //     console.log(
    //       "🚀 ~ File: [ explore.tsx ] ~ snapshotSubscripbe ~ getting  data:"
    //     );
    //     const todos: TodoRead[] = [];
    //     snapshot.docs.forEach((doc) => {
    //       todos.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       } as TodoRead);
    //     });
    //     setTodos(todos);
    //   },
    // });

    // // Create a query with a where clause
    // //const q = query(todoRef, where("userId", "==", id));
    // console.log("after subscribting");
    // todos.map((todo) => {
    //   console.log(todo.createdAt);
    //});

    // // const subscriber = onSnapshot(q, {
    // //   next: (snapshot: QuerySnapshot<DocumentData>) => {
    // //     console.log(
    // //       "🚀 ~ File: [ explore.tsx ] ~ snapshotSubscribe ~ getting data:"
    // //     );
    // //     const todos: TodoRead[] = snapshot.docs.map(
    // //       (doc) =>
    // //         ({
    // //           id: doc.id,
    // //           ...doc.data(),
    // //         } as TodoRead)
    // //     );
    // //     setTodos(todos);
    // //   },
    // //   error: (error) => {
    // //     console.error("Error fetching todos:", error);
    // //   },
    // // });

    // return subscriber();
  }, []);

  // async function getTodoasync(userId: string) {
  //   try {
  //     const todos = await getTodos(db, userId);
  //     setTodos(todos); // Assuming you still want to set state somewhere
  //   } catch (error) {
  //     console.error("Failed to get todos:", error);
  //   }
  // }

  const formatDate = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace("/");
  });

  const addToDo = async () => {
    // Creating a new todo
    const newTodo = {
      title: "Test Todo 12",
      done: true,
      userId: id,
      createdAt: serverTimestamp(), // Returns a FieldValue
      modifiedAt: serverTimestamp(), // Returns a FieldValue
    };

    const docRef = await addDoc(collection(db, "todos"), newTodo);

    await logDataToDoAppend(docRef);
  };

  function getTodosLocal() {
    const todoRef = collection(db, "todos");

    // Create a query with a where clause
    const q = query(todoRef, where("userId", "==", id));

    // const subscriber = onSnapshot(q, {
    //   next: (snapshot) => {
    //     console.log(
    //       "🚀 ~ File: [ explore.tsx ] ~ snapshotSubscripbe ~ getting  data:"
    //     );
    //     const todos: any[] = [];
    //     snapshot.docs.forEach((doc) => {
    //       todos.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       });
    //     });
    //     setTodos(todos);
    //   },
    // });

    const subscriber = onSnapshot(q, {
      next: (snapshot: QuerySnapshot<DocumentData>) => {
        console.log(
          "🚀 ~ File: [ explore.tsx ] ~ snapshotSubscribe ~ getting data:"
        );
        const todos: TodoRead[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as TodoRead)
        );
        //setTodos(todos);
      },
      error: (error) => {
        console.error("Error fetching todos:", error);
      },
    });

    return subscriber();
  }

  return (
    <SafeAreaView>
      {/* <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Ionicons size={310} name="code-slash" style={styles.headerImage} />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Explore</ThemedText>
        </ThemedView> 
        */}

      <ThemedText>
        {user} - {id} You are authenticated.
      </ThemedText>
      <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
        <Text style={styles.buttonText}> Sign Out</Text>
      </TouchableOpacity>
      <View style={[styles.button]}>
        <Button title="Add a ToDo Item" color="#DDD5DEFF" onPress={addToDo} />
      </View>

      <FullTodoList />
      {/* <TodoList todos={todos} /> */}

      {/* <View>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.row_container}>
            <Text>{todo.title}</Text>
            <Text style={styles.date}>
              Created: {formatDate(todo.createdAt)}
            </Text>
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
      </View> */}
      {/* </ParallaxScrollView> */}
      {/* <View style={styles.container}> */}

      {/* <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
      {/* </View> */}
    </SafeAreaView>
  );

  //  log the added data
  async function logDataToDoAppend(
    docRef: DocumentReference<unknown, DocumentData>
  ) {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data() as TodoRead;

      console.log("🚀 ~ File: [ explore.tsx ] ~ addToDo ~ Document data:", {
        ...docData,
        createdAt: docData.createdAt?.toDate().toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        }),
        modifiedAt: docData.modifiedAt?.toDate().toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        }),
      });
    } else {
      console.log("No such document!");
    }
  }

  // locatl fucntion to check for valid user id and email
  function getUserDetails() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (
      user !== null &&
      user.email !== null &&
      user.email !== undefined &&
      typeof user.email === "string"
    ) {
      setUser(user.email);
      setId(user?.uid);
    } else {
      console.log("User email is not a valid string");
      // Handle the error case
    }
  }
}

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
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    backgroundColor: "#6A1ADAFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
