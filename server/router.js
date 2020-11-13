const router = require('express').Router();
const { google } = require('googleapis');

const bq = google.bigquery('v2');

const {
  CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, BQ_PROJECT_ID,
} = process.env;

const scopes = [
  'https://www.googleapis.com/auth/bigquery',
  'https://www.googleapis.com/auth/bigquery.readonly',
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/cloud-platform.read-only',
];

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);
google.options({
  auth: oauth2Client,
});

router.post('/query', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    oauth2Client.setCredentials({
      access_token: token,
      scope: scopes.join(' '),
      token_type: 'Bearer',
    });
    try {
      const d = await bq.jobs.query({
        projectId: BQ_PROJECT_ID,
        requestBody: {
          query: req.body.query,
          useLegacySql: false,
        },
      });
      return res.status(200).json({ data: d });
    } catch (error) {
      return res.status(500).json({ message: error.response.data.error.message });
    }
  } catch (error) {
    return res.status(502).json({ message: 'Something went wrong!' });
  }
});

module.exports = (app) => app.use(router);
