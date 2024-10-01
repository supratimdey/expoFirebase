import { FieldValue, Timestamp } from "firebase/firestore";

export interface Todo {
  title: string;
  done: boolean;
  userId: string;
  createdAt: FieldValue;
  modifiedAt: FieldValue;
}

export interface TodoRead {
  id: string,
  title: string;
  done: boolean;
  userId: string;
  createdAt: Timestamp;
  modifiedAt: Timestamp;
}
