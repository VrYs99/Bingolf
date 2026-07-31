import type { SoloSetup } from '../data/solo';

export type RootStackParamList = {
  Lobby: undefined;
  NewGame: undefined;
  Game: { setup: SoloSetup };
  Achievements: undefined;
};