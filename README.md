# esaboura-china

Landing page and registration form for **Esaboura (السبورة)**'s winter cultural trip to China. Built with React and Vite, animated with Framer Motion.

The branding follows the Esaboura "CHINA" motion video: deep purple backgrounds with a diamond lattice texture, yellow highlight pills, red map and calendar accents, white cards, and the Esaboura logo. The photos in `src/assets` are frames from that video.

## Sections

1. Hero: 中国 title, "اطلبوا العلم ولو في الصين", and the planet-and-ring visual
2. The trip: سياحية · ثقافية, with polaroid photos
3. Winter break dates: 17 December → 1 January, falling snow, a 16-day counter
4. Location: Hebei province near Beijing, with an animated flight route
5. What the offer includes: plane ticket, visa, accommodation
6. Certificate from a Chinese university
7. Student discount, and a seat grid showing the limited places
8. Registration form with validation and an animated success state
9. Footer

The page is right-to-left Arabic throughout. Animations respect `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Receiving form submissions

The form sends each registration as JSON with a `POST` to the URL in `VITE_FORM_ENDPOINT`:

```bash
cp .env.example .env
# then set VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx (or any webhook / API URL)
```

The endpoint can be Formspree, a Google Apps Script web app that writes to a Google Sheet, a Make or Zapier webhook, or your own API.

If `VITE_FORM_ENDPOINT` is not set, the form runs in **demo mode**: it shows the success screen and logs the data to the browser console, but nothing is saved.

Fields sent: `fullName`, `phone`, `email`, `age`, `wilaya`, `status`, `field`, `passport`, `notes`, `consent`, `submittedAt`, `source`.

## Project structure

```
src/
  App.jsx                 page layout and scroll progress bar
  index.css               brand tokens and all styles
  components/             one file per section, plus Motion.jsx helpers
  lib/submit.js           form submission (VITE_FORM_ENDPOINT)
  lib/wilayas.js          list of the 58 Algerian wilayas
  assets/                 logo and photos taken from the brand video
```
