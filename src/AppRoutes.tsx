import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { DefaultTheme, NavigationContainer, NavigationProp } from '@react-navigation/native';
import { Theme } from './shared/Themes/Theme';


type TScreenDefinitions = {
    Home: undefined
    Settings: undefined
}

const Stack = createStackNavigator<TScreenDefinitions>();

export function AppRoutes() {
    return (
        <NavigationContainer
            theme={
                {
                    ...DefaultTheme,
                    fonts: {
                        ...DefaultTheme.fonts,
                        bold: {
                            fontFamily: Theme.fonts.interBold,
                            fontWeight: "500"
                        },
                        regular: {
                            fontFamily: Theme.fonts.interRegular,
                            fontWeight: "700"
                        }
                    },
                    colors: {
                        ...DefaultTheme.colors,
                        background: Theme.colors.background,
                        primary: Theme.colors.primary,
                        text: Theme.colors.text,
                        card: Theme.colors.divider
                    }
                }
            }>
            <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export type TSScreenDefinitionsProps = NavigationProp<TScreenDefinitions>