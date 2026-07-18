import { Theme } from "@/shared/Themes/Theme";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    pomodoroIndicator: {
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: Theme.colors.secundary
    },
    pomodoroIndicatorComplet: {
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: Theme.colors.primary
    },
})