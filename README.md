# 📱 Notes App - React Native with Expo

A clean, professional Notes application built with React Native, Expo, and TypeScript. Features a beautiful UI with dark/light theme support, real-time search, and responsive design for phones and tablets.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Press 'i' for iOS, 'a' for Android, 'w' for web
```

---

## 📦 React Native Components Used

### NotesListScreen

- **FlatList** - Efficiently render scrollable list of notes
- **TextInput** - Search/filter notes in real-time
- **Pressable** - Interactive note cards with visual feedback
- **Switch** - Dark/light mode toggle
- **SafeAreaView** - Safe area padding for notch devices
- **View, Text** - Layout and typography

### NoteEditorScreen

- **KeyboardAvoidingView** - Prevents keyboard overlap (iOS/Android)
- **ImageBackground** - Header background with visual appeal
- **Pressable** - Save and Back buttons with press states
- **TextInput** - Title (single-line) and content (multi-line) inputs
- **ScrollView** - Scrollable content area
- **SafeAreaView** - Safe area padding
- **View, Text** - Layout and typography

---

## 🎣 React Hooks Used

### Core Hooks

- **useState** - State management for:
    - Current screen (list/editor)
    - Selected note for editing
    - Notes array (create, read, update)
    - Dark mode toggle state
    - Search query filtering
    - Title and content inputs

- **useMemo** - Performance optimization:
    - Filtered notes based on search query (prevents unnecessary re-filters)

### React Native Hooks

- **useColorScheme()** - Automatic light/dark mode detection based on system preference
- **useWindowDimensions()** - Responsive layout:
    - Phone vs tablet detection (breakpoint: 600px width)
    - Dynamic content width (full-width on phone, 70% on tablet)
    - Real-time adaptation on orientation change

---

## 🎨 Styling Methods

- **StyleSheet.create()** - All component styles for performance
- **StyleSheet.compose()** - Combining multiple style objects (NotesListScreen)
- **StyleSheet.flatten()** - Flattening style arrays (NoteEditorScreen)

---

## ✨ Key Features

**Two screens** - Notes list and note editor
**Add notes** - Create new notes with unique IDs  
 **Edit notes** - Update existing note title and content
**Search/filter** - Real-time search across notes
**Dark mode** - Automatic or manual theme toggle
**Responsive** - Optimized for phones and tablets
**Keyboard handling** - Smooth keyboard interactions
**TypeScript** - Full type safety throughout
**Professional UI** - Consistent spacing, typography, and colors

---

## 📁 Project Structure

```
src/
├── app/
│   ├── _layout.tsx           # Root navigation setup
│   └── index.tsx             # Entry point
├── components/
│   └── AppContainer.tsx      # Screen state management
├── screens/
│   ├── NotesListScreen.tsx   # Notes list and search
│   └── NoteEditorScreen.tsx  # Create/edit notes
├── constants/
│   ├── theme.ts              # Colors, spacing, typography
│   └── mockData.ts           # Sample notes
└── types/
    └── index.ts              # TypeScript interfaces
```

---

## 🛠️ Technologies

- **React Native** - Cross-platform mobile framework
- **Expo** - Managed React Native platform
- **TypeScript** - Static type checking
- **React Hooks** - Functional component state management
- **StyleSheet API** - Performance-optimized styling

---

## 🎯 Component Hierarchy

```
AppContainer (state management)
├── NotesListScreen
│   ├── Header (title + theme toggle)
│   ├── Search TextInput
│   └── FlatList
│       └── NoteCard (Pressable)
│
└── NoteEditorScreen
    ├── ImageBackground Header
    │   ├── Back Button (Pressable)
    │   ├── Title
    │   └── Save Button (Pressable)
    ├── Title TextInput
    ├── Content TextInput (multiline)
    └── Character Counter
```

---

## 🎓 Concepts Demonstrated

- React Native core components
- Mobile UI/UX patterns
- Responsive design with hooks
- Theme management
- State management with hooks
- TypeScript in React Native
- Performance optimization
- Professional styling practices
