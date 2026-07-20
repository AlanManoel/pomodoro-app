import notifee, { AuthorizationStatus, EventType } from "@notifee/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { updateStateByElapsedTime } from "../helpers/UpdateStateByElpasedTime";

notifee.onBackgroundEvent(async (event) => {

    if (event.type !== EventType.DISMISSED && event.type !== EventType.DELIVERED) return;

    await new Promise((resolve) => {
        setTimeout(() => resolve({}), 1000)
    });

    const appState = await AsyncStorage.getItem("APP_STATE")
        .then(value => JSON.parse(value || "null"));

    if (!appState) return;

    const updateState = updateStateByElapsedTime(appState);

    const getTitle = () => {
        switch (updateState.currentState) {
            case "focus": return "Periodo de foco";
            case "long_break": return "Pausa longa";
            case "short_break": return "Pausa curta";
            default: return "Iniciando a notificações"
        }
    }

    const getMaxTime = () => {
        switch (updateState.currentState) {
            case "focus": return updateState.currentFocusTime;
            case "long_break": return updateState.currentCicleLongTime;
            case "short_break": return updateState.currentCicleShortTime;
            default: return updateState.currentFocusTime
        }
    }

    const maxTime = getMaxTime();

    await notifee.displayNotification({
        id: "pomodoro_progress",

        title: getTitle(),
        body: `Tempo restante ${Math.floor(updateState.counterCicleTime / 60)}:${(updateState.counterCicleTime % 60).toString().padStart(2, "0")}`,

        android: {
            ongoing: true,
            channelId: "default",
            progress: {
                max: maxTime,
                current: maxTime - updateState.counterCicleTime,
            }
        }
    })

})

const requestePermission = async () => {
    const { authorizationStatus } = await notifee.requestPermission();
    if (authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
        Alert.alert(
            "Permissão negada",
            "A permissão para notificações foi negada"
        );
    }
}

const activateNotification = async () => {
    await notifee.createChannel({
        id: "default",
        name: "Pomodoro"
    })

    await notifee.displayNotification({
        id: "pomodoro_progress",

        title: "Pomodoro",
        body: "Iniciando notificação",

        android: {
            ongoing: true,
            timeoutAfter: 1000,
            channelId: "default",
            progress: {
                max: 1,
                current: 1,
                indeterminate: true
            }
        }
    })
}

const deactivateNotification = async () => {
    await notifee.cancelAllNotifications();
}

export const NotificationService = {
    requestePermission,
    activateNotification,
    deactivateNotification,
}