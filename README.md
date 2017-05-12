# react-native-multiple-select

[![npm](https://img.shields.io/npm/v/react-native-multiple-select.svg)](https://www.npmjs.com/package/react-native-multiple-select) [![Downloads](https://img.shields.io/npm/dt/react-native-multiple-select.svg)](https://www.npmjs.com/package/react-native-multiple-select) [![Licence](https://img.shields.io/npm/l/react-native-multiple-select.svg)](https://www.npmjs.com/package/react-native-multiple-select)

> Simple multi-select component for react-native (Select2 for react-native).


## Screenshots
<img width="350" alt="screen shot 2017-05-13 at 12 04 57 am" src="https://cloud.githubusercontent.com/assets/16062709/26019755/df6cbf96-376f-11e7-84e4-e28677425563.png">  <img width="350" alt="screen shot 2017-05-13 at 12 03 53 am" src="https://cloud.githubusercontent.com/assets/16062709/26019739/b96373ee-376f-11e7-91d8-505dad416415.png">  <img width="350" alt="screen shot 2017-05-13 at 12 00 05 am" src="https://cloud.githubusercontent.com/assets/16062709/26019710/7735a636-376f-11e7-97b3-4c752316ffa5.png">  <img width="350" alt="screen shot 2017-05-13 at 12 00 25 am" src="https://cloud.githubusercontent.com/assets/16062709/26019708/773377bc-376f-11e7-92f1-6a64948db1ff.png">  <img width="350" alt="screen shot 2017-05-13 at 12 00 41 am" src="https://cloud.githubusercontent.com/assets/16062709/26019709/77357206-376f-11e7-91a5-06578172202d.png">  <img width="350" alt="screen shot 2017-05-13 at 12 02 46 am" src="https://cloud.githubusercontent.com/assets/16062709/26019722/8e31a146-376f-11e7-8d80-056a5b7d0887.png">



## Installation

``` bash
$ npm install react-native-multiple-select --save
```
or use yarn

``` bash
$ yarn add react-native-multiple-select
```


## Usage
Note: Ensure to add and configure [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) to your project before using this package.

The snippet below shows how the component can be used


```javascript
// import component
import MultiSelect from 'react-native-multiple-select';

const items = [{
  id: '92iijs7yta',
  name: 'Ondo',
}, {
  id: 'a0s0a8ssbsd',
  name: 'C2G',
}, {
  id: '16hbajsabsd',
  name: 'Calabar',
}, {
  id: 'nahs75a5sg',
  name: 'Fourth Item',
}, {
  id: '667atsas',
  name: 'Fifth Item',
}];
 
let selectedItem = selectedItems => {
    // do something with selectedItems
    console.log(selectedItems);
};

<MultiSelect
  items={items}
  uniqueKey="id"
  selectedItemsChange={selectedItem}
  selectedItems={[]}
  selectText="Pick Items"
  searchInputPlaceholderText="Search Items..."
  altFontFamily="ProximaNova-Light"
  tagRemoveIconColor="#CCC"
  tagBorderColor="#CCC"
  tagTextColor="#CCC"
  selectedItemTextColor="#CCC"
  selectedItemIconColor="#CCC"
  itemTextColor="#000"
  searchInputStyle={{ color: '#CCC' }}
  submitButtonColor="#CCC"
  submitButtonText="Submit"
/>
    
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
| submitButtonColor | No   | Background color for submit button  |
| submitButtonText | No   | Text displayed on submit button  |


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