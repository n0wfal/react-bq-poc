const SCOPES = [
  'https://www.googleapis.com/auth/bigquery',
  'https://www.googleapis.com/auth/bigquery.readonly',
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/cloud-platform.read-only'
];
 
const CLIENT_ID = 'GOOGLE-OAuth-Client-ID';

export const AUTH = {
    SCOPES,
    CLIENT_ID
}

export const SAMPLE_QUERY = `SELECT t0.countries_and_territories, t0.daily_confirmed_cases, t0.daily_deaths, t0.geo_id FROM (SELECT geo_id ,daily_confirmed_cases, daily_deaths ,countries_and_territories, country_territory_code FROM \`bigquery-public-data.covid19_ecdc.covid_19_geographic_distribution_worldwide\` WHERE date='2020-11-01' LIMIT 1000) AS t0 LIMIT 100;`;
export const BASE_URL = `http://localhost:3001`