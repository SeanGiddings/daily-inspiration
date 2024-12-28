import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { setVolume } from "../utils/music";

export default function SettingsScreen() {
  const router = useRouter();
  const segments = useSegments();
  const previousPage = segments[segments.length - 2] || "quotes"; // Fallback to quotes
  const [musicMuted, setMusicMuted] = useState(false);

  const toggleMusic = () => {
    setVolume(musicMuted ? 1 : 0);
    setMusicMuted(!musicMuted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.option}>
        <Text style={styles.label}>Mute Music</Text>
        <Switch value={musicMuted} onValueChange={toggleMusic} />
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/credits`)}
        style={styles.returnLink}
      >
        <Text style={styles.returnText}>Credits</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => router.push(`/${previousPage}`)}
        style={styles.returnLink}
      >
        <Text style={styles.returnText}>Return to {previousPage}</Text>
      </TouchableOpacity> */}
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
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
  returnLink: {
    marginTop: 20,
  },
  returnText: {
    fontSize: 18,
    color: "#0a7ea4",
    textDecorationLine: "underline",
  },
});
