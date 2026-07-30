import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GreenButton } from './ui';
import { images } from '../theme/assets';
import { colors } from '../theme/colors';

type Props = {
  onLobby: () => void;
  onSettings?: () => void;
  primaryLabel?: string;
  onPrimary?: () => void;
};

export function BottomNav({
  onLobby,
  onSettings,
  primaryLabel,
  onPrimary,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <Pressable onPress={onLobby}>
        <GreenButton style={styles.btn}>
          <Text style={styles.label}>Lobby</Text>
          <Image source={images.iconLobby} style={styles.icon} />
        </GreenButton>
      </Pressable>

      {primaryLabel && onPrimary ? (
        <Pressable onPress={onPrimary}>
          <GreenButton style={[styles.btn, styles.primary]}>
            <Text style={styles.label}>{primaryLabel}</Text>
          </GreenButton>
        </Pressable>
      ) : null}

      <Pressable onPress={onSettings}>
        <GreenButton style={[styles.btn, styles.settings]}>
          <Text style={styles.label}>Settings</Text>
          <Image source={images.iconSettingsNav} style={styles.iconSettings} />
        </GreenButton>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: 'rgba(171,255,245,0.55)',
  },
  btn: {
    minWidth: 97,
    height: 42,
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 6,
  },
  settings: {
    minWidth: 118,
  },
  primary: {
    minWidth: 110,
  },
  label: {
    color: colors.greenDark,
    fontWeight: '700',
    fontSize: 15,
  },
  icon: {
    width: 18,
    height: 22,
    resizeMode: 'contain',
  },
  iconSettings: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});