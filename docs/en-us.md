# Project Documentation

## General Description
The GoLedger Challenge is a technical test that consists of developing a web interface system for managing data from a blockchain-inspired streaming service. The main objective is to demonstrate technical skills through the implementation of registration, editing, deletion, and display functionalities for artists, albums, songs, and playlists.

The project uses Next.js as the main framework, combined with modern UI libraries and state management. This project is modular and follows good practices for component organization and reuse.

## Technologies and Dependencies

Main Technologies

- Next.js: React framework for server-side rendering (SSR).
- React: JavaScript library for building user interfaces.
- Tailwind CSS: CSS framework for styling.
- Radix UI: Accessible UI components.
- React Hook Form: Form management.
- Zod: Data validation.
- TanStack React Query: Asynchronous state management.
- Zustand: Lightweight state management library.

## Folder Structure
Below is the project's folder structure and a brief description of each folder:

### Project Root
- public/: Stores static files like images and icons.
- dictionaries/: JSON files for internationalization (e.g., en-us.json and pt-br.json).
- node_modules/: Installed dependencies.
- package.json: Dependency and script management.
  
### app/ Directory

Main organization of application pages:

### components/ Directory

Reusable components for modals and other functionalities:

- modals/: Contains modals for creating, editing, and deleting entities.

- - Subfolders:
- - - album/: Album-related modals.
- - - artist/: Artist-related modals.
- - - playlist/: Playlist-related modals.
- - - - Contains the form for adding songs to playlists (add-song-form.tsx).
- - - song/: Song-related modals.
- ui/: Generic interface components like buttons, tables, theme selectors, etc.


### lib/ Directory
Utility functions and helpers to facilitate code use and logic reuse.

### service/ Directory
Files related to API communication:

- api.ts: Main Axios configuration for requests.
- handle-api-error.tsx: Centralized API error handling
  
## Implemented Features
1. Management of Artists, Albums, Songs, and Playlists

- Create, edit, and remove records of artists, albums, songs, and playlists.
- Display of all records in tables.

2. Internationalization (i18n)

- Support for multiple languages with next-intl (e.g., English and Portuguese).

3. Dark/Light Theme

- Theme toggle using next-themes.

5. Accessible Modals

- Modals for creating, editing, and removing entities, using Radix UI Dialog.

6. State Management

- Asynchronous management with React Query.
- Light local management with Zustand.
  
## How to Run the Project
**Prerequisites**

Make sure you have Node.js installed (version 18 or higher).

**Installation**

1. Clone the repository:

```bash
git clone https://github.com/EduardoHoths/goledger-challenge-web
cd goledger-challenge-web
```

2. Install dependencies:

```bash
npm install
```

3. Configure the .env file:

Add necessary variables, such as API credentials.

Example

```bash
NEXT_PUBLIC_API_USER=user
NEXT_PUBLIC_API_PASS=password
```


4. Start the development server

```bash
npm run dev
```


5. Open in browser

```arduino
http://localhost:3000
```

## Technical Considerations

### Form Management

- Uses react-hook-form for form validation.
- Integration with zod for schema validation.

### API

- Requests are made with Axios, configured in service/api.ts.

### Modular Components

- Reusable components (e.g., buttons, dropdowns, and modals) in components/ui.

### Future Improvements (Suggestions)

- Implement pagination for display tables.
- Add automated tests with Jest.
- Add responsive design to all pages
- Add column filters
