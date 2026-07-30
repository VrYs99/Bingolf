export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type SoloSetup = {
  mode: 'SOLO';
  difficulty: Difficulty;
  location: string;
  rounds: string;
  holes: string;
};

export type Challenge = {
  id: string;
  letter: 'B' | 'I' | 'N' | 'G' | 'O';
  number: number;
  title: string;
  completed: boolean;
};

export type BingoCell = {
  id: string;
  number: number | 'FREE';
  marked: boolean;
};

export const PLAYER = {
  name: 'Raymond Champagne',
  points: '257 892',
};

export const UPDATES = [
  'Season 2 : Heat on the court...',
  'Season 2 : Heat on the court...',
  'Season 2 : Heat on the court...',
];

export const FRIENDS = [
  { id: '1', name: 'Alex Fairway', avatar: 'friend1' as const },
  { id: '2', name: 'Jordan Putt', avatar: 'friend2' as const },
  { id: '3', name: 'Sam Green', avatar: 'friend3' as const },
];

const CHALLENGE_TITLES = [
  'King of the dance floor',
  'Hit the fairway',
  'Two-putt finish',
  'Sand save hero',
  'Straight down the middle',
  'Chip within 3 feet',
  'Birdie hunter',
  'Par protector',
  'Long drive swagger',
  'Lag putt master',
];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/** Classic bingo columns: B 1-15, I 16-30, N 31-45, G 46-60, O 61-75 */
export function createSoloCard(): { cells: BingoCell[]; challenges: Challenge[] } {
  const columns = [
    shuffle(range(1, 15)).slice(0, 5),
    shuffle(range(16, 30)).slice(0, 5),
    shuffle(range(31, 45)).slice(0, 5),
    shuffle(range(46, 60)).slice(0, 5),
    shuffle(range(61, 75)).slice(0, 5),
  ];

  const letters: Challenge['letter'][] = ['B', 'I', 'N', 'G', 'O'];
  const cells: BingoCell[] = [];

  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 5; col += 1) {
      const isFree = row === 2 && col === 2;
      cells.push({
        id: `${row}-${col}`,
        number: isFree ? 'FREE' : columns[col][row],
        marked: isFree,
      });
    }
  }

  const playable = cells.filter((c) => c.number !== 'FREE');
  const picked = shuffle(playable).slice(0, 5);

  const challenges: Challenge[] = picked.map((cell, index) => ({
    id: `c-${cell.id}`,
    letter: letters[index],
    number: cell.number as number,
    title: CHALLENGE_TITLES[index % CHALLENGE_TITLES.length],
    completed: false,
  }));

  return { cells, challenges };
}

export function hasBingo(cells: BingoCell[]): boolean {
  const marked = cells.map((c) => c.marked);
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];
  return lines.some((line) => line.every((i) => marked[i]));
}

export const DEFAULT_SETUP: SoloSetup = {
  mode: 'SOLO',
  difficulty: 'EASY',
  location: '',
  rounds: '1',
  holes: '9',
};