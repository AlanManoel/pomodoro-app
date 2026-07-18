import { Theme } from "@/shared/Themes/Theme";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 24,
        gap: 32,
    },
    titleText: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.interBold,
        fontSize: Theme.fontSize.title,
    },
    backButton: {
        position: "absolute",
        top: 32,
        right: 32
    },
    containerForms: {
        gap: 16,
        paddingBottom: 20,
        borderColor: Theme.colors.secundary,
        borderBottomWidth: 2
    },
    containerIcon: {
        backgroundColor: Theme.colors.secundary,
        height: 36,
        width: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderColor: Theme.colors.primary,
        borderWidth: 0.2
    },
    containerTitleForms: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    titleForms: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.interBold,
        fontSize: Theme.fontSize.body
    },
    subtitleForms: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.interRegular,
        fontSize: Theme.fontSize.label
    },
    containerButtonsForms: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerTip: {
        paddingLeft: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: Theme.colors.secundary,
        padding: 20,
        borderRadius: 20
    }
})