const fs = require('fs/promises')
const path = require('path')
const admin = require('firebase-admin')
const parallelLimit = require('run-parallel-limit')

// renamed service account json
const serviceAccount = require(path.join(__dirname, '../../firebase-adminsdk.json'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "rightstracker-2021-embargoed.appspot.com"
})

const bucket = admin.storage().bucket()

// read a pdf, and upload to storage, but with a parallel limit so as not overload memory
const time = process.hrtime()
const pdfsFolder = path.join(__dirname, '../../pdfs')
fs.readdir(pdfsFolder)
.then(files => {
  console.log({ files })

  // run-parallel-limit takes an array of tasks, which are functions that accept callbacks to call when done
  // see https://github.com/feross/run-parallel-limit#parallellimittasks-limit-callback
  const tasks = files.map(f => {
    return (cb) => {
      return bucket.upload(`${pdfsFolder}/${f}`, {
        destination: `pdfs/${f}`
      })
      .then(() => {
        console.log(`${f} uploaded successfully`)
        cb(null, f)
      })
      .catch(err => cb(err))
    }
  })

  return new Promise((resolve, reject) => {
    parallelLimit(tasks, 4, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
})
.then(() => {
  console.log(`time taken: ${process.hrtime(time)[0]}.${process.hrtime(time)[1]} seconds}`)
})