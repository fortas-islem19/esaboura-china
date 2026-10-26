// FormBold form ID: Dashboard → your form → Settings → Integration (the part after formbold.com/s/).
// VITE_FORM_ENDPOINT in .env overrides this if you ever switch to another service.
export const FORMBOLD_FORM_ID = ''

export const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || (FORMBOLD_FORM_ID ? `https://formbold.com/s/${FORMBOLD_FORM_ID}` : '')

// Programme details from the Winter Camp catalogue (Google Drive › China)
export const PRICES = {
  student: 398000,
  worker: 450000,
}

export const DEADLINE = '17 نوفمبر 2026'

export const formatDA = (n) => `${n.toLocaleString('en-US')} دج`
