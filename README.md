# Night Out

Night Out is an Expo + React Native app for exploring nearby bars in Ames, IA. Users can search/select a venue from a dropdown, center the map on it, and open its website from the stats panel.

## Features

- Interactive Google map with venue markers and callouts
- Searchable dropdown for quick venue selection
- Map auto-focus when selecting a venue
- Persistent per-device UUID generation (stored in AsyncStorage)

## Tech Stack

- Expo SDK 54
- React Native 0.81
- `react-native-maps`
- `react-native-element-dropdown`
- `@react-native-async-storage/async-storage`
- `expo-crypto`

## Project Structure

```text
.
├── App.js
├── src
│   ├── components
│   │   ├── NightOutScreen.native.js
│   │   └── NightOutScreen.web.js
│   ├── constants
│   │   └── map.js
│   ├── data
│   │   └── markers.js
│   └── utils
│       └── deviceId.js
├── assets/
└── package.json
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start Expo:

```bash
npm start
```

3. Run on a target platform:

```bash
npm run ios
npm run android
npm run web
```

## Verification

Run a static type check (includes JS via Expo TS config):

```bash
npx tsc --noEmit
```

## Notes

- Venue data currently lives in `src/data/markers.js`.
- Native platforms render `react-native-maps`; web uses a fallback info panel.
- If a venue has no website, the bottom panel prompts the user to select another venue.
