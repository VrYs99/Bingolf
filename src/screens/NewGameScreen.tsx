import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomNav } from '../components/BottomNav';
import { NumberBadge } from '../components/NumberBadge';
import { GlassPanel, GreenButton, ScreenBackground } from '../components/ui';
import { DEFAULT_SETUP, type Difficulty } from '../data/solo';
import { images } from '../theme/assets';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NewGame'>;

const DIFFICULTIES: {
  key: Difficulty;
  range: string;
  colors: [string, string];
  border: string;
}[] = [
  {
    key: 'EASY',
    range: '21+',
    colors: [colors.greenFrom, colors.greenTo],
    border: colors.greenTo,
  },
  {
    key: 'MEDIUM',
    range: '20-11',
    colors: [colors.mediumFrom, colors.mediumTo],
    border: colors.mediumBorder,
  },
  {
    key: 'HARD',
    range: '10 or less',
    colors: [colors.hardFrom, colors.hardTo],
    border: colors.hardTo,
  },
];

const PREVIEW_CHALLENGES = [
  { number: 5, title: 'Fairway finder' },
  { number: 25, title: 'Green in regulation' },
  { number: 7, title: 'Clutch putt' },
];

export function NewGameScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_SETUP.difficulty);
  const [location, setLocation] = useState('');
  const [rounds, setRounds] = useState(DEFAULT_SETUP.rounds);
  const [holes, setHoles] = useState(DEFAULT_SETUP.holes);

  const startSolo = () => {
    navigation.navigate('Game', {
      setup: {
        mode: 'SOLO',
        difficulty,
        location: location.trim() || 'Local course',
        rounds: rounds || '1',
        holes: holes || '9',
      },
    });
  };

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <GlassPanel>
          <Text style={styles.title}>New game</Text>
          <Text style={styles.subtitle}>Difficulty</Text>
          <View style={styles.diffRow}>
            {DIFFICULTIES.map((item) => {
              const selected = difficulty === item.key;
              return (
                <Pressable
                  key={item.key}
                  style={styles.diffPress}
                  onPress={() => setDifficulty(item.key)}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  hitSlop={4}
                >
                  <LinearGradient
                    colors={item.colors}
                    style={[
                      styles.diffCard,
                      { borderColor: item.border },
                      selected ? styles.diffSelected : styles.diffUnselected,
                    ]}
                    pointerEvents="none"
                  >
                    <Text style={styles.diffRange}>{item.range}</Text>
                    <Text style={styles.diffLabel}>{item.key}</Text>
                    {selected ? <Text style={styles.diffCheck}>✓</Text> : null}
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
        </GlassPanel>

        <GlassPanel style={styles.locationPanel}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Location ..."
              placeholderTextColor="rgba(255,255,255,0.85)"
              value={location}
              onChangeText={setLocation}
            />
            <Image source={images.iconSearch} style={styles.searchIcon} />
          </View>
          <View style={styles.metaRow}>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>Rounds</Text>
              <TextInput
                style={styles.metaInput}
                keyboardType="number-pad"
                value={rounds}
                onChangeText={setRounds}
              />
            </View>
            <View style={styles.metaField}>
              <Text style={styles.metaLabel}>Holes</Text>
              <TextInput
                style={styles.metaInput}
                keyboardType="number-pad"
                value={holes}
                onChangeText={setHoles}
              />
            </View>
          </View>
        </GlassPanel>

        <GlassPanel>
          <View style={styles.challengeHeader}>
            <Text style={styles.sectionTitle}>Custom Challenge</Text>
            <GreenButton style={styles.plus}>
              <Text style={styles.plusText}>+</Text>
            </GreenButton>
          </View>
          {PREVIEW_CHALLENGES.map((item) => (
            <View key={item.number} style={styles.challengeRow}>
              <NumberBadge number={item.number} size={32} />
              <Text style={styles.challengeTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          ))}
        </GlassPanel>

        <Pressable onPress={startSolo}>
          <GreenButton style={styles.startBtn}>
            <Text style={styles.startText}>Start Solo</Text>
          </GreenButton>
        </Pressable>
      </ScrollView>

      <BottomNav onLobby={() => navigation.navigate('Lobby')} />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    gap: 14,
  },
  title: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 28,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 10,
  },
  diffRow: {
    flexDirection: 'row',
    gap: 8,
  },
  diffPress: {
    flex: 1,
  },
  diffCard: {
    height: 101,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'relative',
  },
  diffSelected: {
    opacity: 1,
    borderWidth: 3,
    transform: [{ scale: 1.02 }],
  },
  diffUnselected: {
    opacity: 0.72,
  },
  diffRange: {
    color: colors.greenDark,
    fontWeight: '700',
    fontSize: 14,
  },
  diffLabel: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  diffCheck: {
    position: 'absolute',
    top: 6,
    right: 8,
    color: colors.white,
    fontWeight: '900',
    fontSize: 14,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  locationPanel: {
    minHeight: 154,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glassWhite,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 43,
    height: 38,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  searchIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metaField: {
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  metaInput: {
    width: 65,
    height: 33,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: 'rgba(255,255,255,0.45)',
    color: colors.greenDark,
    fontWeight: '700',
    textAlign: 'center',
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
  plus: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  plusText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.glassWhite,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 9,
    minHeight: 49,
    height: 49,
    paddingHorizontal: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  challengeTitle: {
    flex: 1,
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  startBtn: {
    height: 48,
    borderRadius: 15,
  },
  startText: {
    color: colors.greenDark,
    fontWeight: '800',
    fontSize: 18,
  },
});