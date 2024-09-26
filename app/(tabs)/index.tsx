import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/FirebaseConfig";
import { router } from "expo-router";
import { TextInput } from "react-native";
import LoginSignupForm from "@/components/LoginSingupForm";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (): Promise<void> => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)/explore");
    } catch (err: any) {
      console.log(err);
      alert("Sign in failed " + err.message);
    }
  };

  const signUp = async (): Promise<void> => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)/explore");
    } catch (err: any) {
      console.log(err);
      alert("Sign in failed " + err.message);
    }
  };

  return (
    <LoginSignupForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      signIn={signIn}
      signUp={signUp}
    />
    // <SafeAreaView style={styles.container}>
    //   <Text style={styles.title}>Login</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //     keyboardType="email-address"
    //     autoCapitalize="none"
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />
    //   <TouchableOpacity style={styles.button} onPress={signIn}>
    //     <Text style={styles.buttonText}>Login</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     style={[styles.button, styles.signupButton]}
    //     onPress={signUp}
    //   >
    //     <Text style={styles.buttonText}>Signup</Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
    // <SafeAreaView
    //   style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    // >
    //   <Text>Login</Text>
    //   <TextInput placeholder="email" value={email} onChangeText={setEmail} />
    //   <TextInput
    //     placeholder="password"
    //     value={password}
    //     onChangeText={setPassword}
    //   />
    //   <TouchableOpacity onPress={signIn}>
    //     <Text>Login</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={signUp}>
    //     <Text>Signup</Text>
    //   </TouchableOpacity>
    // </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
