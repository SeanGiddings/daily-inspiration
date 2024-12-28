import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { getQuote } from "../utils/api";
import { playMusic, setVolume } from "../utils/music";
import { Ionicons } from "@expo/vector-icons"; // Install with `npx expo install @expo/vector-icons`

export default function QuotesScreen() {
  // This is your quotes.tsx component
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [musicMuted, setMusicMuted] = useState(false); // State for mute toggle
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const fadeIn = () => {
    return new Promise((resolve) => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(resolve);
    });
  };

  const fadeOut = () => {
    return new Promise((resolve) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(resolve);
    });
  };

  const fetchNewQuote = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // Fade out current quote
      await fadeOut();

      // Fetch new quote while faded out
      const newQuote = await getQuote();
      setQuote(newQuote);

      // Fade in new quote
      await fadeIn();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Play music on mount
    playMusic();

    // Initial quote load
    getQuote().then((newQuote) => {
      setQuote(newQuote);
      fadeIn().then(() => setLoading(false));
    });

    return () => {
      setVolume(0); // Mute on unmount if needed
    };
  }, []);

  const toggleMusic = () => {
    if (musicMuted) {
      setVolume(1); // Unmute
    } else {
      setVolume(0); // Mute
    }
    setMusicMuted(!musicMuted);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.quoteContainer}
        onPress={fetchNewQuote}
        activeOpacity={0.7}
        disabled={loading}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.authorText}>- {quote.author}</Text>
        </Animated.View>
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
  settingsButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  quoteContainer: {
    padding: 20,
    width: "100%",
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  quoteText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 36,
  },
  authorText: {
    color: "#888",
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
});
