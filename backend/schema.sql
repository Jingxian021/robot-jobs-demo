-- Robot Works — anonymous product analytics schema (Cloudflare D1 / SQLite)
-- Apply with: npx wrangler d1 execute robot_works --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS consent_records (
  id              TEXT PRIMARY KEY,
  anon_id         TEXT NOT NULL,
  created_at      TEXT NOT NULL,
  choice          TEXT NOT NULL,           -- granted | rejected | customized
  categories      TEXT NOT NULL,           -- JSON, e.g. {"analytics":true}
  policy_version  TEXT NOT NULL,
  jurisdiction    TEXT NOT NULL,           -- R-EEA | R-JP | R-CN | R-US | R-INTL
  country         TEXT,
  lang            TEXT,
  page            TEXT,
  withdrawn_at    TEXT
);

CREATE INDEX IF NOT EXISTS idx_consent_anon ON consent_records (anon_id);
CREATE INDEX IF NOT EXISTS idx_consent_created ON consent_records (created_at);

CREATE TABLE IF NOT EXISTS events (
  id              TEXT PRIMARY KEY,
  anon_id         TEXT NOT NULL,
  session_id      TEXT NOT NULL,
  name            TEXT NOT NULL,
  occurred_at     TEXT NOT NULL,
  day             TEXT NOT NULL,           -- YYYY-MM-DD (UTC)
  page            TEXT,
  lang            TEXT,
  jurisdiction    TEXT NOT NULL,
  country         TEXT,
  job_id          TEXT,
  company         TEXT,
  props           TEXT                     -- JSON, small and allowlisted
);

CREATE INDEX IF NOT EXISTS idx_events_day ON events (day);
CREATE INDEX IF NOT EXISTS idx_events_name_day ON events (name, day);
CREATE INDEX IF NOT EXISTS idx_events_anon ON events (anon_id);
CREATE INDEX IF NOT EXISTS idx_events_session ON events (session_id);
