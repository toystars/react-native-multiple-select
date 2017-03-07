# react-native-multiple-select

> Simple multi-select component for react-native (Select2 for react-native).


## Screenshots

<img src="https://cloud.githubusercontent.com/assets/16062709/21911762/84c8453e-d922-11e6-97f3-7ae5c10fccb9.png" width="350">  <img src="https://cloud.githubusercontent.com/assets/16062709/21911761/84c7aca0-d922-11e6-9299-466df4b20e20.png" width="350">
<img src="https://cloud.githubusercontent.com/assets/16062709/21911764/84cbf1ac-d922-11e6-8779-e772f3d83fd9.png" width="350">  <img src="https://cloud.githubusercontent.com/assets/16062709/21911763/84cb5b8e-d922-11e6-839b-c1ddd349c8c6.png" width="350">
<img src="https://cloud.githubusercontent.com/assets/16062709/21911765/84d0cd94-d922-11e6-84be-8dee40b2c2c1.png" width="350"> 



## Installation

``` bash
$ npm install react-native-multiple-select --save
```

## Usage
Note: Ensure to add and configure [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) to your project before using this package.

The snippet below shows how the component can be used


```javascript
// import component
import MultiSelect from 'react-native-multiple-select';

let items = [{
    id: '92iijs7yta',
    name: 'First Item'
}, {
   id: 'a0s0a8ssbsd',
   name: 'Second Item'
}, {
   id: '16hbajsabsd',
   name: 'Third Item'
}, {
   id: 'nahs75a5sg',
   name: 'Fourth Item'
}, {
    id: '667atsas',
    name: 'Fifth Item'
 }];
 
let selectedItem = selectedItems => {
    // do something with selectedItems
    console.log(selectedItems);
};

<MultiSelect
    items={items}
    uniqueKey="_id"
    selectedItemsChange={selectedItem}
    selectedItems={[]}
    selectText="Pick Items (Selected)"
    searchInputPlaceholderText="Search Items..."
    fontFamily="ProximaNova-Regular"
    altFontFamily="ProximaNova-Light"
    tagRemoveIconColor="#000FFF"
    tagBorderColor="#CCC"
    tagTextColor="#CCC"
    selectedItemFontFamily="ProximaNova-Semibold"
    selectedItemTextColor="#CCC"
    selectedItemIconColor="#CCC"
    itemFontFamily="ProximaNova-Regular"
    itemTextColor="#000"
    searchInputStyle={{fontFamily: 'ProximaNova-Regular', color: '#CCC'}}  />
    
```

The component takes 3 compulsory props - `items`, `uniqueKey` and `selectedItemsChange`. Other props are optional. The table below explains more.


## Props

| Prop        | Required   | Purpose  |
| ------------- |-------------| -----|
| items      | Yes | List of items to display in the multi-select component. JavaScript Array of objects. Each object must contain a name and unique identifier (Check sample above) |
| uniqueKey      | Yes      |   Unique identifier that is part of each item's properties. Used internally as means of identifying each item (Check sample below) |
| selectedItemsChange | Yes      |JavaScript function passed in as an argument. The function is to be defined with an argument (selectedItems). The function is called whenever items are added or removed in the component. (Check sample above) |
|selectedItems | No      | List of selected items. JavaScript Array of objects that is part of the items (check above), that cna be instantiated with the component |
| selectText | No     | Text displayed in main component |
| searchInputPlaceholderText | No      | Placeholder text displayed in multi-select filter input |
| fontFamily | No     | Custom font family to be used in component (affects all text except `searchInputPlaceholderText` described above) |
| altFontFamily | No      | Font family for `searchInputPlaceholderText` |
| tagRemoveIconColor | No      | Color to be used for the remove icon in selected items list |
| tagBorderColor | No      | Border color for each selected item  |
| tagTextColor | No  | Text color for selected items list |
| selectedItemFontFamily | No   | Font family for each selected item in multi-select drop-down |
| selectedItemTextColor | No   |  Text color for each selected item in multi-select drop-down |
| selectedItemIconColor | No     | Color for `selected` check icon for each selected item in multi-select drop-down |
| itemFontFamily | No   | Font family for each non-selected item in multi-select drop-down |
| itemTextColor | No   |  Text color for each non-selected item in multi-select drop-down |
| searchInputStyle | No   | Style object for multi-select input element  |


### Removing all selected items

To use, add ref to MultiSelect component in parent component, then call method against reference. i.e.

```javascript
<MultiSelect
  ref={c => this._multiSelect = c}
  ...
/>

clearSelectedCategories = () => {
   this._multiSelect.removeAllItems();
};
    
``` 


## Contributing

Contributions are **welcome** and will be fully **credited**.

Contributions are accepted via Pull Requests on [Github](https://github.com/toystars/react-native-multiple-select).


### Pull Requests

- **Document any change in behaviour** - Make sure the `README.md` and any other relevant documentation are kept up-to-date.

- **Consider our release cycle** - We try to follow [SemVer v2.0.0](http://semver.org/). Randomly breaking public APIs is not an option.

- **Create feature branches** - Don't ask us to pull from your master branch.

- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.

- **Send coherent history** - Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please [squash them](http://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages) before submitting.


## Issues

Check issues for current issues.

## Author

[Mustapha Babatunde](https://twitter.com/iAmToystars)
 

## License

The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.