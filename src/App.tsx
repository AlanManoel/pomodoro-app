import { View } from 'react-native';
import { useEffect } from 'react';

import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

import { Home } from './pages/Home';


SplashScreen.preventAutoHideAsync();

export function App() {

  const [loaded, error] = useFonts({
    interRegular: Inter_400Regular,
    interBold: Inter_700Bold,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Home />
    </View>
  );
}
