# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# PathFinder Pro 🚀

A data-driven career guidance platform specifically designed to empower women in tech with personalized career forecasting, skill gap analysis, and mentorship connections.

## ✨ Features

- **Career Forecasting**: Real-time market data and growth predictions for your career path
- **Enhanced Career Assessment**: Comprehensive 4-step assessment including profile import, career history, skills evaluation, and goal setting
- **Skill Gap Analysis**: Identify exactly what skills you need for your next career move
- **Mentorship Network**: Connect with successful women who can guide your journey
- **LinkedIn Integration**: Quick profile import from LinkedIn (simulated)
- **Personalized Dashboard**: Customized career recommendations based on your profile
- **Market Insights**: Current demand and growth trends for different tech skills
- **Confidence Building**: Tools and resources to boost career confidence

## 🛠️ Technologies Used

- **React 18** - Modern React with functional components and hooks
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript features

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control

You can check your versions by running:
```bash
node --version
npm --version
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pathfinder-pro
```

### 2. Install Dependencies
```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

### 3. Start the Development Server
```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will open at `http://localhost:5173` (or another port if 5173 is busy).

## 📁 Project Structure

```
pathfinder-pro/
├── public/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Component-specific styles
│   ├── index.css        # Global styles and Tailwind imports
│   ├── main.jsx         # Application entry point
│   └── myfile.jsx       # Additional component file
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Components Overview

### App.jsx (PathFinderPro)
The main component that manages the entire application flow:

- **Welcome Screen**: Landing page with feature highlights
- **Assessment Flow**: 4-step career assessment process
- **Dashboard**: Personalized career recommendations and insights

### Assessment Steps:
1. **Profile Import & Basic Info**: LinkedIn integration and current role details
2. **Career History**: Detailed work experience with satisfaction ratings
3. **Skills Assessment**: Comprehensive skill evaluation with enjoyment ratings
4. **Goals & Aspirations**: Career goals and value priorities

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (if configured)

## 🎨 Styling Guidelines

This project uses **Tailwind CSS** for styling:

- Utility-first approach for rapid UI development
- Responsive design with mobile-first methodology
- Custom gradient themes (purple-to-pink for primary actions)
- Consistent color scheme focusing on accessibility

### Color Palette:
- **Primary**: Purple (`purple-600`) to Pink (`pink-600`) gradients
- **Secondary**: Blue (`blue-600`) for accents
- **Success**: Green (`green-600`) for positive indicators
- **Neutral**: Gray scale for text and borders

## 💾 State Management

The application uses React's built-in state management:

- `useState` for component-level state
- Props drilling for data flow between components
- Local state for form inputs and UI interactions

### Key State Objects:
- `userProfile`: Stores all user assessment data
- `currentStep`: Manages application navigation
- `assessmentStep`: Tracks progress through assessment

## 🔗 External Dependencies

### Core Dependencies:
- `react` - UI library
- `react-dom` - DOM rendering
- `lucide-react` - Icon library

### Development Dependencies:
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite

## 🌐 Environment Setup

No environment variables are currently required for local development. The application uses:
- Tailwind CSS via CDN (imported in `index.css`)
- Simulated data for demonstrations
- Mock LinkedIn integration

## 🚀 Deployment

### Build for Production:
```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify:
1. Build the project: `npm run build`
2. Drag the `dist/` folder to Netlify's deploy area

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines:
- Follow React best practices and hooks patterns
- Use Tailwind CSS for all styling
- Maintain responsive design principles
- Write descriptive commit messages
- Test your changes across different screen sizes

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature experience
- **Tablet**: Adapted layouts with collapsible sections
- **Mobile**: Simplified navigation and touch-friendly interactions

## 🐛 Common Issues & Solutions

### Tailwind Styles Not Loading:
- Ensure the CDN link in `index.css` is accessible
- Check browser console for network errors

### Icons Not Displaying:
- Verify `lucide-react` is installed: `npm list lucide-react`
- Check for import statement errors in components

### Development Server Issues:
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Try a different port: `npm run dev -- --port 3000`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Frontend**: React.js with modern hooks patterns
- **Styling**: Tailwind CSS utility framework
- **Icons**: Lucide React icon library
- **Build**: Vite for fast development and production builds

## 📞 Support

If you encounter any issues or have questions:
1. Check the common issues section above
2. Review the project documentation
3. Create an issue in the repository
4. Contact the development team
