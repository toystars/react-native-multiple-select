import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPlatformIcon } from '../../utils';
import { MultiSelectItem } from '../../types';
import styles from './styles';

interface Props {
    item: MultiSelectItem;
    removeItem: (item: MultiSelectItem) => void;
}

export const SelectedItemTag = React.memo(({ item, removeItem }: Props) => {
    const extraTagStyle = { width: item.title.length * 8 + 60 };
    return (
        <View style={[styles.selectedItemTagWrapper, extraTagStyle]}>
            <Text style={styles.selectedItemTagLabel} numberOfLines={1}>
                {item.title}
            </Text>
            <TouchableOpacity onPress={() => removeItem(item)}>
                <Ionicons
                    name={getPlatformIcon('close-circle')}
                    style={styles.selectedItemTagIcon}
                />
            </TouchableOpacity>
        </View>
    );
});
