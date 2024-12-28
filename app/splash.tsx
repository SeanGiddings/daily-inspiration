import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to the home page after 3 seconds
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 3000);
    });
  }, [fadeAnim, router]);

  return (
    <TouchableWithoutFeedback onPress={() => router.replace("/(tabs)")}>
      <View style={styles.container}>
        <Animated.Image
          source={require("../assets/images/sparrowghost-logo.png")}
          style={[styles.logo, { opacity: fadeAnim }]}
        />
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
          Developed By Sparrowghost
        </Animated.Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
console.log("Splash screen is loading");
