import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function CreditsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credits</Text>
      <Text style={styles.content}>Developed by Sean Giddings</Text>
      <Text style={styles.content}>
        Quotes provided by https://forismatic.com/
      </Text>
      <Text style={styles.content}>Music by Sparrowghost</Text>
      <TouchableOpacity onPress={() => router.replace("/quotes")}>
        <Text style={styles.link}>Return to quotes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: "#0a7ea4",
    textDecorationLine: "underline",
  },
});
