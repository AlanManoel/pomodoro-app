import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View, AppState } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { Theme } from "@/shared/Themes/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles"
import { Button } from "@/shared/components/Button";
import { PomodoroProgress } from "@/shared/components/PomodoroProgress";
import { updateStateByElapsedTime } from "@/shared/helpers/UpdateStateByElpasedTime";



export const Home = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const [appRunningState, setAppRunningState] = useState(AppState.currentState)
    useEffect(() => {
        const listener = AppState.addEventListener("change", setAppRunningState);
        return () => listener.remove()
    }, [])

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

    }, [counterCicleTime, currentState, step, currentCicleShortTime, currentCicleLongTime, isPaused, isRunning, currentFocusTime])

    const timeProgress = useMemo(() => {
        switch (currentState) {
            case "focus": return 100 - (counterCicleTime / currentFocusTime) * 100;
            case "short_break": return 100 - (counterCicleTime / currentCicleShortTime) * 100;
            case "long_break": return 100 - (counterCicleTime / currentCicleLongTime) * 100;
        }
    }, [currentState, counterCicleTime, currentFocusTime, currentCicleShortTime, currentCicleLongTime]);


    const isShowUpdate = useRef(true);
    useEffect(() => {
        if (isShowUpdate.current) {
            isShowUpdate.current = false;

            AsyncStorage.getItem("APP_STATE")
                .then(value => {
                    const stored = JSON.parse(value || "null")

                    if (!stored?.appState) return

                    const updated = updateStateByElapsedTime(stored.appState)

                    setCurrentState(updated.currentState)
                    setCounterCicleTime(updated.counterCicleTime)
                    setIsRunning(updated.isRunning)
                    setIsPaused(updated.isPaused)
                    setStep(updated.step)
                })
        }
        if (appRunningState === "background") {
            isShowUpdate.current = true
        }
    }, [appRunningState])

    const handleStart = () => {
        setIsRunning(true);
        setIsPaused(false);
        AsyncStorage.setItem("APP_STATE", JSON.stringify({
            time: Date.now(),
            isRunning: true,
            isPaused,
            counterCicleTime,
            currentState,
            step,
            currentCicleLongTime,
            currentCicleShortTime,
            currentFocusTime,
        }))
    }
    const handlePause = () => {
        setIsPaused(true)
        AsyncStorage.setItem("APP_STATE", JSON.stringify({
            time: Date.now(),
            isRunning,
            isPaused: true,
            counterCicleTime,
            currentState,
            step,
            currentCicleLongTime,
            currentCicleShortTime,
            currentFocusTime,
        }))
    }
    const handleStop = () => {
        setStep(1);
        setCompletedPomodoros(0);
        setIsRunning(false);
        setIsPaused(false);
        AsyncStorage.setItem("APP_STATE", JSON.stringify({
            time: Date.now(),
            isRunning: false,
            isPaused: false,
            counterCicleTime: currentFocusTime,
            currentState: "focus",
            step: 1,
            currentCicleLongTime,
            currentCicleShortTime,
            currentFocusTime,
        }))
        setCounterCicleTime(currentFocusTime)
    }
    const handleContinue = () => {
        setIsPaused(false)
        AsyncStorage.setItem("APP_STATE", JSON.stringify({
            time: Date.now(),
            isRunning,
            isPaused: false,
            counterCicleTime,
            currentState,
            step,
            currentCicleLongTime,
            currentCicleShortTime,
            currentFocusTime,
        }))
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
