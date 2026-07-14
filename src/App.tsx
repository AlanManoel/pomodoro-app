import { useEffect } from 'react';

import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';


import { AppRoutes } from './AppRoutes';
import { Theme } from './shared/Themes/Theme';
import { StatusBar } from 'expo-status-bar';


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
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <StatusBar style='light' />
      <AppRoutes />
    </SafeAreaView>
  );
}
