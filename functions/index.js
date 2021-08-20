const functions = require('firebase-functions');
const Airtable = require('airtable');
const cors = require('cors')({ origin: true });

exports.airtable = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    console.log(req.query);
    console.log(functions.config());
    const apiKey = functions.config().airtable[
      req.query.base === 'pacific' ? 'pacific_api_key' : 'api_key'
    ];
    const baseConfig = functions.config().airtable[
      req.query.base === 'pacific' ? 'pacific_base' : 'base'
    ];
    console.log({ apiKey, baseConfig });

    if (!apiKey || !baseConfig) {
      res.send(500);
    } else {
      const base = new Airtable({
        apiKey,
      }).base(baseConfig);
      console.log({ base });
      try {
        const tableName =
          req.query.base === 'pacific'
            ? 'Pacific Qualitative Data 2021'
            : req.query.locale.toUpperCase();
        const data = await base(tableName)
          .select({
            view: 'Grid view',
          })
          .firstPage();
        // console.log({ data })
        res.json({ data });
      } catch (err) {
        console.log({ err });
        res.send(500);
      }
    }
  });
});
