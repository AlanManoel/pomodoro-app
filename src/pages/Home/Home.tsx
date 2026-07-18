import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress';



import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { Theme } from "@/shared/Themes/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles"
import { Button } from "@/shared/components/Button";
import { PomodoroProgress } from "@/shared/components/PomodoroProgress";
import { useState } from "react";




export const Home = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    console.log(isRunning, isPaused)
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.buttonSettings} onPress={() => navigation.navigate("Settings")}>
                <MaterialIcons name="settings"
                    size={28}
                    color={Theme.colors.primary} />
            </TouchableOpacity>


            <Text style={styles.titleText}>Pomodoro</Text>

            <View style={styles.containerCircularProgress}>
                <AnimatedCircularProgress
                    size={300}
                    width={8}
                    fill={0}
                    tintColor={Theme.colors.secundary}
                    backgroundColor={Theme.colors.primary}
                    rotation={0}
                    children={() => <Text style={styles.progressText}>25:00</Text>}
                />
                {!isRunning && (
                    <Button title="Iniciar" selected={true} onPress={() => { setIsRunning(true); setIsPaused(false) }} />
                )}

                {isRunning && !isPaused && (
                    <View style={styles.containerBottom}>
                        <Button title="Pausar" selected={ true} onPress={() => {setIsRunning(true);setIsPaused(true)}} />
                        <Button title="Parar" selected={false} onPress={() => { setIsRunning(false); setIsPaused(false); }} />
                    </View>

                )}

                {isRunning && isPaused && (
                    <View style={styles.containerBottom}>
                        <Button title="Continuar" selected={true} onPress={() => {setIsPaused(false); setIsRunning(true)}} />
                        <Button title="Reniciar" selected={false} onPress={() => { setIsRunning(false); setIsPaused(false); }} />
                    </View>
                )}
            </View>

            <View style={styles.containerPomodoro}>
                <View style={styles.containerTitlePomodoro}>
                    <Text style={styles.textPomodoro}>Pomodoros</Text>
                    <Text style={styles.subtitlePomodoro}>Sessão de hoje</Text>
                </View>
                <View style={styles.containerProgessPomodoro}>
                    <PomodoroProgress selected={true} />
                    <PomodoroProgress selected={false} />
                    <PomodoroProgress selected={false} />
                    <PomodoroProgress selected={false} />
                </View>

            </View>

        </View>
    )
}

