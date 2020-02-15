import { StyleSheet } from 'react-native';
import { ColorsPack } from '../../styles/colors.enum';

export default StyleSheet.create({
    container: {
        height: 250,
        marginBottom: 10,
        elevation: 2
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        backgroundColor: ColorsPack.backgroundColor
    },
    searchInput: {
        flex: 1
    },
    indicator: {
        fontSize: 30,
        color: ColorsPack.placeholderTextColor,
    },
    expandedItemsContainer: {
        flexDirection: 'column',
        backgroundColor: '#fafafa'
    },
    submitButton: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorsPack.primary
    },
    submitButtonText: {
        color: ColorsPack.light,
        fontSize: 14,
    },
});
