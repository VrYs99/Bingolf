import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DuelIcon, FoursomeIcon, SettingsIcon, SoloIcon, TrophyIcon } from '../components/ModeIcons';
import { GlassPanel, GreenButton, ScreenBackground } from '../components/ui';
import { FRIENDS, PLAYER, UPDATES } from '../data/solo';
import { images } from '../theme/assets';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Lobby'>;

const friendAvatars = {
  friend1: images.friend1,
  friend2: images.friend2,
  friend3: images.friend3,
};

export function LobbyScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profile}>
          <Image source={images.avatar} style={styles.avatar} />
          <GlassPanel style={styles.profileCard}>
            <Text style={styles.name}>{PLAYER.name}</Text>
            <View style={styles.profileRow}>
              <GreenButton style={styles.achievement}>
                <Text style={styles.achievementText}>Achievement</Text>
                <TrophyIcon width={16} height={17} />
              </GreenButton>
              <Text style={styles.points}>
                {PLAYER.points} <Text style={styles.pts}>pts</Text>
              </Text>
              <SettingsIcon width={20} height={20} color="#FFFFFF" />
            </View>
          </GlassPanel>
        </View>

        <GlassPanel style={styles.section}>
          <Text style={styles.sectionTitle}>New game</Text>
          <View style={styles.modes}>
            <Pressable
              style={styles.modePress}
              onPress={() => navigation.navigate('NewGame')}
            >
              <GreenButton style={styles.modeCard}>
                <SoloIcon width={34} height={44} />
                <Text style={styles.modeLabel}>SOLO</Text>
              </GreenButton>
            </Pressable>

            <View style={styles.modePress}>
              <GreenButton style={styles.modeCard}>
                <DuelIcon width={40} height={42} />
                <Text style={styles.modeLabel}>DUEL</Text>
              </GreenButton>
              <View style={styles.grayOut} pointerEvents="none" />
              <View style={styles.comingSoon}>
                <Text style={styles.comingSoonText}>Coming{'\n'}soon!</Text>
              </View>
            </View>

            <View style={styles.modePress}>
              <GreenButton style={styles.modeCard}>
                <FoursomeIcon width={48} height={42} />
                <Text style={styles.modeLabel}>FOURSOME</Text>
              </GreenButton>
              <View style={styles.grayOut} pointerEvents="none" />
              <View style={styles.comingSoon}>
                <Text style={styles.comingSoonText}>Coming{'\n'}soon!</Text>
              </View>
            </View>
          </View>
        </GlassPanel>

        <GlassPanel style={styles.sectionWide}>
          <Text style={styles.sectionTitle}>Updates</Text>
          {UPDATES.map((title, i) => (
            <View key={`${title}-${i}`} style={styles.listRow}>
              <View style={styles.alertDot} />
              <Text style={styles.listText} numberOfLines={1}>
                {title}
              </Text>
              <GreenButton style={styles.smallBtn}>
                <Text style={styles.smallBtnText}>Read ...</Text>
              </GreenButton>
            </View>
          ))}
          <Text style={styles.more}>More ›</Text>
        </GlassPanel>

        <GlassPanel style={styles.sectionWide}>
          <Text style={styles.sectionTitle}>Friends</Text>
          {FRIENDS.map((friend) => (
            <View key={friend.id} style={styles.listRow}>
              <Image source={friendAvatars[friend.avatar]} style={styles.friendAvatar} />
              <Text style={styles.listText} numberOfLines={1}>
                {friend.name}
              </Text>
              <GreenButton style={styles.smallBtn}>
                <Text style={styles.smallBtnText}>Add +</Text>
              </GreenButton>
            </View>
          ))}
          <Text style={styles.more}>More ›</Text>
        </GlassPanel>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    gap: 14,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: colors.white,
    zIndex: 2,
  },
  profileCard: {
    width: '100%',
    marginTop: -42,
    paddingTop: 48,
  },
  name: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  profileRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  achievement: {
    height: 26,
    paddingHorizontal: 8,
    flexDirection: 'row',
    gap: 4,
  },
  achievementText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  points: {
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 15,
  },
  pts: {
    fontSize: 12,
    textTransform: 'lowercase',
  },
  section: {
    minHeight: 154,
  },
  sectionWide: {
    minHeight: 180,
  },
  sectionTitle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  modes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  modePress: {
    flex: 1,
    position: 'relative',
  },
  modeCard: {
    height: 101,
    borderRadius: 9,
    gap: 6,
    paddingTop: 10,
    paddingBottom: 8,
  },
  modeLabel: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  grayOut: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.grayOut,
    borderRadius: 9,
  },
  comingSoon: {
    position: 'absolute',
    top: -6,
    left: -4,
    backgroundColor: colors.greenFrom,
    borderColor: colors.greenTo,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    transform: [{ rotate: '-17deg' }],
  },
  comingSoonText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 9,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glassWhite,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 9,
    minHeight: 45,
    paddingHorizontal: 10,
    marginBottom: 8,
    gap: 8,
  },
  alertDot: {
    width: 16,
    height: 14,
    borderRadius: 3,
    backgroundColor: '#F01212',
  },
  listText: {
    flex: 1,
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  smallBtn: {
    height: 26,
    paddingHorizontal: 8,
    minWidth: 45,
  },
  smallBtnText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  more: {
    alignSelf: 'flex-end',
    color: colors.white,
    fontWeight: '700',
    fontSize: 10,
    marginTop: 2,
  },
  friendAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});