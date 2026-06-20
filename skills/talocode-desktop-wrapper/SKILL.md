# talocode-desktop-wrapper

Create lightweight desktop wrappers for web applications.

## When to Use

Use this skill when:

- Building desktop wrappers for web apps
- Creating quick-access desktop applications
- Distributing web apps as desktop apps
- Integrating web apps with desktop features

## Important Distinction

**Do not confuse lightweight web app wrappers with full browser products.**

- **Desktop wrappers** are for app distribution, quick access, and desktop integration
- **Browser products** are for full browsing experiences with tabs, navigation, page actions, and AI assistance

Use this skill for:

- Desktop app distribution
- Quick launch shortcuts
- System tray integration
- Native window management
- Auto-updates

Do NOT use this skill for:

- Full browser products
- AI-native browsing
- Tab management
- Page actions
- Research workflows

## Architecture

```
Desktop Wrapper (Electron/Tauri)
    ↓
Browser Window
    ↓
Web Application
```

## Core Features

### System Tray

- Quick launch from tray
- Background running
- Notifications

### Quick Launch

- Desktop shortcut
- Start menu entry
- Keyboard shortcut

### Native Window

- Custom title bar
- Window state persistence
- Multiple windows

### Auto-Updates

- Check for updates
- Download updates
- Install updates

## Implementation

### Electron

```bash
# Install
npm install electron electron-builder

# Create main process
# Create preload script
# Create renderer
```

### Tauri

```bash
# Install
cargo tauri init

# Create Rust backend
# Create webview frontend
```

## Rules

- Keep wrapper lightweight
- Do not add full browser features
- Focus on app distribution
- Use web technologies for UI
- Keep native code minimal

## Notes

- Desktop wrappers are for quick access
- Browser products are for full browsing
- Both serve different use cases
- Do not confuse the two
