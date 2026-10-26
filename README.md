# esaboura-china

Landing page and registration form for **Esaboura (السبورة)**'s winter cultural trip to China. Built with React and Vite, animated with Framer Motion.

The branding follows the Esaboura "CHINA" motion video: deep purple backgrounds with a diamond lattice texture, yellow highlight pills, red map and calendar accents, white cards, and the Esaboura logo. The photos in `src/assets` are frames from that video.

## Sections

1. Hero: 中国 title, "اطلبوا العلم ولو في الصين", and the planet-and-ring visual
2. Video: a wide 16:9 player with a branded thumbnail, plus topic buttons that jump to each part of the video
3. The trip: سياحية · ثقافية, with polaroid photos
4. Winter break dates: 17 December → 1 January, falling snow, a 16-day counter
5. Location: Shijiazhuang (Hebei) and Hebei International Studies University, with an animated flight route
6. Daily programme, 18 → 31 December
7. What the offer includes, and what it doesn't
8. Participation certificate
9. Prices: students 398,000 DA, workers 450,000 DA, and the 17 November deadline
10. Student discount, and a seat grid showing the limited places
11. Required documents and travel checklist
12. Registration form (FormBold) with validation and an animated success state
13. Footer

The page is right-to-left Arabic throughout. Animations respect `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Receiving form submissions (FormBold)

The registration form sends each submission to [FormBold](https://formbold.com) as JSON, with Arabic field names so the notification emails are easy to read.

1. Create a form in the FormBold dashboard.
2. Copy its form ID (Settings → Integration; it's the part after `https://formbold.com/s/`).
3. Put it in `src/config.js`:

   ```js
   export const FORMBOLD_FORM_ID = 'your-form-id'
   ```

To use another service instead, set `VITE_FORM_ENDPOINT` in `.env`; it takes priority over the FormBold ID.

If neither is set, the form runs in **demo mode**: it shows the success screen and logs the data to the browser console, but nothing is saved.

Fields sent: الاسم الكامل، رقم الهاتف (واتساب)، البريد الإلكتروني، العمر، الولاية، الصفة، السعر المطبّق، التخصص / المؤسسة، جواز السفر، ملاحظات، موافقة على التواصل، تاريخ الإرسال، المصدر.

## Programme details

Prices, dates and the deadline live in `src/config.js`. The daily programme (`src/components/Program.jsx`), what's included (`Offer.jsx`) and the required documents (`Documents.jsx`) come from the Winter Camp catalogue in the Google Drive "China" folder.

## Project structure

```
src/
  App.jsx                 page layout and scroll progress bar
  index.css               brand tokens and all styles
  components/             one file per section, plus Motion.jsx helpers
  lib/submit.js           form submission (VITE_FORM_ENDPOINT)
  lib/wilayas.js          list of the 58 Algerian wilayas
  assets/                 logo and photos taken from the brand video
public/video/
  china-trip.mp4             16:9 trip video, 1280x720 (loads only when played)
  china-trip-thumbnail.jpg   video thumbnail, 1280x720
```

`china-trip.mp4` is currently the vertical brand video placed on a blurred 16:9 background. To use a real landscape video, replace that file (keep the name, or update `VIDEO_SRC`) and update the topic timestamps in `src/components/VideoSection.jsx`.
