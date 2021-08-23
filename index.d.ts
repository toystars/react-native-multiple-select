// Type definitions for react-native-multiple-select

import * as React from "react";
import { ViewStyle, TextStyle, TextInputProps, StyleProp, FlatListProps } from 'react-native';

export interface MultiSelectProps {
    single?: boolean;
    selectedItems?: any[];
    items: any[];
    uniqueKey?: string,
    tagBorderColor?: string;
    tagTextColor?: string;
    fontFamily?: string;
    tagRemoveIconColor?: string;
    onSelectedItemsChange: ((items: any[]) => void),
    selectedItemFontFamily?: string;
    selectedItemTextColor?: string;
    itemFontFamily?: string;
    itemTextColor?: string;
    itemFontSize?: number;
    selectedItemIconColor?: string;
    searchIcon?: React.ReactNode;
    searchInputPlaceholderText?: string;
    searchInputStyle?: StyleProp<TextStyle>;
    selectText?: string;
    styleDropdownMenu?: StyleProp<ViewStyle>;
    styleDropdownMenuSubsection?: StyleProp<ViewStyle>;
    styleInputGroup?: StyleProp<ViewStyle>;
    styleItemsContainer?: StyleProp<ViewStyle>;
    styleListContainer?: StyleProp<ViewStyle>;
    styleMainWrapper?: StyleProp<ViewStyle>;
    styleRowList?: StyleProp<ViewStyle>;
    styleSelectorContainer?: StyleProp<ViewStyle>;
    styleTextDropdown?: StyleProp<TextStyle>;
    styleTextDropdownSelected?: StyleProp<TextStyle>;
    altFontFamily?: string;
    hideSubmitButton?: boolean;
    hideDropdown?: boolean;
    submitButtonColor?: string;
    submitButtonText?: string;
    textColor?: string;
    fontSize?: number;
    fixedHeight?: boolean;
    hideTags?: boolean,
    canAddItems?: boolean;
    onAddItem?: (newItems: any[]) => void;
    onChangeInput?: (text: string) => void;
    displayKey?: string;
    textInputProps?: TextInputProps;
    flatListProps?: FlatListProps<any>;
    filterMethod?: string;
    noItemsText?: string;
}

export default class MultiSelect extends React.Component<MultiSelectProps> {
    getSelectedItemsExt: (items: any[]) => React.ReactNode;
}
