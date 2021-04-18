const functions = require('firebase-functions');
const Airtable = require('airtable');
const cors = require('cors')({ origin: true });
const base = new Airtable({
  apiKey: functions.config().airtable.api_key,
}).base('appgDeSvOjWaCTIgh');

exports.airtable = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = await base('Table 1')
      .select({
        view: 'Grid view', // change based on language once set up
      })
      .firstPage();
    res.json({ data });
  });
});
