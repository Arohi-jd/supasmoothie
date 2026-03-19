# Supa Smoothies

A lightweight CRUD app built with React and Supabase to manage smoothie recipes.

## Features

- View all smoothies from the `smoothies` table
- Sort smoothies by newest, rating, or title
- Add a new smoothie with title, method, and rating
- Update existing smoothie entries
- Delete smoothies directly from the card view

## Tech Stack

- React 18
- React Router 6
- Supabase JavaScript Client
- CSS (custom, no UI framework)

## Local Setup

1. Install dependencies:

   `npm install`

2. Create a `.env` file in the root directory:

   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_ANON_KEY=your_supabase_anon_key
   ```

3. Start development server:

   `npm start`

4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` – runs the app in development mode
- `npm run build` – creates a production build
- `npm test` – runs tests in watch mode

## Supabase Table Shape

This project expects a `smoothies` table with fields similar to:

- `id` (number, primary key)
- `title` (text)
- `method` (text)
- `rating` (number)
- `created_at` (timestamp)

## Project Structure

- `src/pages/Home.js` – list and sort smoothies
- `src/pages/Create.js` – create form
- `src/pages/Update.js` – update form
- `src/components/smoothieCard.js` – reusable card UI
- `src/config/supabaseClient.js` – Supabase initialization
