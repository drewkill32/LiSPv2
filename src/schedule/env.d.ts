/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_API_KEY: string;
  readonly PUBLIC_SHEET_ID: string;
  readonly PUBLIC_LINEUP_RANGE: string;
  readonly PUBLIC_ARTIST_RANGE: string;
  readonly PUBLIC_VENUE_RANGE: string;
  readonly PUBLIC_SETTINGS_RANGE: string;
  readonly PUBLIC_EVENT_START_DATE: string;
  readonly PUBLIC_GOOGLE_MAP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
