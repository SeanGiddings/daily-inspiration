import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function QuotesScreen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
      );
      const data = await response.json();

      setQuote(data.quoteText || "Quote not available.");
      setAuthor(data.quoteAuthor || "Unknown");
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Unable to fetch quote. Please try again.");
      setAuthor("");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a quote when the screen loads
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0a7ea4" />
      ) : (
        <>
          <Text style={styles.quote}>{quote}</Text>
          <Text style={styles.author}>- {author}</Text>
          <Button title="New Quote" onPress={fetchQuote} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  quote: {
    fontSize: 24,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  author: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: "#555",
  },
});
