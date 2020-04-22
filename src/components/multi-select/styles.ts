/*!
 * react-native-multi-select
 * Copyright(c) 2020 Mustapha Babatunde Oluwaleke
 * MIT Licensed
 */

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
    },
    dropdownView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginBottom: 10
    },
    subSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ColorsPack.light,
        borderBottomWidth: 1,
        borderColor: ColorsPack.borderColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        paddingRight: 20
    },
    collapsedViewInfoWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    collapsedViewInfoLabel: {
        flex: 1,
        fontSize: 16,
        color: ColorsPack.placeholderTextColor
    },
    collapsedViewInfoLabel_itemSelected: {
        color: ColorsPack.textPrimary
    },
    indicator: {
        fontSize: 30,
        color: ColorsPack.placeholderTextColor,
    },
});
