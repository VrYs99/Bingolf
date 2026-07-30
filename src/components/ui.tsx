import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { images } from '../theme/assets';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function ScreenBackground({ children, style }: Props) {
  return (
    <ImageBackground source={images.bgGolf} style={[styles.bg, style]} resizeMode="cover">
      <View style={styles.tint}>{children}</View>
    </ImageBackground>
  );
}

type PanelProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function GlassPanel({ children, style }: PanelProps) {
  return (
    <LinearGradient
      colors={[colors.glassPanelFrom, colors.glassPanelMid, colors.glassPanelTo]}
      locations={[0, 0.64, 1]}
      style={[styles.panel, style]}
    >
      <BlurView intensity={25} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.panelContent}>{children}</View>
    </LinearGradient>
  );
}

export function GreenButton({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <LinearGradient
      colors={[colors.greenFrom, colors.greenTo]}
      style={[styles.greenBtn, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
  },
  tint: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  panel: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  panelContent: {
    padding: 12,
  },
  greenBtn: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.greenTo,
    alignItems: 'center',
    justifyContent: 'center',
  },
});