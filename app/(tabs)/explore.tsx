import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import { useState, useEffect } from "react";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { auth } from "@/FirebaseConfig";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";

export default function TabTwoScreen() {
  const [user, setUser] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
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
  }, []);

  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace("/");
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>
        {user} - {id} You are authenticated.
      </ThemedText>
      <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
        <Text style={styles.buttonText}> Sign Out</Text>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
});
