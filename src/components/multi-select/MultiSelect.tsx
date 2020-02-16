/*!
 * react-native-multi-select
 * Copyright(c) 2020 Mustapha Babatunde Oluwaleke
 * MIT Licensed
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  UIManager
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ExpandedMultiSelectView } from '../expanded-multi-select-view';
import { SelectedItemTag } from '../selected-item-tag';
import { generateRandomId, getPlatformIcon } from '../../utils';
import { MultiSelectProps, MultiSelectState, MultiSelectItem } from '../../types';
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

    get selectionDisplayLabel() {
        const { isSingleSelection, selectedItems } = this.props;

        if (!selectedItems || selectedItems.length === 0) {
            return 'No item selected';
        }

        if (isSingleSelection) {
            const selectedItemId = selectedItems[0];
            const selectedItem = this.findItem(selectedItemId);
            return selectedItem.title;
        }

        return `${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} selected`;
    };

    getSelectedItemsExt = () => this.renderSelectedItemsTags();

    onChangeSearchTerm = (searchTerm: string) => {
        this.setState({ searchTerm });
    };

    submitSelection = () => {
        this.toggleSelector();
        this.clearSearchTerm();
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
                {isItemSelected ? (
                    <Ionicons
                        name={getPlatformIcon('checkmark-outline')}
                        style={styles.selectedSingleItemIcon}
                    />
                ) : null}
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
        const { isSingleSelection, hideTags, selectedItems, hideSubmitButton } = this.props;
        const showSelectedItems = !isSingleSelection && !hideTags && selectedItems.length;
        const additionalStyles = selectedItems.length ? styles.collapsedViewInfoLabel_itemSelected : {};
        return (
            <View>
                <View style={styles.dropdownView}>
                    <View style={styles.subSection}>
                        <TouchableWithoutFeedback onPress={this.toggleSelector}>
                            <View style={styles.collapsedViewInfoWrapper}>
                                <Text
                                    style={[styles.collapsedViewInfoLabel, additionalStyles]}
                                    numberOfLines={1}
                                >
                                    {this.selectionDisplayLabel}
                                </Text>
                                <Ionicons
                                    name={hideSubmitButton ? getPlatformIcon('caret-forward') : getPlatformIcon('caret-down')}
                                    style={styles.indicator}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                {showSelectedItems ? this.renderSelectedItemsTags() : null}
            </View>
        );
    }

    render() {
        const { isMultiSelectExpanded } = this.state;
        return isMultiSelectExpanded ? this._renderExpandedMultiSelectView() : this._renderCollapsedMultiSelectView();
    }
}
