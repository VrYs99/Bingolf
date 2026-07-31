import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '../theme/assets';
import { colors } from '../theme/colors';

type Props = {
  number: number | string;
  size?: number;
};

export function NumberBadge({ number, size = 36 }: Props) {
  const fontSize = size >= 48 ? 16 : size >= 32 ? 12 : 10;
  const badgeSize = Math.round(size * 0.58);
  const badgeOffset = (size - badgeSize) / 2;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image
        source={images.golfBall}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      <View
        style={[
          styles.badge,
          {
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
            top: badgeOffset,
            left: badgeOffset,
          },
        ]}
      >
        <Text style={[styles.text, { fontSize }]} numberOfLines={1}>
          {number}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  badge: {
    position: 'absolute',
    backgroundColor: colors.greenFrom,
    borderWidth: 1,
    borderColor: colors.greenTo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
