// utils/music.ts
import { Audio } from "expo-av";

let sound: Audio.Sound | null = null;

export async function playMusic() {
  try {
    if (!sound) {
      sound = new Audio.Sound();
      await sound.loadAsync(require("../assets/music/background.mp3"));
      await sound.setIsLoopingAsync(true);

      // Ensure audio plays properly by setting the audio mode
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true, // Allow playback in silent mode on iOS
      });
    }
    await sound.playAsync();
  } catch (error) {
    console.error("Error playing music:", error);
  }
}

export async function pauseMusic() {
  try {
    if (sound) {
      await sound.pauseAsync();
    }
  } catch (error) {
    console.error("Error pausing music:", error);
  }
}

export async function setVolume(volume: number) {
  try {
    if (sound) {
      await sound.setVolumeAsync(volume); // Volume should be between 0.0 and 1.0
    }
  } catch (error) {
    console.error("Error setting volume:", error);
  }
}
