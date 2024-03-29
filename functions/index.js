const functions = require('firebase-functions');
const Airtable = require('airtable');
const cors = require('cors')({ origin: true });

exports.airtable = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const apiKey = functions.config().airtable[
      req.query.base === 'pacific' ? 'pacific_api_key' : 'api_key'
    ];
    const baseConfig = functions.config().airtable[
      req.query.base === 'pacific' ? 'pacific_base' : 'base'
    ];

    if (!apiKey || !baseConfig) {
      res.send(500);
    } else {
      const base = new Airtable({
        apiKey,
      }).base(baseConfig);
      try {
        const tableName = req.query.locale.toUpperCase();
        const data = await base(tableName)
          .select({
            view: 'Grid view',
          })
          .firstPage();
        res.json({ data });
      } catch (err) {
        console.log({ err });
        res.send(500);
      }
    }
  });
});
