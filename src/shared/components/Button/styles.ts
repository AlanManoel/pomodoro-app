import { Theme } from "@/shared/Themes/Theme";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    buttonDefault: {
        backgroundColor: Theme.colors.primary,
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 100,
        shadowColor: Theme.colors.background,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonSelected: {
        backgroundColor: Theme.colors.button,
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 100,
        shadowColor: Theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    textButtonDefault: {
        color: Theme.colors.textTertiary,
        fontFamily: Theme.fonts.interRegular,
        fontSize: Theme.fontSize.body
    },
    textButtonSelect: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.interRegular,
        fontSize: Theme.fontSize.body
    },
})