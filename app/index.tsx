import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Navigate to quotes after animation + delay
    const timer = setTimeout(() => {
      if (!hasNavigated.current) {
        // Fade out before navigation
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000, // Same duration as fade in
          useNativeDriver: true,
        }).start(() => {
          hasNavigated.current = true;
          router.replace("/quotes");
        });
      }
    }, 3000); // Reduced to account for fade-out time

    return () => clearTimeout(timer);
  }, []);

  const handlePress = () => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      // Fade out on press
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        router.replace("/quotes");
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
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
