# Bingolf

Jeu mobile **Bingo + Golf** pour iOS et Android (Expo / React Native).

Prototype UI basé sur le Figma [Bingolf-Alpha-prototype](https://www.figma.com/design/oxPycpGnZMTJtdQ7GIpkhl/Bingolf-Alpha-prototype).

## Mode Solo (MVP)

Flux actuel :

1. **Lobby** — profil, modes (Solo actif ; Duel / Foursome bientôt)
2. **New Game** — difficulté, location, rounds, holes, challenges
3. **Game** — grille Bingo 5×5 + challenges à compléter

Compléter un challenge marque le numéro sur la grille. Une ligne complète = BINGOLF.

## Lancer

```bash
npm install
npm start
```

Puis ouvrir avec Expo Go (iOS/Android) ou un simulateur.

```bash
npm run build
```

Vérifie TypeScript (`tsc --noEmit`).
