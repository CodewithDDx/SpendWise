# 💰 SpendWise — Smart Personal Finance & Expense Tracker

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Android](https://img.shields.io/badge/Platform-Android-3DDC84.svg?logo=android&logoColor=white)](https://github.com/CodewithDDx/SpendWise/releases)
[![Flutter](https://img.shields.io/badge/Flutter-3.47.2-02569B.svg?logo=flutter&logoColor=white)](https://flutter.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org)
[![Live Demo](https://img.shields.io/badge/Web_App-Live_Demo-FF6B6B.svg)](https://CodewithDDx.github.io/SpendWise/)

SpendWise is a comprehensive personal finance tracking suite designed to manage personal expenses, budget goals, recurring subscriptions, and banking analytics. Available as a **standalone Android APK**, a **responsive Web App**, and a **Node.js REST backend**.

---

## 📱 Download & Install Android APK

### Option 1: Direct Download (GitHub Releases)
📥 **[Download SpendWise v1.0.0 APK (Latest)](https://github.com/CodewithDDx/SpendWise/releases/download/v1.0.0/SpendWise.apk)**

### Option 2: High-Speed Mirror (GoFile)
🚀 **[Download from GoFile Mirror](https://gofile.io/d/FxSKnarS)**

### 📲 Scan QR Code to Download on Mobile:
![Download QR Code](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://gofile.io/d/FxSKnarS)

---

## 🌐 Live Web Version

You can use the full application directly in any browser without installing anything:
👉 **[Open SpendWise Web App](https://CodewithDDx.github.io/SpendWise/)**

Works 100% offline with browser local storage and offline Excel/CSV parsing bundled!

---

## ✨ Features

- **📊 Comprehensive Financial Dashboard**: Real-time spending overview, daily burn rate, monthly budget progress, and predictive savings.
- **⚡ Dual Mode (Offline & Online)**:
  - **Offline Mode**: Works standalone directly on device with zero internet required.
  - **Cloud / Server Sync**: Connects seamlessly with the local or hosted Node.js REST API.
- **💳 Bank Statement Parser**: Import CSV or Excel (`.xlsx`, `.xls`) statements directly from SBI, HDFC, ICICI, Axis, Paytm, and more with bundled client-side parsing.
- **🔄 Recurring Expense & Subscription Tracker**: Keep tabs on Netflix, Spotify, gym memberships, and upcoming bill due dates.
- **🎯 Savings & Milestone Goals**: Set target budgets and track progress visually with milestone forecasts.
- **🏷️ Smart Category Analytics**: Visual breakdown with dynamic bar and donut charts (Food, Rent, Shopping, Bills, Entertainment, Health, Travel).
- **📥 Data Export & Import**: Instant backup and restore via standard JSON data interchange.

---

## 📁 Repository Structure

```
SpendWise/
├── index.html                   # Standalone Web App (GitHub Pages entry)
├── SpendWise.html               # Original Single-File Application
├── xlsx.full.min.js             # Bundled Offline Excel/CSV Parser Engine
├── push_to_phone.bat            # 1-Click ADB script to push APK to connected Android
├── run_backend.bat              # 1-Click launcher for Node.js REST API
├── backend/                     # Node.js & Express REST Backend
│   ├── server.js                # REST API endpoints & route handlers
│   ├── db.js                    # Database storage engine & data models
│   ├── package.json             # Backend dependencies (express, cors, etc.)
│   └── README.md                # Backend API documentation
└── spendwise_mobile/            # Flutter Android Application
    ├── lib/main.dart            # Flutter WebView wrapper & native bridges
    ├── android/                 # Android native gradle config & manifests
    ├── assets/web/              # Bundled offline web runtime for APK
    └── pubspec.yaml             # Flutter dependencies
```

---

## 🛠️ Getting Started

### 1. Running the Web Version Locally
Double-click `index.html` or open it in any modern web browser:
```bash
start index.html
```

### 2. Starting the Backend Server
```bash
cd backend
npm install
node server.js
```
The REST API server will start on `http://localhost:5000`.

### 3. Running or Building the Android App
Prerequisites: Flutter 3.24+ and Android SDK.
```bash
cd spendwise_mobile
flutter pub get
flutter run
```
To build release APK:
```bash
flutter build apk --release
```

---

## 🔒 Privacy & Security

SpendWise is privacy-first:
- All transaction data is stored locally on your device or your own private server.
- No third-party data tracking or external telemetry.
- Excel/CSV parsing is executed entirely in-memory on your device.

---

## 👤 Author

Developed by **DEEPAK CHANDRA** ([@CodewithDDx](https://github.com/CodewithDDx))

Feel free to open an issue or submit a pull request!
