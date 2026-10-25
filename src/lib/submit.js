const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

// Sends a registration as JSON to VITE_FORM_ENDPOINT (Formspree, Google Apps Script,
// a webhook, or your own API). Without an endpoint the form runs in demo mode.
export async function submitRegistration(data) {
  const payload = { ...data, submittedAt: new Date().toISOString(), source: 'esaboura-china-landing' }

  if (!ENDPOINT) {
    console.info('[demo] VITE_FORM_ENDPOINT is not set; registration not sent:', payload)
    await new Promise((r) => setTimeout(r, 900))
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
}
