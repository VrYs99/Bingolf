import { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomNav } from '../components/BottomNav';
import { NumberBadge } from '../components/NumberBadge';
import { GlassPanel, GreenButton, ScreenBackground } from '../components/ui';
import {
  createSoloCard,
  hasBingo,
  type BingoCell,
  type Challenge,
} from '../data/solo';
import { images } from '../theme/assets';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

export function GameScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { setup } = route.params;
  const initial = useMemo(() => createSoloCard(), []);
  const [cells, setCells] = useState<BingoCell[]>(initial.cells);
  const [challenges, setChallenges] = useState<Challenge[]>(initial.challenges);
  const [won, setWon] = useState(false);

  const markNumber = (number: number) => {
    const nextCells = cells.map((cell) =>
      cell.number === number ? { ...cell, marked: true } : cell,
    );
    setCells(nextCells);

    if (!won && hasBingo(nextCells)) {
      setWon(true);
      Alert.alert('BINGOLF!', `Solo ${setup.difficulty} gagné sur ${setup.location}`, [
        { text: 'Lobby', onPress: () => navigation.navigate('Lobby') },
        { text: 'Continuer' },
      ]);
    }
  };

  const completeChallenge = (challenge: Challenge) => {
    if (challenge.completed) return;
    setChallenges((prev) =>
      prev.map((c) => (c.id === challenge.id ? { ...c, completed: true } : c)),
    );
    markNumber(challenge.number);
  };

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 8, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.meta}>
          <Text style={styles.metaText}>
            Solo · {setup.difficulty} · {setup.holes} holes · {setup.location}
          </Text>
        </View>

        <View style={styles.bingoHeader}>
          <Text style={styles.bingoTitle}>BING</Text>
          <Image source={images.golfBall} style={styles.bingoBall} />
        </View>

        <ImageBackground
          source={images.bingoGridBg}
          style={styles.grid}
          imageStyle={styles.gridImage}
        >
          {cells.map((cell) => (
            <Pressable
              key={cell.id}
              style={[styles.cell, cell.marked && styles.cellMarked]}
              onPress={() => {
                if (cell.number === 'FREE' || cell.marked) return;
                markNumber(cell.number);
              }}
            >
              {cell.number === 'FREE' ? (
                <Image source={images.flag} style={styles.flag} />
              ) : cell.marked ? (
                <NumberBadge number={cell.number} size={48} />
              ) : (
                <Text style={styles.cellNumber}>{cell.number}</Text>
              )}
            </Pressable>
          ))}
        </ImageBackground>

        <Text style={styles.challengesTitle}>CHALLENGES</Text>
        <GlassPanel style={styles.challengesPanel}>
          {challenges.map((challenge) => (
            <View key={challenge.id} style={styles.challengeRow}>
              <View style={styles.letterBubble}>
                <Text style={styles.letter}>{challenge.letter}</Text>
              </View>
              <NumberBadge number={challenge.number} size={30} />
              <Text style={styles.challengeText} numberOfLines={1}>
                {challenge.title}
              </Text>
              <Pressable
                disabled={challenge.completed}
                onPress={() => completeChallenge(challenge)}
              >
                <GreenButton
                  style={[
                    styles.completeBtn,
                    challenge.completed && styles.completeDone,
                  ]}
                >
                  <Text style={styles.completeText}>
                    {challenge.completed ? 'Done' : 'Complete'}
                  </Text>
                </GreenButton>
              </Pressable>
            </View>
          ))}
        </GlassPanel>
      </ScrollView>

      <BottomNav onLobby={() => navigation.navigate('Lobby')} />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  meta: {
    alignSelf: 'stretch',
    marginBottom: 8,
  },
  metaText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bingoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  bingoTitle: {
    color: colors.greenFrom,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 4,
    textShadowColor: colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  bingoBall: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  grid: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: colors.white,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 6,
  },
  gridImage: {
    borderRadius: 21,
  },
  cell: {
    width: '20%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  cellMarked: {
    backgroundColor: 'rgba(72,255,154,0.25)',
    borderRadius: 10,
  },
  cellNumber: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  flag: {
    width: 42,
    height: 54,
    resizeMode: 'contain',
  },
  challengesTitle: {
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    color: colors.greenFrom,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  challengesPanel: {
    width: '100%',
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.glassWhite,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 9,
    minHeight: 40,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  letterBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: colors.greenDark,
    fontWeight: '800',
    fontSize: 12,
  },
  challengeText: {
    flex: 1,
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  completeBtn: {
    height: 26,
    paddingHorizontal: 8,
    minWidth: 58,
  },
  completeDone: {
    opacity: 0.65,
  },
  completeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});