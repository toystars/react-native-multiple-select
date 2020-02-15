import { StyleSheet } from 'react-native';
import { ColorsPack } from '../../styles/colors.enum';

export default StyleSheet.create({
    emptyItemsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emptyItemsLabel: {
        flex: 1,
        marginTop: 20,
        textAlign: 'center',
        color: ColorsPack.danger
    },
    itemToAddContainer: {},
    itemToAddLabel: {
        flex: 1,
        fontSize: 16,
        padding: 5
    },
    singleItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    singleItemLabel: {
        flex: 1,
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        color: ColorsPack.textPrimary
    },
    selectedSingleItemLabel: {
        color: ColorsPack.primary,
        fontWeight: 'bold'
    },
    disabledSingleItemLabel: {
        color: 'grey'
    },
    selectedSingleItemIcon: {
        fontSize: 20,
        color: ColorsPack.primary
    },
    selectedItemsTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
