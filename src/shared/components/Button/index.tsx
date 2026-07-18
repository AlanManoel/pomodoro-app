import { StyleProp, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    title: string,
    selected: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export function Button({ title, selected, onPress, style}: Props) {
    return (
        <TouchableOpacity
            style={[
                selected ? styles.buttonDefault : styles.buttonSelected,
                style,
            ]}
            onPress={onPress}
        >
            <Text style={selected ? styles.textButtonDefault : styles.textButtonSelect}>{title}</Text>
        </TouchableOpacity>
    )
}
