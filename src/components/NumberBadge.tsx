import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { images } from '../theme/assets';
import { colors } from '../theme/colors';

type Props = {
  number: number | string;
  size?: number;
};

export function NumberBadge({ number, size = 36 }: Props) {
  const badgeSize = Math.round(size * 0.62);
  const fontSize = badgeSize >= 28 ? 14 : badgeSize >= 20 ? 11 : 9;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image
        source={images.golfBall}
        style={styles.ball}
        resizeMode="contain"
      />
      <View
        style={[
          styles.badge,
          {
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
          },
        ]}
      >
        <Text
          allowFontScaling={false}
          style={[
            styles.text,
            {
              fontSize,
              lineHeight: fontSize,
              width: badgeSize,
              height: fontSize,
            },
          ]}
        >
          {String(number)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  ball: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greenFrom,
    borderWidth: 1,
    borderColor: colors.greenTo,
    overflow: 'hidden',
  },
  text: {
    color: colors.white,
    fontWeight: '800',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'ios' ? { marginTop: 0 } : { marginTop: -0.5 }),
    padding: 0,
  },
});
