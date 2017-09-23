import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ListView,
} from 'react-native';
import PropTypes from 'prop-types';
import reject from 'lodash/reject';
import find from 'lodash/find';
import { InputGroup, Input, Icon } from 'native-base';
import IconMd from 'react-native-vector-icons/MaterialIcons';

import styles, { colorPack } from './styles';

export default class MultiSelect extends Component {
  static propTypes = {
    selectedItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    uniqueKey: PropTypes.string,
    tagBorderColor: PropTypes.string,
    tagTextColor: PropTypes.string,
    fontFamily: PropTypes.string,
    tagRemoveIconColor: PropTypes.string,
    selectedItemsChange: PropTypes.func.isRequired,
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
  };

  static defaultProps = {
    selectedItems: [],
    items: [],
    uniqueKey: '_id',
    tagBorderColor: colorPack.primary,
    tagTextColor: colorPack.primary,
    fontFamily: '',
    tagRemoveIconColor: colorPack.danger,
    selectedItemsChange: () => {},
    selectedItemFontFamily: '',
    selectedItemTextColor: colorPack.primary,
    itemFontFamily: '',
    itemTextColor: colorPack.textPrimary,
    selectedItemIconColor: colorPack.primary,
    searchInputPlaceholderText: 'Search',
    searchInputStyle: { color: colorPack.textPrimary },
    selectText: 'Select',
    altFontFamily: '',
    submitButtonColor: '#CCC',
    submitButtonText: 'Submit',
  };

  constructor(props) {
    super(props);
    this.state = {
      selector: false,
      searchTerm: '',
      selectedItems: this.props.selectedItems,
      items: this.props.items,
    };
  }

  _displaySelectedItems = () => {
    const { fontFamily, tagRemoveIconColor } = this.props;
    const selectedItems = [...this.state.selectedItems];
    return selectedItems.map(item => (
      <View
        style={[
          styles.selectedItem,
          {
            width: item.name.length * 8 + 60,
            justifyContent: 'center',
            height: 40,
            borderColor: this.props.tagBorderColor,
          },
        ]}
        key={item[this.props.uniqueKey]}
      >
        <Text
          style={[
            {
              flex: 1,
              color: this.props.tagTextColor,
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
    ));
  };

  _removeItem = (item) => {
    const selectedItems = [...this.state.selectedItems];
    const newItems = reject(selectedItems, singleItem => (
      item[this.props.uniqueKey] === singleItem[this.props.uniqueKey]
    ));
    this.setState({
      selectedItems: newItems,
    });
    // broadcast new selected items state to parent component
    this.props.selectedItemsChange(newItems);
  };

  _removeAllItems = () => {
    this.setState({
      selectedItems: [],
    });
    this.props.selectedItemsChange([]);
  };

  _toggleSelector = () => {
    this.setState({
      selector: !this.state.selector,
    });
  };

  _submitSelection = () => {
    this._toggleSelector();
    // reset searchTerm
    this.setState({ searchTerm: '' });
    // broadcast selected items state to parent component
    this.props.selectedItemsChange([...this.state.selectedItems]);
  };

  _itemSelected = item => (
    !!find(this.state.selectedItems, singleItem => (
      item[this.props.uniqueKey] === singleItem[this.props.uniqueKey]
    ))
  );

  _toggleItem = (item) => {
    const selectedItems = [...this.state.selectedItems];
    const status = this._itemSelected(item);
    let newItems = [];
    if (status) {
      newItems = reject(selectedItems, singleItem => (
        item[this.props.uniqueKey] === singleItem[this.props.uniqueKey]
      ));
    } else {
      selectedItems.push(item);
    }
    this.setState({
      selectedItems: status ? newItems : selectedItems,
    });
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

  _getRow = item => (
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
                  color: this.props.selectedItemIconColor,
                }}
              /> :
              null
          }
        </View>
      </View>
    </TouchableOpacity>
  );

  _filterItems = (searchTerm) => {
    const items = [...this.state.items];
    const filteredItems = [];
    items.forEach((item) => {
      const parts = searchTerm.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join('|')})`, 'ig');
      if (regex.test(item.name)) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  _renderItems = () => {
    const { fontFamily } = this.props;
    let items;
    let component = null;
    const searchTerm = this.state.searchTerm.trim();
    if (searchTerm) {
      items = this._filterItems(searchTerm);
    } else {
      items = this.state.items;
    }

    if (items.length) {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      const dataSource = ds.cloneWithRows(items);
      component = (
        <ListView
          enableEmptySections
          dataSource={dataSource}
          renderRow={rowData => this._getRow(rowData)}
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
    const { fontFamily, altFontFamily } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginBottom: 10,
        }}
      >
        {
          this.state.selector
          ?
            <View style={styles.selectorView}>
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
                  placeholder={this.props.searchInputPlaceholderText}
                  placeholderTextColor={colorPack.placeholderTextColor}
                  style={this.props.searchInputStyle}
                />
              </InputGroup>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: '#fafafa',
                }}
              >
                {this._renderItems()}
              </View>
              <TouchableOpacity
                onPress={() => this._submitSelection()}
                style={[styles.button, { backgroundColor: this.props.submitButtonColor }]}
              >
                <Text
                  style={[styles.buttonText, fontFamily ? { fontFamily } : {}]}
                >
                  {this.props.submitButtonText}
                </Text>
              </TouchableOpacity>
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
                            fontSize: 16,
                            color: colorPack.placeholderTextColor,
                          },
                          altFontFamily ? { fontFamily: altFontFamily } : fontFamily ? { fontFamily } : {},
                        ]}
                      >
                        {this.props.selectText} ( { this.state.selectedItems.length } selected )
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
                this.state.selectedItems.length ?
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
