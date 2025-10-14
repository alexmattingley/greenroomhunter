# Greenroom Hunter

A surf forecasting web application that provides real-time wave, tide, and weather data for popular surf locations along the California coast.

## About

Greenroom Hunter is a work-in-progress surf forecasting platform that aggregates data from NOAA buoys, tide stations, and weather services to help surfers find the best conditions. The application displays:

- **Wave Data**: Real-time buoy readings
- **Tide Information**: Current and forecasted tide levels with interactive charts
- **Weather Conditions**: Wind patterns and weather forecasts via Windy integration
- **Location-Specific Data**: Curated surf spots with relevant buoy and tide station data

## 🚀 Getting Started

### Prerequisites

- Node.js (version 22 or higher)
- yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/alexmattingley/greenroomhunter.git
cd greenroomhunter
```

2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality checks

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Mostly styled-components
- **Custom Charts**: Chart.js with annotation plugin
- **Data Sources**: NOAA API for buoy and tide data
- **Weather**: Windy.com integration
- **Language**: JavaScript (Typescript coming soon!)
- **Deployment**: Vercel

## 🌊 Current Status

This project is still under active development. You can see the current iteration live at **[greenroomhunter.com](https://greenroomhunter.com)**.

### Features in Development

- Enhance buoy data visualization with swell breakdown
- Improved mobile responsiveness
- Improved user experience
- Improved performance and page load times
- Personal surf log accounts for logging historical surf sessions

## 📁 Project Structure

```
├── components/          # React components organized by page/feature
├── data/               # Location data and API utilities
├── lib/                # Utility functions and Redis configuration
├── pages/              # Next.js pages and API routes
├── public/             # Static assets and images
└── styles/             # Global styles and CSS modules
```

## 🤝 Contributing

This is a personal project currently in development. If you have suggestions, please feel free to reach out!

## 📄 License

This project is private and not available for public use at this time.
