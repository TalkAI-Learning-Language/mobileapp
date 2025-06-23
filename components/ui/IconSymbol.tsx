import { StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconSymbolProps {
  name: string;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}

export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
  // Map SF Symbol names to Ionicons names
  const getIoniconName = (sfSymbolName: string) => {
    const iconMap: { [key: string]: string } = {
      'house.fill': 'home',
      'creditcard.fill': 'card',
      'clock.fill': 'time',
      'info.circle.fill': 'information-circle',
      'person.fill': 'person',
      'person.circle.fill': 'person-circle',
      'gear': 'settings',
      // Add more mappings as needed
    };
    return iconMap[sfSymbolName] || sfSymbolName;
  };

  return (
    <Ionicons
      name={getIoniconName(name) as any}
      size={size}
      color={color}
    />
  );
}