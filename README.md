name: Deploy Expo Web App to Firebase Hosting

on:
  push:
    branches:
      - master  # Trigger deployment on push to the main branch

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2  
      with:
        node-version: '22.1.0'  # Use the Node.js version your project requires

    - name: Install dependencies
      run: npm install --legacy-peer-deps

    - name: Install Expo CLI
      run: npm install -g expo-cli

    - name: Install Firebase CLI
      run: npm install -g firebase-tools

    - name: Build the web app
      run: npm run build:web

    - name: Deploy to Firebase Hosting
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
      run: firebase deploy --only hosting
