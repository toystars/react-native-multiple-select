import { StyleSheet } from 'react-native';
import { ColorsPack } from '../../styles/colors.enum';

export default StyleSheet.create({
    selectedItemTagWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderColor: ColorsPack.borderColor,
        paddingLeft: 15,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        margin: 3,
        borderRadius: 20,
        borderWidth: 2,
    },
    selectedItemTagLabel: {
        flex: 1,
        color: ColorsPack.textPrimary,
        fontSize: 15
    },
    selectedItemTagIcon: {
        color: ColorsPack.danger,
        fontSize: 22,
        marginLeft: 10
    }
});
