/**
 * config.js: the one file to edit when personalizing the site.
 * Everything here shows up across the app (hero, credential card, footer).
 */
export const CONFIG = {
  creator: {
    name: 'Saransh Shekhar',
    firstName: 'Saransh',
    score: 1550,
    // Optional: put a photo at assets/saransh.jpg and write 'assets/saransh.jpg' here.
    photo: '',
  },

  district: 'TX-26',

  // Paste your YouTube embed link here once your intro video is recorded, e.g.
  // 'https://www.youtube-nocookie.com/embed/VIDEO_ID'. Leave empty to show the placeholder.
  videoEmbedUrl: '',

  // Desmos's public demo key, fine while building. Request your own free key at
  // https://www.desmos.com/api before you launch publicly.
  desmosApiKey: 'dcb31709b452b1cf9dc26972add0fda6',

  // Google sign-in through Supabase. Copy both from Supabase → Project Settings → API.
  // Both are safe to publish: the anon key is designed to be public.
  supabaseUrl: 'https://qpoewxlzozvzmuoiezct.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwb2V3eGx6b3p2em11b2llemN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3ODc0MjcsImV4cCI6MjEwODM2MzQyN30.fE1t0NqCx9q1WZiAhqPvsayhWglYU5WG9-lv73fuqzI',

  // true only in the hosted preview link, which can't load outside tools like Desmos.
  previewMode: false,

  // XP a student needs each day to fill the daily goal ring.
  dailyGoalXp: 50,

  // Shown with the daily question on Home and in the course.
  streakQuote: 'a question a day keeps the retake away; keep the streak alive :)',
};
