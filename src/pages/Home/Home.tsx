import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';



import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { Theme } from "@/shared/Themes/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles"
import { Button } from "@/shared/components/Button";
import { PomodoroProgress } from "@/shared/components/PomodoroProgress";
import { useCallback, useEffect, useMemo, useState } from "react";



export const Home = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
    const [completedPomodoros, setCompletedPomodoros] = useState(0);
    const [currentState, setCurrentState] = useState<"focus" | "short_break" | "long_break">("focus")

    const [currentCicleShortTime, setCurrentCicleShortTime] = useState(3 * 60)
    const [currentCicleLongTime, setCurrentCicleLongTime] = useState(15 * 60)
    const [currentFocusTime, setCurrentFocusTime] = useState(10 * 60)

    const [counterCicleTime, setCounterCicleTime] = useState(25 * 60)


    useFocusEffect(useCallback(() => {
        Promise.all([
            AsyncStorage.getItem("SHORT_BREAK_PERIOD"),
            AsyncStorage.getItem("LONG_BREAK_PERIOD"),
            AsyncStorage.getItem("FOCUS_PERIOD"),
        ])
            .then(([short, long, focus]) => {
                setCurrentCicleShortTime(JSON.parse(short || "3") * 60)
                setCurrentCicleLongTime(JSON.parse(long || "10") * 60)
                setCurrentFocusTime(JSON.parse(focus || "15") * 60)
                setCounterCicleTime(JSON.parse(focus || "15") * 60)
            })
    }, []))

    useEffect(() => {
        AsyncStorage.getItem("APP_STATE")
            .then(value => { console.log(value) })
    }, [])

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
                    setCompletedPomodoros((old) => old + 1);

                    if (step < 4) {
                        setCurrentState("short_break");
                        setStep(old => (old + 1) as 2 | 3 | 4)
                        setCounterCicleTime(currentCicleShortTime);
                    } else {
                        setCurrentState("long_break");
                        setCounterCicleTime(currentCicleLongTime);
                    }
                    break;
                }
            case "short_break": {
                if (counterCicleTime <= 0) {
                    setCurrentState("focus");
                    setCounterCicleTime(currentFocusTime);
                }
                break;
            }
            case "long_break":
                {
                    if (counterCicleTime <= 0) {
                        setStep(1);
                        setCompletedPomodoros(0);
                        setCurrentState("focus");
                        setCounterCicleTime(currentFocusTime);
                    }
                    break;
                }
        }
        AsyncStorage.setItem("APP_STATE", JSON.stringify({
            time: Date.now(),
            isRunning,
            isPaused,
            counterCicleTime,
            currentState,
            step,
            currentCicleShortTime,
            currentCicleLongTime,
            currentFocusTime
        }))
    }, [counterCicleTime, currentState, step, currentCicleShortTime, currentCicleLongTime, isPaused, isRunning])

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
        setCompletedPomodoros(0);
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
                    <PomodoroProgress completed={completedPomodoros} index={1} />
                    <PomodoroProgress completed={completedPomodoros} index={2} />
                    <PomodoroProgress completed={completedPomodoros} index={3} />
                    <PomodoroProgress completed={completedPomodoros} index={4} />
                </View>

            </View>

        </View>
    )
}
