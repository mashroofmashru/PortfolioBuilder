# PortfolioBuilder ⚡

A modern, instant-generation developer portfolio builder built with React and Vite. 

Stop building portfolios from scratch. Simply provide your GitHub username and **PortfolioBuilder** will instantly fetch your public data, process your top repositories, analyze your frequently used languages, and generate a beautiful, responsive portfolio ready to share with the world.

![PortfolioBuilder Demo](https://img.shields.io/badge/Status-Active-success) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)

## ✨ Features

- **🚀 Instant Generation**: We fetch your public GitHub data in real-time and construct a beautiful layout based on your repositories, languages, and activity. No OAuth or sign-ups required.
- **🎨 Beautiful Themes**: Enjoy a responsive design featuring a premium glassmorphism aesthetic, native dark/light modes, and a layout that strictly focuses on your work.
- **🔗 Easy Sharing**: Your generated portfolio acts as a shareable link via URL parameters (`?username=...&mode=...`). Just copy the URL and send it to recruiters.
- **📊 Insights & Activity**: Automatically calculates your top languages by repository prevalence and summarizes your recent GitHub contributions into a clean timeline.
- **👨‍💻 Custom Developer Route**: Includes a specialized `/developer` route that renders a hardcoded, highly detailed professional resume native to the application formatting.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with modern CSS Variables and Glassmorphism techniques
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [GitHub REST API v3](https://docs.github.com/en/rest)

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mashroofmashru/portfolio-builder.git
   cd portfolio-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI sections
│   ├── Activity.jsx     # Renders the GitHub events timeline
│   ├── Contact.jsx      # Maps social/portfolio links
│   ├── DeveloperPortfolio.jsx # Custom hardcoded developer resume route
│   ├── Hero.jsx         # Profile avatar, bio, and stats from GitHub
│   ├── Landing.jsx      # Homepage layout with feature cards and input form
│   ├── PortfolioHeader.jsx # Top navigation with theme toggle and share buttons
│   ├── Projects.jsx     # Top 6 starred repositories grid
│   └── Skills.jsx       # Extracted top languages bubbles
├── App.jsx              # Main routing, logic, and data fetching component
├── index.css            # Global application styles, CSS variables, and themes
└── main.jsx             # React entry point
```

## 📝 Usage

1. **Generate**: Visit the homepage and enter any valid GitHub username (e.g., `torvalds`).
2. **Customize**: Toggle the theme using the sun/moon icon in the top right.
3. **Share**: Click the link icon in the header to instantly copy the current portfolio URL to your clipboard.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
