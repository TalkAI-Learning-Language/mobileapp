import { Text, TextProps, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export type ThemedTextType = 'default' | 'defaultSemiBold' | 'title' | 'subtitle' | 'link';

interface ThemedTextProps extends TextProps {
  type?: ThemedTextType;
  children: React.ReactNode;
}

export function ThemedText({ type = 'default', style, ...props }: ThemedTextProps) {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[
        styles.default,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        { color: Colors[colorScheme ?? 'light'].text },
        type === 'link' && { color: Colors[colorScheme ?? 'light'].tint },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: 'System',
  },
  defaultSemiBold: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'System',
  },
  link: {
    fontSize: 16,
    fontFamily: 'System',
    textDecorationLine: 'underline',
  },
});