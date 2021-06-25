import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    container: {
        flex: 1, //Diz que o elemento ocupará toda a tela`
    },
    header: {
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getStatusBarHeight() + 26, //A função retorna o tamanho da status bar, que no iphone é maior q no android
        marginBottom: 42,
    },
    content: {
        marginTop: 42
    },
    matches: {
        marginTop: 24,
        marginLeft: 24
    }
})