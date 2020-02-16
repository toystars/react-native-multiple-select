import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SearchIcon } from '../search-icon';
import { getPlatformIcon } from '../../utils';
import { ColorsPack } from '../../styles/colors.enum';
import styles from './styles';

interface Props {
    searchTerm: string;
    hideSubmitButton: boolean;
    singleSelection: boolean;
    onChangeSearchTerm: (searchTerm: string) => void;
    onSubmitEditing: () => void;
    onSubmitButtonPress: () => void;
    children: React.ReactElement;
}

export class ExpandedMultiSelectView extends React.Component<Props> {
    render() {
        const {
            searchTerm,
            hideSubmitButton,
            singleSelection,
            onChangeSearchTerm,
            onSubmitEditing,
            onSubmitButtonPress,
            children
        } = this.props;
        const showSubmitButton = !singleSelection && !hideSubmitButton;
        return (
            <View style={styles.container}>
                <View style={styles.inputGroup}>
                    <SearchIcon />
                    <TextInput
                        autoFocus
                        onChangeText={(searchTerm: string) => onChangeSearchTerm(searchTerm)}
                        onSubmitEditing={() => onSubmitEditing()}
                        placeholder="Search"
                        placeholderTextColor={ColorsPack.placeholderTextColor}
                        underlineColorAndroid="transparent"
                        style={styles.searchInput}
                        value={searchTerm}
                    />
                    {hideSubmitButton ? (
                        <TouchableOpacity onPress={onSubmitButtonPress}>
                            <Ionicons
                                name={getPlatformIcon('caret-down-outline')}
                                style={styles.indicator}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
                <View style={styles.expandedItemsContainer}>
                    {children}
                    {showSubmitButton ? (
                        <TouchableOpacity onPress={onSubmitButtonPress} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        );
    }
}
