import { MultiSelectItem } from './multi-select-item.interface'

export interface MultiSelectProps {
    items: MultiSelectItem[];
    selectedItems: string[];
    onSelectedItemsChange: (selectedItems: string[]) => void;
    onAddItem?: (newItems: MultiSelectItem[]) => void;
    isSingleSelection?: boolean;
    hideSubmitButton?: boolean
    hideTags?: boolean;
}



// const propTypes = {

//     tagBorderColor: PropTypes.string,
//     tagTextColor: PropTypes.string,
//     fontFamily: PropTypes.string,
//     tagRemoveIconColor: PropTypes.string,
//     selectedItemFontFamily: PropTypes.string,
//     selectedItemTextColor: PropTypes.string,
//     itemFontFamily: PropTypes.string,
//     itemTextColor: PropTypes.string,
//     itemFontSize: PropTypes.number,
//     searchIcon: nodeTypes,
//     selectText: PropTypes.string,
//     styleDropdownMenu: ViewPropTypes.style,
//     styleDropdownMenuSubsection: ViewPropTypes.style,
//     styleInputGroup: ViewPropTypes.style,
//     styleMainWrapper: ViewPropTypes.style,
//     styleSelectorContainer: ViewPropTypes.style,
//     styleTextDropdown: Text.propTypes.style,
//     styleTextDropdownSelected: Text.propTypes.style,
//     altFontFamily: PropTypes.string,
//     hideSubmitButton: PropTypes.bool,
//     submitButtonText: PropTypes.string,
//     textColor: PropTypes.string,
//     fontSize: PropTypes.number,
//     fixedHeight: PropTypes.bool,
//     hideTags: PropTypes.bool,
//     onAddItem: PropTypes.func,
//     onChangeInput: PropTypes.func,
//     displayKey: PropTypes.string,
//     onToggleList: PropTypes.func,
// };

//   const defaultProps = {
//     single: false,
//     selectedItems: [],
//     tagBorderColor: colorPack.primary,
//     tagTextColor: colorPack.primary,
//     fontFamily: '',
//     tagRemoveIconColor: colorPack.danger,
//     selectedItemFontFamily: '',
//     selectedItemTextColor: colorPack.primary,
//     searchIcon: defaultSearchIcon,
//     itemFontFamily: '',
//     itemTextColor: colorPack.textPrimary,
//     itemFontSize: 16,
//     textColor: colorPack.textPrimary,
//     selectText: 'Select',
//     altFontFamily: '',
//     hideSubmitButton: false,
//     submitButtonText: 'Submit',
//     fontSize: 14,
//     fixedHeight: false,
//     hideTags: false,
//     onChangeInput: () => { },
//     displayKey: 'name',
//     onAddItem: () => { },
//     onToggleList: () => { },
// };
