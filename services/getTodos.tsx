import {
  collection,
  query,
  where,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  Firestore,
} from "firebase/firestore";

import { TodoRead } from "@/interface/todoInterface";

export function getTodos(db: Firestore, id: string) {
  let unsubscribe: (() => void) | undefined;

  const fetchTodos = (): Promise<TodoRead[]> => {
    return new Promise((resolve, reject) => {
      if (unsubscribe) {
        unsubscribe();
      }

      const todoRef = collection(db, "todos");
      const q = query(todoRef, where("userId", "==", id));

      unsubscribe = onSnapshot(q, {
        next: (snapshot: QuerySnapshot) => {
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

          console.log("Fetched todos:");
          todos.forEach((todo) => {
            console.log(todo.createdAt);
          });

          resolve(todos);
        },
        error: (error) => {
          console.error("Error fetching todos:", error);
          reject(error);
        },
      });
    });
  };

  return {
    fetchTodos,
    unsubscribe: () => {
      if (unsubscribe) {
        unsubscribe();
      }
    },
  };
}

export default getTodos;
