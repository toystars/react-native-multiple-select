/*!
 * react-native-multi-select
 * Copyright(c) 2020 Mustapha Babatunde Oluwaleke
 * MIT Licensed
 */

import { MultiSelectItem } from './multi-select-item.interface';

export interface MultiSelectProps {
    items: MultiSelectItem[];
    selectedItems: string[];
    onSelectedItemsChange: (selectedItems: string[]) => void;
    onAddItem?: (newItems: MultiSelectItem[]) => void;
    isSingleSelection?: boolean;
    hideSubmitButton?: boolean
    hideTags?: boolean;
}
