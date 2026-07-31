export type Achievement = {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  goal: number;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-bingo',
    title: 'First Bingolf',
    description: 'Complete your first bingo line',
    points: 500,
    progress: 1,
    goal: 1,
  },
  {
    id: 'full-card',
    title: 'Blackout',
    description: 'Mark every square on a single card',
    points: 2500,
    progress: 0,
    goal: 1,
  },
  {
    id: 'streak',
    title: 'Hot streak',
    description: 'Win 5 solo rounds in a row',
    points: 1200,
    progress: 3,
    goal: 5,
  },
  {
    id: 'challenges',
    title: 'Challenge hunter',
    description: 'Complete 50 challenges',
    points: 1500,
    progress: 32,
    goal: 50,
  },
  {
    id: 'courses',
    title: 'Globetrotter',
    description: 'Play on 10 different courses',
    points: 800,
    progress: 4,
    goal: 10,
  },
  {
    id: 'hard-mode',
    title: 'No mercy',
    description: 'Win a round on HARD difficulty',
    points: 2000,
    progress: 1,
    goal: 1,
  },
  {
    id: 'eighteen',
    title: 'Full round',
    description: 'Finish an 18 holes game',
    points: 1000,
    progress: 0,
    goal: 1,
  },
  {
    id: 'social',
    title: 'Clubhouse regular',
    description: 'Add 3 friends',
    points: 300,
    progress: 3,
    goal: 3,
  },
];

export function isUnlocked(achievement: Achievement): boolean {
  return achievement.progress >= achievement.goal;
}

export function unlockedCount(list: Achievement[] = ACHIEVEMENTS): number {
  return list.filter(isUnlocked).length;
}

export function earnedPoints(list: Achievement[] = ACHIEVEMENTS): number {
  return list.reduce((sum, a) => (isUnlocked(a) ? sum + a.points : sum), 0);
}
