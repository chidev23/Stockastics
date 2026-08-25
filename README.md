# STOCKASTICS

STOCKASTICS is a React Native mobile application built with Expo and Firebase for stock-market intelligence and BUY-only stock signals.

## Stack

- React Native
- Expo SDK 57
- Expo Router
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Expo Notifications
- Google Cloud/Firebase backend services

Expo SDK 57 is the current stable project target. Expo's official project creation flow uses `create-expo-app` and supports Expo Router and TypeScript.

## Local environment

Requirements:

- Node.js 22.13+ LTS
- npm
- Expo CLI through the project-local `expo` package
- Android Studio for Android development
- Xcode on macOS for iOS development
- Expo Go for initial device testing, or an EAS development build as native requirements grow

Install dependencies:

```bash
npm install
```

Create local environment configuration:

```bash
cp .env.example .env
```

Fill in the Firebase Web App configuration values from Firebase Console.

Start Expo:

```bash
npx expo start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run the TypeScript check:

```bash
npm run typecheck
```

Run Expo diagnostics:

```bash
npm run doctor
```

## Product rules

1. STOCKASTICS exposes BUY signals only.
2. The six signal categories are independent categories, not a voting system.
3. Signal navigation labels are: Retail, IPO, Buyback, Sentiment, Ex-Div, Income.
4. The six signal buttons remain in one horizontal row and must never wrap onto a second row.
5. The mobile client never contains private market-data/API secrets. Sensitive credentials belong on backend services.
6. Firebase is the backend foundation for authentication, Firestore, Storage and application data.
7. Users receive a 14-day free trial followed by the $50/month subscription model.
8. No LinkedIn authentication.
9. Telegram is not part of the mobile application architecture.

## Initial route

`/` redirects to the STOCKASTICS splash screen, followed by authentication.

## Repository

This project is maintained in `chidev23/Stockastics`.
