import { Platform } from 'react-native';

export const getPlatformIcon = (icon: string): string => {
    const platformPrefix = Platform.OS === 'ios' ? 'ios' : 'md';
    return `${platformPrefix}-${icon}`;
}
