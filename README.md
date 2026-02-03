# Emotion Suppression Detection System

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=flat-square&logo=vite)

An AI-powered web application for detecting suppressed emotional expressions through facial behavior and speech timing analysis.

![Landing Page Preview](https://via.placeholder.com/800x400/0a0a0f/00d4d4?text=Emotion+Suppression+Detection+System)

## 🎯 Overview

Traditional emotion recognition systems are designed to identify clear, fully-expressed emotions. This system bridges the gap by focusing specifically on the markers of **emotional regulation** — detecting subtle traces like momentary muscle tensions, delayed reactions, and interrupted expression patterns that indicate when someone is actively controlling or hiding their true emotional state.

## ✨ Features

- **Facial Micro-Movement Detection** — Tracks subtle muscle activations and micro-expressions
- **Expression Timing Analysis** — Measures temporal dynamics and identifies unnatural patterns
- **Emotional Regulation Pattern Detection** — Distinguishes between natural and controlled responses
- **Real-time Signal Visualization** — Live monitoring of behavioral signals during analysis
- **Comprehensive Results Dashboard** — Interactive charts and detailed insights

## 🖥️ Screens

### 1. Landing Page
- Hero section with animated face visualization
- Feature highlights and use cases
- Smooth scroll animations

### 2. Upload Screen
- Drag-and-drop file upload
- Support for video (MP4, AVI) and image (JPG, PNG) formats
- File preview with thumbnail generation

### 3. Processing Screen
- Real-time AI pipeline visualization
- Live signal monitoring (Blink Rate, Muscle Stability, Expression Delay, Speech Pause)
- Animated progress tracking

### 4. Results Dashboard
- Suppression Score (0-100)
- Suppression Level indicator (Low/Moderate/High)
- Confidence Score
- Interactive charts:
  - Suppression intensity timeline
  - Facial Action Unit stability
  - Expression delay analysis
- Export options (PDF, CSV)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/emotion-suppression-frontend.git

# Navigate to project directory
cd emotion-suppression-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🛠️ Tech Stack

- **React 18** — UI library
- **Tailwind CSS** — Utility-first CSS framework
- **Vite** — Build tool and dev server
- **React Router** — Client-side routing
- **Recharts** — Charting library for data visualization

## 📁 Project Structure

```
emotion-suppression-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── FaceVisualization.jsx
│   │   ├── Features.jsx
│   │   ├── WhyItMatters.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── UseCases.jsx
│   │   ├── FinalCTA.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── UploadScreen.jsx
│   │   ├── ProcessingScreen.jsx
│   │   └── ResultsScreen.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Background Primary | `#0a0a0f` | Main background |
| Background Secondary | `#12121a` | Section backgrounds |
| Background Card | `#15151f` | Card backgrounds |
| Accent Cyan | `#00d4d4` | Primary accent |
| Accent Violet | `#8b5cf6` | Secondary accent |
| Text Primary | `#f0f0f5` | Headings |
| Text Secondary | `#a0a0b0` | Body text |

### Typography

- **Font Family:** Inter
- **Headings:** 600-700 weight
- **Body:** 400-500 weight

## 📊 Use Cases

- **Online Exams** — Monitor test-takers for signs of stress or deceptive behavior
- **Interviews** — Gain deeper insights into candidate responses
- **Behavioral Research** — Support psychological studies on emotional regulation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Face detection and analysis concepts inspired by FACS (Facial Action Coding System)
- UI/UX design inspired by modern research-focused applications

---

<p align="center">
  <sub>Built with ❤️ for advancing emotion AI research</sub>
</p>
