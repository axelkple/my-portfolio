# Developer Portfolio (React + Vite + React Router)

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in /dist
    npm run preview    # preview the build

## Customise
- All text (name, skills, projects, jobs) lives in `src/data/portfolio.js`.
- Colours and fonts are CSS variables at the top of `src/styles/main.css`.
- Each section is its own file in `src/components/`.
- Put images (e.g. `photo.jpg`) in `public/` and reference them as `/photo.jpg`.

## Pages
| URL | File |
|-----|------|
| `/` | `src/pages/Home.jsx` |
| `/about` | `src/pages/About.jsx` |
| `/projects` | `src/pages/Projects.jsx` |
| `/projects/:slug` | `src/pages/ProjectDetail.jsx` (built from `projects` in the data file) |
| `/contact` | `src/pages/Contact.jsx` |
| anything else | `src/pages/NotFound.jsx` |

Routes are declared in `src/App.jsx`. To add a page: create a file in `src/pages/`,
add a `<Route>` in `App.jsx`, and a link in `src/components/Header.jsx`.

## Deploying
Because the site uses real URLs, the host must send every path to `index.html`.
Netlify: add `public/_redirects` containing `/*  /index.html  200`.
Vercel works automatically. GitHub Pages: switch `BrowserRouter` to `HashRouter` in `src/main.jsx`.
