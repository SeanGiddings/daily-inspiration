import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    router.replace("/splash"); // Explicitly redirect to splash
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="quotes" options={{ headerShown: false }} />{" "}
        {/* Add Quotes Screen */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
