import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ListView
} from 'react-native';
import _ from 'underscore';
import { InputGroup, Input, Icon} from 'native-base';
import IconMd from 'react-native-vector-icons/MaterialIcons';

const colorPack = {
  primary: '#00A5FF',
  primaryDark: '#215191',
  light: '#FFF',
  textPrimary: '#525966',
  placeholderTextColor: '#A9A9A9',
  danger: '#C62828'
};

export default class MultiSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      selector: false,
      searchTerm: '',
      selectedItems: this.props.selectedItems ? this.props.selectedItems : [],
      items: this.props.items ? this.props.items : []
    };

    this._displaySelectedItems = this._displaySelectedItems.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._toggleSelector = this._toggleSelector.bind(this);
    this._submitSelection = this._submitSelection.bind(this);
    this._renderItems = this._renderItems.bind(this);
    this._getRow = this._getRow.bind(this);
    this._itemSelected = this._itemSelected.bind(this);
    this._itemStyle = this._itemStyle.bind(this);
    this._toggleItem = this._toggleItem.bind(this);
    this._filterItems = this._filterItems.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
  }

  _displaySelectedItems() {
    let selectedItems = [...this.state.selectedItems];
    return selectedItems.map(item => {
      return (
        <View
          style={[styles.selectedItem, {borderColor: this.props.tagBorderColor ? this.props.tagBorderColor : colorPack.primary}]}
          key={item[this.props.uniqueKey]}>
          <Text style={{
            flex: 1,
            color: this.props.tagTextColor ? this.props.tagTextColor : colorPack.primary,
            fontFamily: this.props.fontFamily ? this.props.fontFamily : '',
            fontSize: 15}}>{item.name}</Text>
          <TouchableOpacity onPress={() => { this._removeItem(item) }}>
            <IconMd name='cancel' style={{
              color: this.props.tagRemoveIconColor ? this.props.tagRemoveIconColor : colorPack.danger,
              fontSize: 22,
              marginLeft: 10}} />
          </TouchableOpacity>
        </View>
      );
    });
  }

  _removeItem(item) {
    let selectedItems = [...this.state.selectedItems];
    let newItems = _.reject(selectedItems, singleItem => {
      return item[this.props.uniqueKey] === singleItem[this.props.uniqueKey]
    });
    this.setState({
      selectedItems: newItems
    });
    // broadcast new selected items state to parent component
    this.props.selectedItemsChange(newItems);
  }

  removeAllItems() {
  	this.setState({
  		selectedItems: []
		});
  	this.props.selectedItemsChange([]);
  }

  _toggleSelector() {
    this.setState({
      selector: !this.state.selector
    });
  }

  _submitSelection() {
    this._toggleSelector();
    // reset searchTerm
    this.setState({ searchTerm: '' });
    // broadcast selected items state to parent component
    this.props.selectedItemsChange([...this.state.selectedItems]);
  }

  _itemSelected(item) {
    return !!_.find(this.state.selectedItems, singleItem => {
      return item[this.props.uniqueKey] === singleItem[this.props.uniqueKey];
    });
  }

  _toggleItem(item) {
    let selectedItems = [...this.state.selectedItems];
    let status = this._itemSelected(item);
    let newItems = [];
    if (status) {
      newItems = _.reject(selectedItems, singleItem => {
        return item[this.props.uniqueKey] === singleItem[this.props.uniqueKey]
      });
    } else {
      selectedItems.push(item);
    }
    this.setState({
      selectedItems: status ? newItems : selectedItems
    });
  }

  _itemStyle(item) {
    return this._itemSelected(item) ? {
      fontFamily: this.props.selectedItemFontFamily ? this.props.selectedItemFontFamily : '',
      color: this.props.selectedItemTextColor ? this.props.selectedItemTextColor : colorPack.primary
    } : {
      fontFamily: this.props.itemFontFamily ? this.props.itemFontFamily : '',
      color: this.props.itemTextColor ? this.props.itemTextColor : colorPack.textPrimary
    };
  }

  _getRow(item) {
    return (
      <TouchableOpacity onPress={() => this._toggleItem(item)} style={{paddingLeft: 20, paddingRight: 20}}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[{flex: 1, fontSize: 16, paddingTop: 5, paddingBottom: 5}, this._itemStyle(item)]}>{item.name}</Text>
            {this._itemSelected(item) ? <IconMd name='check' style={{
              fontSize: 20,
              color: this.props.selectedItemIconColor ? this.props.selectedItemIconColor : colorPack.primary}} /> : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _filterItems(searchTerm) {
    var items = [...this.state.items];
    var filteredItems = [];
    items.forEach(item => {
      var parts = searchTerm.trim().split(/[ \-\:]+/);
      var regex = new RegExp("(" + parts.join('|') + ")", "ig");
      if (regex.test(item.name)) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  }

  _renderItems() {

    let items;
    let component = null;
    let searchTerm = this.state.searchTerm.trim();
    if (searchTerm) {
      items = this._filterItems(searchTerm);
    } else {
      items = this.state.items;
    }

    if (items.length) {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let dataSource = ds.cloneWithRows(items);
      component = <ListView
        enableEmptySections={true}
        dataSource={dataSource}
        renderRow={(rowData) =>  this._getRow(rowData)}
      />;
    } else {
      component = <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex: 1, marginTop: 20, textAlign: 'center', fontFamily: 'ProximaNova-Regular', color: colorPack.danger}}>
          No item to display.
        </Text>
      </View>;
    }

    return component;
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', marginBottom: 10}}>
        {
          this.state.selector
          ?
          <View style={{flexDirection: 'column', borderRadius: 5, borderWidth: 1, borderColor: '#e9e9e9', marginBottom: 10, elevation: 2, height: 250}}>
            <InputGroup style={{paddingLeft: 16, backgroundColor: colorPack.light}}>
              <Icon name='ios-search' style={{fontSize: 20, color: colorPack.placeholderTextColor}}/>
              <Input
                onChangeText={searchTerm => this.setState({searchTerm})}
                placeholder={this.props.searchInputPlaceholderText || 'Search'}
                placeholderTextColor={colorPack.placeholderTextColor}
                style={this.props.searchInputStyle ? this.props.searchInputStyle : {color: colorPack.textPrimary}} />
            </InputGroup>
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fafafa'}}>
              {this._renderItems()}
            </View>
            <TouchableOpacity
              onPress={() => this._submitSelection()}
              style={styles.button}>
              <Text style={[styles.buttonText, {fontFamily: this.props.fontFamily ? this.props.fontFamily : ''}]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', height: 40, marginBottom: 10}}>
              <View style={[styles.subSection, {paddingTop: 10, paddingBottom: 10}]}>
                <TouchableWithoutFeedback onPress={this._toggleSelector}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                      flex: 1,
                      fontFamily: this.props.altFontFamily ? this.props.altFontFamily : this.props.fontFamily ? this.props.fontFamily : '',
                      fontSize: 16, color: colorPack.placeholderTextColor}}>
                      {this.props.selectText || 'Select'}
                    </Text>
                    <IconMd name='arrow-drop-down' style={styles.indicator}/>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>

            {this.state.selectedItems.length
              ?
              <ScrollView
                horizontal={false}
                style={styles.footerWrapperNC}
                contentContainerStyle={[styles.footerWrapper]}>
                {this._displaySelectedItems()}
              </ScrollView>
              :
              null}
          </View>
        }
      </View>
    );
  }
};


var styles = StyleSheet.create({
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  footerWrapperNC: {
    width: 320,
    flexDirection:'column',
  },
  subSection: {
    backgroundColor: colorPack.light,
    borderBottomWidth: 1,
    borderColor: '#e9e9e9',
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  greyButton: {
    height: 40,
    borderRadius: 5,
    elevation: 0,
    backgroundColor: '#b1b1b1'
  },
  indicator: {
    fontSize: 30,
    color: colorPack.placeholderTextColor
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    margin: 3,
    borderRadius: 20,
    borderWidth: 2
  },
  button: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPack.primary,
  },
  buttonText: {
    color: colorPack.light,
    fontSize: 14
  }
});
