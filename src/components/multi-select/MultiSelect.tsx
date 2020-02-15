import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  UIManager,
  Platform
} from 'react-native';
// import reject from 'lodash/reject';
// import find from 'lodash/find';
// import get from 'lodash/get';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ExpandedMultiSelectView } from '../expanded-multi-select-view';
import { SelectedItemTag } from '../selected-item-tag';
import { generateRandomId } from '../../utils';
import { MultiSelectProps, MultiSelectState, MultiSelectItem } from '../types';
import styles from './styles';


// set UIManager LayoutAnimationEnabledExperimental
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export class MultiSelect extends Component<MultiSelectProps, MultiSelectState> {

    constructor(props: MultiSelectProps) {
        super(props);
        this.state = {
            isMultiSelectExpanded: false,
            searchTerm: ''
        };
    }

    getSelectedItemsExt = () => this.renderSelectedItemsTags();

    onChangeSearchTerm = (searchTerm: string) => {
        this.setState({ searchTerm });
    };

    submitSelection = () => {
        this.toggleSelector();
        this.clearSearchTerm();
    };

  _getSelectLabel = () => {
    const { selectText, isSingleSelection: single, selectedItems, displayKey } = this.props;
    if (!selectedItems || selectedItems.length === 0) {
      return selectText;
    }
    if (single) {
      const item = selectedItems[0];
      const foundItem = this._findItem(item);
      return get(foundItem, displayKey) || selectText;
    }
    return `${selectText} (${selectedItems.length} selected)`;
  };

    findItem = (id: string) => {
        const { items } = this.props;
        return items.find(item => item.id === id);
    };

    renderSelectedItemsTags = () => {
        const { selectedItems } = this.props;
        return (
            <View style={styles.selectedItemsTagsContainer}>
                {selectedItems.map(selectedItemId => {
                    const item = this.findItem(selectedItemId);
                    return (
                        <SelectedItemTag
                            item={item}
                            removeItem={this.removeItem}
                        />
                    );
                })}
            </View>
        )
    };

    removeItem = (item: MultiSelectItem) => {
        const { selectedItems, onSelectedItemsChange } = this.props;
        const newItems = selectedItems.filter(id => id !== item.id)
        // broadcast new selected items state to parent component
        onSelectedItemsChange(newItems);
    };

    toggleSelector = () => {
        const { isMultiSelectExpanded } = this.state;
        this.setState({ isMultiSelectExpanded: !isMultiSelectExpanded });
    };

    clearSearchTerm = () => {
        this.setState({ searchTerm: '' });
    };

    isItemSelected = (item: MultiSelectItem) => {
        const { selectedItems } = this.props;
        return selectedItems.indexOf(item.id) !== -1;
    }

    addItem = () => {
        const { items, selectedItems, onSelectedItemsChange, onAddItem } = this.props;
        const { searchTerm } = this.state;

        if (searchTerm && onAddItem) {
            const id = generateRandomId();
            const newItem: MultiSelectItem = { id, title: searchTerm };

            const newItems = [...items, newItem];
            const newSelectedItems = [...selectedItems, id]

            // emit new items back to consumer if provided
            onAddItem(newItems);
            // emit new selected items back to consumer
            onSelectedItemsChange(newSelectedItems);
            // clear search terms
            this.clearSearchTerm();
        }
    };

    toggleItem = (item: MultiSelectItem) => {
        const { isSingleSelection: singleSelection, selectedItems, onSelectedItemsChange } = this.props;
        const isItemSelected = this.isItemSelected(item);

        if (singleSelection) {
            this.submitSelection();
            const newSelectedItems = isItemSelected ? [] : [item.id];
            onSelectedItemsChange(newSelectedItems);
        } else {
            const newSelectedItems = isItemSelected ? selectedItems.filter(id => id !== item.id) : [...selectedItems, item.id];
            // broadcast new selected items state to parent component
            onSelectedItemsChange(newSelectedItems);
        }
    };

    renderItem = (item: MultiSelectItem) => {
        const isItemSelected = this.isItemSelected(item);
        const selectedItemStyle = isItemSelected ? styles.selectedSingleItemLabel : {}
        const disabledItemStyle = item.disabled ? styles.disabledSingleItemLabel : {};
        return (
            <TouchableOpacity
                disabled={item.disabled}
                onPress={() => this.toggleItem(item)}
                style={styles.singleItemContainer}
            >
                <Text style={[styles.singleItemLabel, selectedItemStyle, disabledItemStyle]}>
                    {item.title}
                </Text>
                {isItemSelected && (
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-checkmark-outline' : 'md-checkmark-outline'}
                        style={styles.selectedSingleItemIcon}
                    />
                )}
            </TouchableOpacity>
        );
    };

    filterItems = () => {
        const { items } = this.props;
        const { searchTerm } = this.state;

        // filter regex
        const parts = searchTerm.trim().split(/[ \-:]+/);
        const regex = new RegExp(`(${parts.join('|')})`, 'ig');

        return items.filter((item) => regex.test(item.title));
    };

    renderNewRow = () => {
        const { searchTerm } = this.state;
        return (
            <TouchableOpacity onPress={() => this.addItem()} style={styles.emptyItemsContainer}>
                <Text style={styles.itemToAddLabel}>
                    Add {searchTerm} (tap or press return)
                </Text>
            </TouchableOpacity>
        );
    };

    renderEmptyItems = () => {
        return (
            <View style={styles.emptyItemsContainer}>
                <Text style={styles.emptyItemsLabel}>
                    No item to display.
                </Text>
            </View>
        );
    }

    renderItems = () => {
        const { items, selectedItems, onAddItem } = this.props;
        const { searchTerm } = this.state;

        const itemsToRender = searchTerm ? this.filterItems() : items;
        const newRowToAdd = searchTerm.length ? this.renderNewRow() : null;
        const emptyOrNewItemView = onAddItem ? newRowToAdd : this.renderEmptyItems();

        return (
            <FlatList
                data={itemsToRender}
                extraData={selectedItems}
                keyExtractor={item => item.id}
                renderItem={rowData => this.renderItem(rowData.item)}
                ListEmptyComponent={emptyOrNewItemView}
                nestedScrollEnabled
            />
        );
    };

    _renderExpandedMultiSelectView = () => {
        const { hideSubmitButton, isSingleSelection } = this.props;
        const { searchTerm } = this.state;
        return (
            <ExpandedMultiSelectView
                searchTerm={searchTerm}
                hideSubmitButton={hideSubmitButton}
                singleSelection={isSingleSelection}
                onChangeSearchTerm={this.onChangeSearchTerm}
                onSubmitEditing={this.addItem}
                onSubmitButtonPress={this.submitSelection}
            >
                {this.renderItems()}
            </ExpandedMultiSelectView>
        );
    }

    _renderCollapsedMultiSelectView = () => {
        const { isSingleSelection, hideTags, selectedItems } = this.props;
        const showSelectedItems = !isSingleSelection && !hideTags && selectedItems.length;
        return (
            <View>
                <View
                    style={[
                        styles.dropdownView,
                        styleDropdownMenu && styleDropdownMenu
                    ]}
                >
                    <View
                        style={[
                            styles.subSection,
                            { paddingTop: 10, paddingBottom: 10 },
                            styleDropdownMenuSubsection && styleDropdownMenuSubsection
                        ]}
                    >
                        <TouchableWithoutFeedback onPress={this._toggleSelector}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={
                                        !selectedItems || selectedItems.length === 0
                                            ? [
                                                {
                                                    flex: 1,
                                                    fontSize: fontSize || 16,
                                                    color:
                                                        textColor || colorPack.placeholderTextColor
                                                },
                                                styleTextDropdown && styleTextDropdown,
                                                altFontFamily
                                                    ? { fontFamily: altFontFamily }
                                                    : fontFamily
                                                        ? { fontFamily }
                                                        : {}
                                            ]
                                            : [
                                                {
                                                    flex: 1,
                                                    fontSize: fontSize || 16,
                                                    color:
                                                        textColor || colorPack.placeholderTextColor
                                                }
                                            ]
                                    }
                                    numberOfLines={1}
                                >
                                    {this._getSelectLabel()}
                                </Text>
                                <Ionicons
                                    name={hideSubmitButton ? 'menu-right' : 'menu-down'}
                                    style={styles.indicator}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                {showSelectedItems && this.renderSelectedItemsTags()}
            </View>
        );
    }

    render() {
        const { isMultiSelectExpanded } = this.state;
        return (
            <View style={{}}>
                {isMultiSelectExpanded ? this._renderExpandedMultiSelectView() : this._renderCollapsedMultiSelectView()}
            </View>
        );
    }
}
