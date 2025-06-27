# TypeSpeed Pro - Typing Speed Test

A beautiful and interactive typing speed test application built with React, TypeScript, and Tailwind CSS.

## Features

- **Dynamic Text Content**: Fetches quotes from external APIs with fallback content
- **Customizable Timer**: Choose between 30s, 60s, or 120s test durations
- **Real-time Stats**: Live WPM, accuracy, and mistake tracking
- **Caps Lock Warning**: Visual notification when Caps Lock is enabled
- **Typing History**: Local storage of past results with progress tracking
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Progress Charts**: Visual representation of typing improvement over time

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the project as a zip file, extract it
   # If you have it from git, clone it
   cd typespeed-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   The application will be available at `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Application header
│   ├── Timer.tsx       # Timer display and progress
│   ├── TypingArea.tsx  # Main typing interface
│   ├── Stats.tsx       # Real-time statistics
│   ├── Results.tsx     # Test completion results
│   ├── History.tsx     # Typing history and charts
│   └── ...
├── hooks/              # Custom React hooks
│   └── useTypingTest.ts # Main typing test logic
├── utils/              # Utility functions
│   ├── api.ts          # API calls and fallback data
│   └── storage.ts      # Local storage management
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## Troubleshooting

### Common Issues

1. **"npm run dev" doesn't work**
   - Make sure you've run `npm install` first
   - Check that Node.js is properly installed: `node --version`
   - Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

2. **Port already in use**
   - The dev server will automatically find an available port
   - You can specify a different port: `npm run dev -- --port 3000`

3. **Build errors**
   - Run `npm run lint` to check for code issues
   - Make sure all dependencies are installed

### Development Tips

- The application uses Vite for fast development and building
- Hot module replacement is enabled - changes will reflect immediately
- TypeScript provides type safety and better development experience
- Tailwind CSS is configured for styling

## Deployment

The project is ready for deployment to any static hosting service:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service of choice (Netlify, Vercel, GitHub Pages, etc.)

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Recharts** - Charts for progress visualization
- **Lucide React** - Beautiful icons

## License

This project is open source and available under the MIT License.