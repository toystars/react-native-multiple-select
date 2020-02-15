import React from 'react';
import { Platform } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ColorsPack } from '../../styles/colors.enum';
import styles from './styles';

export const SearchIcon = React.memo(() => (
    <Ionicons
        name={Platform.OS === 'ios' ? 'ios-search-outline' : 'md-search-outline'}
        size={20}
        color={ColorsPack.placeholderTextColor}
        style={styles.searchIcon}
    />
));
