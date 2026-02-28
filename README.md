# iYED - Minimalist Video Editor & 3D Designer Portfolio

A highly interactive, award-winning style personal portfolio built with React, Three.js, and Framer Motion. This project focuses on a brutalist, typography-driven, black-and-white minimalist design system, moving away from traditional grid-based image cards to sleek, text-based interactive rows.

## 🌟 Key Features

*   **Interactive Contextual Cursor**: The default browser cursor is completely hidden. It's replaced by a fluid, physics-based `<canvas>` overlay (`InteractiveTimelineGrid`) that traces mouse movements with vertical timeline-style ticks and features a custom pause (`||`) icon that dynamically fades out when idle.
*   **Brutalist Typographic Design**: A strict monochrome color palette (`#18181B` and `#FAFAFA`) married with large-scale typography (using *Archivo* and *Space Grotesk* fonts).
*   **3D Hero Scene**: A floating, interactive 3D hero environment built with `@react-three/fiber` and `@react-three/drei`, featuring a custom camera, play button, and a subtle particle field.
*   **Text-Based Project Showcase**: An elegant "Selected Projects" section featuring seamless row-based hover interactions (`project-list-row`) instead of standard image-based cards.
*   **Infinite Skills Marquee**: A seamlessly looping, hover-to-pause animated bar showcasing core software and skills (e.g., Video Editing, 3D Modeling, Motion Graphics).
*   **Motion Architecture**: Scroll-triggered reveals, page transitions, and element orchestrations powered by `framer-motion`.
*   **Performance Optimized**: Utilizes Vite for lightning-fast HMR and optimized production builds.

## 🛠️ Technology Stack

*   **Framework**: [React 18](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: Pure CSS with Custom Properties (CSS Variables) - Zero external CSS libraries to maintain absolute control over the design system.
*   **3D Graphics**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine (v16.0.0 or higher is recommended).

### Installation

1.  **Clone the repository** (or download the source code):
    ```bash
    git clone <repository-url>
    cd Memes
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser**:
    Navigate to `http://localhost:5173` (or the port provided in your terminal) to view the portfolio.

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder containing the minified files ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.). To preview the build locally:

```bash
npm run preview
```

## 📁 Directory Structure Overview

```text
├── public/                 # Static assets (images, videos, fonts)
├── src/
│   ├── components/         # React components (Hero, ProjectGrid, Showreel, etc.)
│   ├── context/            # React Context (e.g., LanguageContext for text strings)
│   ├── App.jsx             # Main application layout and component orchestrator
│   ├── index.css           # Global stylesheet containing the core design system
│   └── main.jsx            # React root injection point
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 🎨 Design System Notes

*   **Colors**: The project relies strictly on custom CSS variables located at the top of `src/index.css`. Modify `--primary` and `--bg` to alter the core theme.
*   **Cursor Behavior**: The custom cursor logic is housed in `src/components/InteractiveTimelineGrid.jsx`. It utilizes the HTML5 Canvas API to calculate mouse velocity and draw fading timeline marks along with the `||` icon. The default CSS cursor is overridden with `cursor: none !important;` globally.
*   **Content Management**: The textual content for the site (titles, descriptions, button labels) is managed via `src/context/LanguageContext.jsx`, making it highly centralized and easy to update without hunting through individual component files.

---
*Crafted with precision for video editing & 3D artistry.*
