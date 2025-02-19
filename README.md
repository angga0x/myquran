# MyQuran

A Quran application.

## Author

angga0x

## Project Structure

-   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
-   `eslint.config.js`: Configuration file for ESLint, a JavaScript linter.
-   `index.html`: The main HTML file for the application.
-   `package-lock.json`: Records the exact versions of dependencies used in the project.
-   `package.json`: Contains metadata about the project, including dependencies and scripts.
-   `postcss.config.js`: Configuration file for PostCSS, a tool for transforming CSS.
-   `tailwind.config.js`: Configuration file for Tailwind CSS, a utility-first CSS framework.
-   `tsconfig.app.json`: Configuration file for the TypeScript application.
-   `tsconfig.json`: Base configuration file for TypeScript.
-   `tsconfig.node.json`: Configuration file for TypeScript specific to Node.js.
-   `vite.config.ts`: Configuration file for Vite, a build tool.
-   `public/`: Directory for public assets.
    -   `asmaul.png`: Image asset.
    -   `pray.png`: Image asset.
    -   `quran.png`: Image asset.
    -   `soon.png`: Image asset.
    -   `sujud.png`: Image asset.
    -   `vite.svg`: Image asset.
-   `src/`: Directory containing the source code.
    -   `App.css`: CSS file for the main application component.
    -   `App.tsx`: Main application component written in TypeScript.
    -   `index.css`: Main CSS file.
    -   `main.tsx`: Entry point for the application.
    -   `vite-env.d.ts`: TypeScript declaration file for Vite environment variables.
    -   `assets/`: Directory for assets.
        -   `react.svg`: React logo.
    -   `components/`: Directory for React components.
        -   `MenuCard.tsx`: React component.
        -   `Navigation.tsx`: React component.
    -   `context/`: Directory for React context.
        -   `ThemeContext.tsx`: React context for managing the theme.
    -   `pages/`: Directory for application pages.
        -   `AsmaulHusna.tsx`: React component for the Asmaul Husna page.
        -   `DailyDua.tsx`: React component for the Daily Dua page.
        -   `Favorites.tsx`: React component for the Favorites page.
        -   `Home.tsx`: React component for the Home page.
        -   `JuzAmma.tsx`: React component for the Juz Amma page.
        -   `LastRead.tsx`: React component for the Last Read page.
        -   `NiatShalat.tsx`: React component for the Niat Shalat page.
        -   `PrayerReadings.tsx`: React component for the Prayer Readings page.
        -   `ProphetStories.tsx`: React component for the Prophet Stories page.
        -   `ReadQuran.tsx`: React component for the Read Quran page.
        -   `Settings.tsx`: React component for the Settings page.
        -   `Sunnah.tsx`: React component for the Sunnah page.
        -   `SurahDetail.tsx`: React component for the Surah Detail page.
        -   `Tahlil.tsx`: React component for the Tahlil page.
        -   `Wirid.tsx`: React component for the Wirid page.
    -   `services/`: Directory for API services.
        -   `asmaulHusnaApi.ts`: API service for Asmaul Husna data.
        -   `doaHarianApi.ts`: API service for Daily Dua data.
        -   `niatShalatApi.ts`: API service for Niat Shalat data.
        -   `quotesApi.ts`: API service for quotes.
        -   `quranApi.ts`: API service for Quran data.
        -   `tafsirApi.ts`: API service for Tafsir data.
    -   `types/`: Directory for TypeScript types.
        -   `quran.ts`: TypeScript type definitions for Quran data.
