import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { TSScreenDefinitionsProps } from "../AppRoutes";
import { Theme } from "../shared/Themes/Theme";



export const Home = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    return (
        <View style={{backgroundColor: Theme.colors.background}} >
            <Text style={{ fontFamily: "interRegular" }}>Home page</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Text>Settings</Text>
            </TouchableOpacity>
        </View>
    )
}