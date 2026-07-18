import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress';



import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { Theme } from "@/shared/Themes/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles"
import { Button } from "@/shared/components/Button";
import { PomodoroProgress } from "@/shared/components/PomodoroProgress";
import { useEffect, useMemo, useState } from "react";



export const Home = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3 | 4>(2)
    const [currentState, setCurrentState] = useState<"focus" | "short_break" | "long_break">("focus")

    const [currentCicleShortTime, setCurrentShortCicleTime] = useState(5 * 60)
    const [currentCicleLongTime, setCurrentLongCicleTime] = useState(15 * 60)
    const [currentFocusTime, setCurrentFocusTime] = useState(25 * 60)
    const [counterCicleTime, setCounterCicleTime] = useState(25 * 60)

    useEffect(() => {
        if (!isRunning || isPaused) return;

        const ref = setInterval(() => {
            setCounterCicleTime(old => old <= 0 ? old : old - 1)
        }, 1000);

        return () => clearInterval(ref)
    }, [isRunning, isPaused])

    useEffect(() => {
        switch (currentState) {
            case "focus":
                {
                    if (counterCicleTime > 0) break;

                    if (step < 4) {
                        setCurrentState("short_break");
                        setStep(old => (old + 1) as 1)
                        setCounterCicleTime(currentCicleShortTime);
                    } else {
                        setCurrentState("long_break");
                        setStep(1)
                        setCounterCicleTime(currentCicleLongTime);
                    }
                    break;
                }
            case "short_break":
            case "long_break":
                {
                    if (counterCicleTime <= 0) {
                        setCurrentState("focus");
                        setCounterCicleTime(currentFocusTime);
                    }
                    break;
                }
        }
    }, [counterCicleTime, currentState, step, currentCicleShortTime, currentCicleLongTime])

    const timeProgress = useMemo(() => {
        switch (currentState) {
            case "focus": return 100 - (counterCicleTime / currentFocusTime) * 100;
            case "short_break": return 100 - (counterCicleTime / currentCicleShortTime) * 100;
            case "long_break": return 100 - (counterCicleTime / currentCicleLongTime) * 100;
        }
    }, [currentState, counterCicleTime, currentFocusTime, currentCicleShortTime, currentCicleLongTime]);

    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
    }
    const handlePause = () => {
        setIsPaused(true)
    }
    const handleStop = () => {
        setStep(1);
        setIsRunning(false);
        setIsPaused(false);
        setCounterCicleTime(currentFocusTime)
    }
    const handleContinue = () => {
        setIsPaused(false)
    }



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
                    fill={timeProgress}
                    tintColor={Theme.colors.secundary}
                    backgroundColor={Theme.colors.primary}
                    rotation={0}
                    children={() => <Text style={styles.progressText}>
                        {Math.floor(counterCicleTime / 60)}:{(counterCicleTime % 60).toString().padStart(2, "0")}
                    </Text>}
                />
                {!isRunning && (
                    <Button title="Iniciar" selected={true} onPress={handleStart} />
                )}

                {isRunning && !isPaused && (
                    <View style={styles.containerBottom}>
                        <Button title="Pausar" selected={true} onPress={handlePause} />
                        <Button title="Parar" selected={false} onPress={handleStop} />
                    </View>

                )}

                {isRunning && isPaused && (
                    <View style={styles.containerBottom}>
                        <Button title="Continuar" selected={true} onPress={handleContinue} />
                        <Button title="Parar" selected={false} onPress={handleStop} />
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

