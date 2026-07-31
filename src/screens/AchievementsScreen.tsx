import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomNav } from '../components/BottomNav';
import { TrophyIcon } from '../components/ModeIcons';
import { GlassPanel, ScreenBackground } from '../components/ui';
import {
  ACHIEVEMENTS,
  earnedPoints,
  isUnlocked,
  unlockedCount,
} from '../data/achievements';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Achievements'>;

export function AchievementsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const unlocked = unlockedCount();
  const points = earnedPoints();

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <GlassPanel>
          <View style={styles.headerRow}>
            <TrophyIcon width={22} height={24} />
            <Text style={styles.title}>Achievements</Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {unlocked}/{ACHIEVEMENTS.length}
              </Text>
              <Text style={styles.summaryLabel}>Unlocked</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{points.toLocaleString('en-US')}</Text>
              <Text style={styles.summaryLabel}>Points earned</Text>
            </View>
          </View>
        </GlassPanel>

        <GlassPanel style={styles.list}>
          {ACHIEVEMENTS.map((achievement) => {
            const done = isUnlocked(achievement);
            const ratio = Math.min(achievement.progress / achievement.goal, 1);

            return (
              <View
                key={achievement.id}
                style={[styles.card, done && styles.cardDone]}
              >
                <View style={[styles.medal, done && styles.medalDone]}>
                  <TrophyIcon
                    width={18}
                    height={19}
                    color={done ? colors.greenDark : 'rgba(255,255,255,0.6)'}
                  />
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.cardDesc} numberOfLines={1}>
                    {achievement.description}
                  </Text>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${ratio * 100}%` },
                        done && styles.progressFillDone,
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.cardRight}>
                  <Text style={styles.cardPoints}>+{achievement.points}</Text>
                  <Text style={styles.cardStatus}>
                    {done
                      ? 'Done'
                      : `${achievement.progress}/${achievement.goal}`}
                  </Text>
                </View>
              </View>
            );
          })}
        </GlassPanel>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 20,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  summaryRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: colors.glassWhite,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 9,
    paddingVertical: 8,
    alignItems: 'center',
  },
  summaryValue: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 18,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  summaryLabel: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 11,
  },
  list: {
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.glassWhite,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  cardDone: {
    borderColor: colors.greenFrom,
    backgroundColor: 'rgba(72,255,154,0.22)',
  },
  medal: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  medalDone: {
    backgroundColor: colors.greenFrom,
    borderColor: colors.greenTo,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 5,
  },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.28)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  progressFillDone: {
    backgroundColor: colors.greenFrom,
  },
  cardRight: {
    alignItems: 'flex-end',
    minWidth: 48,
  },
  cardPoints: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 13,
  },
  cardStatus: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 10,
    fontWeight: '700',
  },
});
