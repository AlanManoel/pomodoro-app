import { View } from "react-native";
import { styles } from "./styles";


type Props = {
  step: 1 | 2 | 3 | 4;
  index: 1 | 2 | 3 | 4 | 5;
};

export function PomodoroProgress({ step, index }: Props) {
  const completed = step >= index;

  return (
    <View
      style={
        completed
          ? styles.pomodoroIndicatorComplet
          : styles.pomodoroIndicator
      }
    />
  );
}