const functions = require('firebase-functions');
const Airtable = require('airtable');
const cors = require('cors')({ origin: true });
const base = new Airtable({
  apiKey: functions.config().airtable.api_key,
}).base(functions.config().airtable.base);

exports.airtable = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = await base('Qualitative Data_English_All Countries')
      .select({
        view: 'Grid view', // change based on language once set up
      })
      .firstPage();
    res.json({ data });
  });
});
