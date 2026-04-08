# MutualFundPro - Frontend

MutualFundPro is a modern, responsive, and dynamic web platform for mutual fund analysis and investment tracking. The platform allows users to explore various mutual funds, compare their metrics, test their investment risks, and access dedicated role-based dashboards to manage portfolios and insights.

## 🚀 Features

- **Dynamic Data Visualization**: View detailed metrics like NAV, AUM, Expense Ratio, and Historical Returns.
- **Fund Comparison Tool**: Compare multiple funds side-by-side to make data-driven investment decisions.
- **Authentication & Roles**: Full login/signup flow with role-based routing (`Investor`, `Advisor`, `Analyst`, `Admin`).
- **Personalized Dashboards**: Custom interfaces depending on the authenticated user's role.
- **Responsive Navigation**: Mobile-friendly navigation menu and optimized layouts.

## 💻 Tech Stack

- **Framework**: React 18 with [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (buttons, input, layouts, etc.)
├── hooks/            # Custom React hooks (e.g., use-toast)
├── lib/              # Utility functions and API configuration
├── pages/            # View components (Home, Login, Compare, Dashboards)
├── App.tsx           # Main application routing
└── main.tsx          # Application entry point
```

## 🛠️ Usage / Setup Instructions

### Prerequisites
Make sure you have Node.js and `npm` installed.

1. **Install Dependencies**
   Run the following command in the terminal to retrieve all required node modules:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   Start the Vite frontend proxy server.
   ```bash
   npm run dev
   ```
   > By default, the frontend will be highly available on `http://localhost:8080`.

3. **Backend API Configuration**
   The frontend is configured to interface seamlessly with the backend API on port `5001`. 
   Vite is specifically handling CORS proxies internally via `vite.config.ts`, directing any calls from `/api` to `http://127.0.0.1:5001`.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run preview`: Previews the local production build.

## 🤝 Contribution

Contributions, issues, and feature requests are welcome. Feel free to open a ticket or file a pull request.
