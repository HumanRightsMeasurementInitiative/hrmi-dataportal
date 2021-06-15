const functions = require('firebase-functions');
const Airtable = require('airtable');
const cors = require('cors')({ origin: true });
const base = new Airtable({
  apiKey: functions.config().airtable.api_key,
}).base(functions.config().airtable.base);

exports.airtable = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = await base(req.query.locale.toUpperCase())
      .select({
        view: 'Grid view',
      })
      .firstPage();
    res.json({ data });
  });
});
