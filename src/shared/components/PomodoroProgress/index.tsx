import { View } from "react-native";
import { styles } from "./styles";


type Props = {
    selected: boolean;
}
export function PomodoroProgress({ selected }: Props) {
    return (
        <View style={selected ? styles.pomodoroIndicatorComplet : styles.pomodoroIndicator}></View>
    )
}