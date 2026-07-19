import { View } from "react-native";
import { styles } from "./styles";


type Props = {
  completed: number;
  index: 1 | 2 | 3 | 4 ;
};

export function PomodoroProgress({ completed, index }: Props) {
  const iscompleted = completed >= index;

  return (
    <View
      style={
        iscompleted
          ? styles.pomodoroIndicatorComplet
          : styles.pomodoroIndicator
      }
    />
  );
}