import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPlatformIcon } from '../../utils';
import { ColorsPack } from '../../styles/colors.enum';
import styles from './styles';

export const SearchIcon = React.memo(() => (
    <Ionicons
        name={getPlatformIcon('search-outline')}
        size={20}
        color={ColorsPack.placeholderTextColor}
        style={styles.searchIcon}
    />
));
