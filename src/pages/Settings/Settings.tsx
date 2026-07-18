import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons } from "@expo/vector-icons";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { Theme } from "@/shared/Themes/Theme";
import { Button } from "@/shared/components/Button"
import { styles } from "./styles";




export const Settings = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const [focusPeriod, setFocusPeriod] = useState(15);
    const [shortBreakPeriod, setShortBreakPeriod] = useState(3);
    const [longBreakPeriod, setLongBreakPeriod] = useState(10);
    const [notificationPeriod, setNotificationPeriod] = useState(false);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container} >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="close"
                        size={28}
                        color={Theme.colors.primary} />
                </TouchableOpacity>


                <Text style={styles.titleText}>Configurações</Text>


                <View style={styles.containerForms}>
                    <View style={styles.containerTitleForms}>
                        <View style={styles.containerIcon}>

                            <MaterialCommunityIcons
                                name="clock-outline"
                                size={20}
                                color={Theme.colors.primary}
                            />
                        </View>
                        <View>

                            <Text style={styles.titleForms}>Período de foco</Text>
                            <Text style={styles.subtitleForms}>Defina o tempo de concentração</Text>
                        </View>
                    </View>

                    <View style={styles.containerButtonsForms}>
                        <Button title="15 min" selected={focusPeriod === 15} onPress={() => setFocusPeriod(15)}></Button>
                        <Button title="25 min" selected={focusPeriod === 25} onPress={() => setFocusPeriod(25)}></Button>
                        <Button title="30 min" selected={focusPeriod === 30} onPress={() => setFocusPeriod(30)}></Button>
                    </View>
                </View>

                <View style={styles.containerForms}>
                    <View style={styles.containerTitleForms}>
                        <View style={styles.containerIcon}>
                            <SimpleLineIcons
                                name="cup"
                                size={20}
                                color={Theme.colors.primary}
                            />
                        </View>
                        <View>
                            <Text style={styles.titleForms}>Pausa curta</Text>
                            <Text style={styles.subtitleForms}>Defina o tempo de concentração</Text>
                        </View>
                    </View>

                    <View style={styles.containerButtonsForms}>
                        <Button title="3 min" selected={shortBreakPeriod === 3} onPress={() => setShortBreakPeriod(3)}></Button>
                        <Button title="5 min" selected={shortBreakPeriod === 5} onPress={() => setShortBreakPeriod(5)}></Button>
                        <Button title="7 min" selected={shortBreakPeriod === 7} onPress={() => setShortBreakPeriod(7)}></Button>
                    </View>
                </View>

                <View style={styles.containerForms}>
                    <View style={styles.containerTitleForms}>
                        <View style={styles.containerIcon}>
                            <MaterialCommunityIcons
                                name="pine-tree-variant-outline"
                                size={20}
                                color={Theme.colors.primary}
                            />
                        </View>
                        <View>

                            <Text style={styles.titleForms}>Pausa longa</Text>
                            <Text style={styles.subtitleForms}>Tempo de descanso longo</Text>
                        </View>
                    </View>

                    <View style={styles.containerButtonsForms}>
                        <Button title="10 min" selected={longBreakPeriod === 10} onPress={() => setLongBreakPeriod(10)}></Button>
                        <Button title="15 min" selected={longBreakPeriod === 15} onPress={() => setLongBreakPeriod(15)}></Button>
                        <Button title="20 min" selected={longBreakPeriod === 20} onPress={() => setLongBreakPeriod(20)}></Button>
                    </View>
                </View>

                <View style={styles.containerForms}>
                    <View style={styles.containerTitleForms}>
                        <View style={styles.containerIcon}>
                            <Ionicons
                                name="notifications-outline"
                                size={20}
                                color={Theme.colors.primary}
                            />
                        </View>
                        <View>
                            <Text style={styles.titleForms}>Notificações</Text>
                            <Text style={styles.subtitleForms}>Receber alertas e lembretes</Text>
                        </View>
                    </View>

                    <View style={styles.containerButtonsForms}>
                        <Button
                            style={{ width: 160 }}
                            title="Desativado"
                            selected={notificationPeriod === false}
                            onPress={() => setNotificationPeriod(false)}></Button>

                        <Button
                            style={{ width: 160 }}
                            title="Ativado"
                            selected={notificationPeriod === true}
                            onPress={() => setNotificationPeriod(true)}></Button>
                    </View>
                </View>


                <View>
                    <View style={styles.containerTip}>
                        <MaterialIcons
                            name="lightbulb-outline"
                            size={24}
                            color={Theme.colors.primary} />
                        <View>
                            <Text style={styles.titleForms}>Dica</Text>
                            <Text style={[styles.subtitleForms, { maxWidth: 250 }]}>Use o método Pomodoro para melhorar sua produtividade</Text>
                        </View>
                    </View>
                </View>

            </View >
        </ScrollView>
    )
}
