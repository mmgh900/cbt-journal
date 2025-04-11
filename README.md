# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## CBT Journal - A Progressive Web App

This is a PWA (Progressive Web App) for practicing Cognitive Behavioral Therapy journaling. It allows users to record and analyze their thoughts, emotions, and behaviors.

### Features

- Record your thoughts, emotions, and behaviors
- Track cognitive distortions
- Challenge negative thoughts with evidence
- Works offline
- Installable on any device (mobile, desktop)
- Data stays on your device (privacy-focused)

### PWA Features

- **Installable**: Add to home screen on mobile or desktop
- **Offline Support**: Works without an internet connection
- **Responsive Design**: Optimized for all screen sizes
- **Fast Loading**: Quick startup and operation

### Installation Instructions

#### On Mobile (iOS/Android)

1. Open the app in your mobile browser
2. For iOS: Tap the share button and select "Add to Home Screen"
3. For Android: Tap the menu (three dots) and select "Add to Home Screen"

#### On Desktop (Windows/Mac/Linux)

1. Open the app in Chrome, Edge, or other PWA-supporting browser
2. Look for the install icon in the address bar or menu
3. Click "Install" when prompted

### Development

To run locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (with PWA features)
npm run pwa:build
```

### Icons

The app includes various icons optimized for different platforms:

- Favicon for browsers
- Apple touch icon for iOS
- Android icons in different sizes
- Windows tile icons

### Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- PWA (Service Workers, Web App Manifest)
