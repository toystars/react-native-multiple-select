import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import PropTypes from 'prop-types';
import reject from 'lodash/reject';
import find from 'lodash/find';
import get from 'lodash/get';
import { InputGroup, Input, Icon } from 'native-base';
import IconMd from 'react-native-vector-icons/MaterialIcons';

// set UIManager LayoutAnimationEnabledExperimental
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

import styles, { colorPack } from './styles';

export default class MultiSelect extends Component {
  static propTypes = {
    single: PropTypes.bool,
    selectedItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    uniqueKey: PropTypes.string,
    tagBorderColor: PropTypes.string,
    tagTextColor: PropTypes.string,
    fontFamily: PropTypes.string,
    tagRemoveIconColor: PropTypes.string,
    onSelectedItemsChange: PropTypes.func.isRequired,
    selectedItemFontFamily: PropTypes.string,
    selectedItemTextColor: PropTypes.string,
    itemFontFamily: PropTypes.string,
    itemTextColor: PropTypes.string,
    selectedItemIconColor: PropTypes.string,
    searchInputPlaceholderText: PropTypes.string,
    searchInputStyle: PropTypes.object,
    selectText: PropTypes.string,
    altFontFamily: PropTypes.string,
    submitButtonColor: PropTypes.string,
    submitButtonText: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    fixedHeight: PropTypes.bool,
  };

  static defaultProps = {
    single: false,
    selectedItems: [],
    items: [],
    uniqueKey: '_id',
    tagBorderColor: colorPack.primary,
    tagTextColor: colorPack.primary,
    fontFamily: '',
    tagRemoveIconColor: colorPack.danger,
    onSelectedItemsChange: () => {},
    selectedItemFontFamily: '',
    selectedItemTextColor: colorPack.primary,
    itemFontFamily: '',
    itemTextColor: colorPack.textPrimary,
    selectedItemIconColor: colorPack.primary,
    searchInputPlaceholderText: 'Search',
    searchInputStyle: { color: colorPack.textPrimary },
    textColor: colorPack.textPrimary,
    selectText: 'Select',
    altFontFamily: '',
    submitButtonColor: '#CCC',
    submitButtonText: 'Submit',
    fontSize: 14,
    fixedHeight: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      selector: false,
      searchTerm: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('Component Updating: ', nextProps.selectedItems);
    return true;
  };

  _findItem = (itemKey) => {
    const { 
      items,
      uniqueKey,
    } = this.props;
    return find(items, singleItem => (
      singleItem[uniqueKey] === itemKey
    )) || {};
  };

  _getSelectLabel = () => {
    const { 
      selectText, 
      single,
      items,
      selectedItems,
      uniqueKey,
    } = this.props;
    if (!selectedItems || selectedItems.length === 0) {
      return selectText;
    } else if (single) {
      const item = selectedItems[0];
      const foundItem = this._findItem(item);
      return get(foundItem, 'name') || selectText
    }
    return `${selectText} (${selectedItems.length} selected)`;
  };

  _displaySelectedItems = () => {
    const { 
      fontFamily, 
      tagRemoveIconColor, 
      tagBorderColor, 
      uniqueKey, 
      tagTextColor,
      selectedItems,
    } = this.props;
    return selectedItems.map(singleSelectedItem => {
      const item = this._findItem(singleSelectedItem);
      return (
        <View
          style={[
            styles.selectedItem,
            {
              width: item.name.length * 8 + 60,
              justifyContent: 'center',
              height: 40,
              borderColor: tagBorderColor,
            },
          ]}
          key={item[uniqueKey]}
        >
          <Text
            style={[
              {
                flex: 1,
                color: tagTextColor,
                fontSize: 15,
              },
              fontFamily ? { fontFamily } : {},
            ]}
          >
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => { this._removeItem(item); }}>
            <IconMd
              name="cancel"
              style={{
                color: tagRemoveIconColor,
                fontSize: 22,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      )
    });
  };

  _removeItem = (item) => {
    const {
      uniqueKey,
      selectedItems,
      onSelectedItemsChange,
    } = this.props;
    const newItems = reject(selectedItems, singleItem => (
      item[uniqueKey] === singleItem
    ));
    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems);
  };

  _removeAllItems = () => {
    const { onSelectedItemsChange } = this.props;
    // broadcast new selected items state to parent component
    onSelectedItemsChange([]);
  };

  _toggleSelector = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      selector: !this.state.selector,
    });
  };

  _submitSelection = () => {
    const { onSelectedItemsChange } = this.props;
    this._toggleSelector();
    // reset searchTerm
    this.setState({ searchTerm: '' });
  };

  _itemSelected = (item) => {
    const { uniqueKey, selectedItems } = this.props;
    return (
      !!find(selectedItems, singleItem => (
        item[uniqueKey] === singleItem
      ))
    );
  }

  _toggleItem = (item) => {
    const { 
      single, 
      uniqueKey,
      selectedItems,
      onSelectedItemsChange,
    } = this.props;
    if (single) {
      this._submitSelection();
      onSelectedItemsChange([item[uniqueKey]]);
    } else {
      const status = this._itemSelected(item);
      let newItems = [];
      if (status) {
        newItems = reject(selectedItems, singleItem => (
          item[uniqueKey] === singleItem
        ));
      } else {
        newItems = [...selectedItems, item[uniqueKey]];
      }
      // broadcast new selected items state to parent component
      onSelectedItemsChange(newItems);
    }
  };

  _itemStyle = (item) => {
    const { 
      selectedItemFontFamily,
      selectedItemTextColor,
      itemFontFamily,
      itemTextColor,
    } = this.props;
    const isSelected = this._itemSelected(item);
    const fontFamily = {};
    if (isSelected && selectedItemFontFamily) {
      fontFamily.fontFamily = selectedItemFontFamily;
    } else if (!isSelected && itemFontFamily) {
      fontFamily.fontFamily = itemFontFamily;
    }
    const color = isSelected ? { color: selectedItemTextColor } : { color: itemTextColor };
    return {
      ...fontFamily,
      ...color,
    };
  };

  _getRow = (item) => {
    const { selectedItemIconColor } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this._toggleItem(item)}
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                {
                  flex: 1,
                  fontSize: 16,
                  paddingTop: 5,
                  paddingBottom: 5,
                },
                this._itemStyle(item),
              ]}
            >
              {item.name}
            </Text>
            {
              this._itemSelected(item) ?
                <IconMd
                  name="check"
                  style={{
                    fontSize: 20,
                    color: selectedItemIconColor,
                  }}
                /> :
                null
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _filterItems = (searchTerm) => {
    const { items } = this.props;
    const filteredItems = [];
    items.forEach((item) => {
      const parts = searchTerm.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join('|')})`, 'ig');
      if (regex.test(get(item, 'name'))) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  _renderItems = () => {
    const {
      items,
      fontFamily, 
      uniqueKey, 
      selectedItems,
    } = this.props;
    const { searchTerm } = this.state;
    let component = null;
    const renderItems = searchTerm ? this._filterItems(searchTerm.trim()) : items;
    if (renderItems.length) {
      component = (
        <FlatList
          data={renderItems}
          extraData={selectedItems}
          keyExtractor={item => item[uniqueKey]}
          renderItem={rowData => this._getRow(rowData.item)}
        />
      );
    } else {
      component = (
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text
            style={[
              {
                flex: 1,
                marginTop: 20,
                textAlign: 'center',
                color: colorPack.danger,
              },
              fontFamily ? { fontFamily } : {},
            ]}
          >
            No item to display.
          </Text>
        </View>
      );
    }
    return component;
  };

  render() {
    const {
      selectedItems,
      single,
      fontFamily, 
      altFontFamily,
      searchInputPlaceholderText,
      searchInputStyle,
      submitButtonColor,
      submitButtonText,
      fontSize,
      textColor,
      fixedHeight,
    } = this.props;
    const { selector } = this.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginBottom: 10,
        }}
      >
        {
          selector
          ?
            <View style={styles.selectorView(fixedHeight)}>
              <View>
                <InputGroup
                  style={{
                    paddingLeft: 16,
                    backgroundColor: colorPack.light,
                  }}
                >
                  <Icon
                    name="ios-search"
                    style={{ fontSize: 20, color: colorPack.placeholderTextColor }}
                  />
                  <Input
                    onChangeText={searchTerm => this.setState({ searchTerm })}
                    placeholder={searchInputPlaceholderText}
                    placeholderTextColor={colorPack.placeholderTextColor}
                    style={searchInputStyle}
                  />
                </InputGroup>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#fafafa',
                }}
              >
                <View>
                  {this._renderItems()}
                </View>
                {
                  !single && 
                  <TouchableOpacity
                    onPress={() => this._submitSelection()}
                    style={[styles.button, { backgroundColor: submitButtonColor }]}
                  >
                    <Text
                      style={[styles.buttonText, fontFamily ? { fontFamily } : {}]}
                    >
                      {submitButtonText}
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
            :
            <View>
              <View style={styles.dropdownView}>
                <View style={[styles.subSection, { paddingTop: 10, paddingBottom: 10 }]}>
                  <TouchableWithoutFeedback onPress={this._toggleSelector}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={[
                          {
                            flex: 1,
                            fontSize: fontSize || 16,
                            color:  textColor || colorPack.placeholderTextColor,
                          },
                          altFontFamily ? { fontFamily: altFontFamily } : fontFamily ? { fontFamily } : {},
                        ]}
                      >
                        {this._getSelectLabel()}
                      </Text>
                      <IconMd
                        name="arrow-drop-down"
                        style={styles.indicator}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {
                (!single && selectedItems.length) ?
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                  >
                    {this._displaySelectedItems()}
                  </View>
                  :
                  null
              } 
            </View>
        }
      </View>
    );
  }
}
