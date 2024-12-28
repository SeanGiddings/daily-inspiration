import { Stack } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useSegments, useLocalSearchParams } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: true, // Enable headers globally
          headerStyle: {
            backgroundColor: "transparent", // Remove background color
            borderBottomWidth: 0, // Remove bottom border
            elevation: 0, // Remove shadow on Android
          },
          headerTitle: "", // Remove the default title
          headerLeft: () => null, // Remove the back arrow
          headerRight: () => <HeaderGear />, // Add the gear icon
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // No header for the splash screen
          }}
        />
        <Stack.Screen name="quotes" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="credits" />
      </Stack>
    </ThemeProvider>
  );
}

function HeaderGear() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Retrieve parameters
  const segments = useSegments(); // Get the current route segments
  const currentPage = segments[segments.length - 1]; // Get the current page name

  const handlePress = () => {
    if (currentPage === "settings" && params.origin) {
      // Navigate back to the originating page
      router.replace(`/${params.origin}`);
    } else if (currentPage !== "settings") {
      // Navigate to settings and pass the current page as the origin
      router.push({
        pathname: "/settings",
        params: { origin: currentPage }, // Pass the current page as the origin
      });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.gearIcon}>
      <Ionicons name="settings-sharp" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gearIcon: {
    marginRight: 15,
  },
});
