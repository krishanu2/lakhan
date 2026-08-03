/* ============================================================
   Data layer — Neon Postgres over its SQL-over-HTTP endpoint.
   The connection string is injected at build time from a CI
   secret (never committed) and belongs to a low-privilege role
   (site_public) that can only read/write the gallery,
   testimonials, and visits tables — no schema access, no other
   data. Without it, the site falls back to built-in content.
   ============================================================ */

const ENDPOINT = 'https://ep-noisy-dawn-avzwadfp.c-11.us-east-1.aws.neon.tech/sql';
const CONN = import.meta.env.VITE_NEON_CONN || '';

export async function sql(query, params = []) {
  if (!CONN) throw new Error('Data connection is not configured');
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Neon-Connection-String': CONN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, params }),
  });
  if (!res.ok) throw new Error(`DB error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.rows || [];
}

/* ---------- Gallery ---------- */

export const fetchGallery = () =>
  sql('SELECT id, url, caption, width FROM gallery ORDER BY position, id');

export const addGalleryItem = (url, caption, width) =>
  sql(
    'INSERT INTO gallery (url, caption, width, position) VALUES ($1, $2, $3, coalesce((SELECT max(position) FROM gallery), 0) + 1) RETURNING id',
    [url, caption, width]
  );

export const updateGalleryItem = (id, url, caption, width) =>
  sql('UPDATE gallery SET url = $2, caption = $3, width = $4 WHERE id = $1', [id, url, caption, width]);

export const deleteGalleryItem = (id) => sql('DELETE FROM gallery WHERE id = $1', [id]);

/* ---------- Testimonials ---------- */

export const fetchTestimonials = () =>
  sql('SELECT id, name, condition, result, quote, img, track FROM testimonials ORDER BY id');

export const addTestimonial = (t) =>
  sql(
    'INSERT INTO testimonials (name, condition, result, quote, img, track) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [t.name, t.condition, t.result, t.quote, t.img, t.track]
  );

export const updateTestimonial = (t) =>
  sql(
    'UPDATE testimonials SET name = $2, condition = $3, result = $4, quote = $5, img = $6, track = $7 WHERE id = $1',
    [t.id, t.name, t.condition, t.result, t.quote, t.img, t.track]
  );

export const deleteTestimonial = (id) => sql('DELETE FROM testimonials WHERE id = $1', [id]);

/* ---------- Visits & stats ---------- */

export const logVisit = () => {
  const device = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  return sql('INSERT INTO visits (path, referrer, device) VALUES ($1, $2, $3)', [
    window.location.pathname,
    document.referrer || '',
    device,
  ]).catch(() => {});
};

export const fetchStats = () => sql('SELECT * FROM stats_summary');

export const fetchDaily = () => sql('SELECT day, visits FROM visits_daily');
