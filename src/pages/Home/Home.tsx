import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress';



import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { Theme } from "@/shared/Themes/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles"
import { Button } from "@/shared/components/Button";
import { PomodoroProgress } from "@/shared/components/PomodoroProgress";
import { useEffect, useState } from "react";



export const Home = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3 | 4>(2)

    const [currentCicleTime, setCurrentCicleTime] = useState(25 * 60)
    const [counterCicleTime, setCounterCicleTime] = useState(12.5 * 60)

    useEffect(() => {
        const ref = setInterval(() => {
            setCounterCicleTime(old => old - 1)
        }, 1000);

        return () => clearInterval(ref)
    }, [])

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
                    fill={100 - (counterCicleTime / currentCicleTime) * 100}
                    tintColor={Theme.colors.secundary}
                    backgroundColor={Theme.colors.primary}
                    rotation={0}
                    children={() => <Text style={styles.progressText}>
                        {Math.floor(counterCicleTime / 60)}:{(counterCicleTime % 60).toString().padStart(2, "0")}
                    </Text>}
                />
                {!isRunning && (
                    <Button title="Iniciar" selected={true} onPress={() => { setIsRunning(true); setIsPaused(false) }} />
                )}

                {isRunning && !isPaused && (
                    <View style={styles.containerBottom}>
                        <Button title="Pausar" selected={true} onPress={() => { setIsRunning(true); setIsPaused(true) }} />
                        <Button title="Parar" selected={false} onPress={() => { setIsRunning(false); setIsPaused(false); }} />
                    </View>

                )}

                {isRunning && isPaused && (
                    <View style={styles.containerBottom}>
                        <Button title="Continuar" selected={true} onPress={() => { setIsPaused(false); setIsRunning(true) }} />
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
                    <PomodoroProgress step={step} index={1} />
                    <PomodoroProgress step={step} index={2} />
                    <PomodoroProgress step={step} index={3} />
                    <PomodoroProgress step={step} index={4} />
                </View>

            </View>

        </View>
    )
}

