import { Theme } from "@/shared/Themes/Theme";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 24,
        gap: 32,
    },
    containerBottom: {
        flexDirection: "row",
        gap: 20
    },
    containerCircularProgress: {
        gap: 32,
        alignItems: "center",
    },
    progressText: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.interBold,
        fontSize: Theme.fontSize.title
    },
    titleText: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.interBold,
        fontSize: Theme.fontSize.title,
        marginBottom: 40
    },
    containerPomodoro: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: Theme.colors.secundary,
        padding: 24,
        borderRadius: 20,
    },
    containerTitlePomodoro: {
        flexDirection: "column"
    },
    containerProgessPomodoro: {
        flexDirection: "row",
        gap: 8
    },

    textPomodoro: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.interBold,
        fontSize: Theme.fontSize.body
    },
    subtitlePomodoro: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.interRegular,
        fontSize: Theme.fontSize.label
    },
    pomodoroIndicator: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: Theme.colors.secundary
    },
    pomodoroIndicatorComplet: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: Theme.colors.primary
    },
    buttonSettings: {
        position: "absolute",
        top: 32,
        right: 32
    }
})