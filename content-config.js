// Live content sources for Google Sheets and the enquiry form.
// These URLs are configured. Edit the original Google Sheet for daily updates.
// If a CSV is temporarily unavailable, the website uses the fixed content in data.js.
window.contentConfig = {
  servicesCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR8_LO4pY9ctPLIIIg1sW0xFcn_kNBcrYU0bAycSruCYcHADgNcY_LWDDNeP02Pxtg6prm52cpbHgjZ/pub?gid=1131806554&single=true&output=csv",
  activitiesCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR8_LO4pY9ctPLIIIg1sW0xFcn_kNBcrYU0bAycSruCYcHADgNcY_LWDDNeP02Pxtg6prm52cpbHgjZ/pub?gid=383340468&single=true&output=csv",
  formUrl: "https://forms.gle/tUpBgswtF1g8fSah8",
  // Programme brochures. Each entry needs an English and a Chinese file; the
  // website shows the one matching the language currently selected.
  // Leave a URL empty (or delete the entry) and its link simply disappears.
  brochures: {
    overview: { en: "documents/tea-culture-overview-en.pdf", zh: "documents/tea-culture-overview-zh.pdf" },
    "team-building": { en: "documents/tea-culture-team-building-en.pdf", zh: "documents/tea-culture-team-building-zh.pdf" },
    regular: { en: "documents/tea-culture-regular-sessions-en.pdf", zh: "documents/tea-culture-regular-sessions-zh.pdf" }
  }
};
