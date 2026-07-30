import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '../theme/assets';
import { colors } from '../theme/colors';

type Props = {
  number: number | string;
  size?: number;
};

export function NumberBadge({ number, size = 36 }: Props) {
  const fontSize = size > 40 ? 22 : size > 28 ? 14 : 11;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image source={images.golfBall} style={StyleSheet.absoluteFill} />
      <View style={[styles.badge, { width: size * 0.58, height: size * 0.58, borderRadius: size }]}>
        <Text style={[styles.text, { fontSize }]}>{number}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: colors.greenFrom,
    borderWidth: 1,
    borderColor: colors.greenTo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});