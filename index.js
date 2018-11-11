const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const PORT = process.env.Port || 3000;

const NewsAPI = require('newsapi');


const app = express();


module.exports = app;



// logging middleware
// app.use(morgan('dev'));

// static middleware
// app.use(express.static(path.join(__dirname, '..', 'node_modules')));
// app.use(express.static(path.join(__dirname, '..', 'public')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// 'API' routes

const newsapi = new NewsAPI('86e7879082d0422fa3170e95a826bb8a');

let sources = 'bloomberg, the-wall-street-journal, the-new-york-times, finantial-times, business-insider, the-washington-post, usa-today, buzzfeed, financial-post, fortune, the-economist, abc-news, cbs-news, fox-news, cnn, msnbc, nbc-news, news24, newsweek, '

app.get('/', async (req, res, next) => {
    try {
        let response = await newsapi.v2.everything({
            sources,
            pageSize: 100
          })
        res.status(200).json(response)      
    } catch (err) {
        next(err)
    }
})

app.get('/api/search', async (req, res, next) => {
    let q = req.query.q
    let selectedSources = req.query.sources || sources
    // let date = new Date();
    console.log('-----', selectedSources);
    try {
        let response = await newsapi.v2.everything({
            q,
            sources: selectedSources,
            language: 'en',
            sortBy: 'publishedAt', 
            // from: '2018-11-6',
            // to: 'date',
            pageSize: 100,
          })
        res.status(200).json(response)      
    } catch (err) {
        next(err)
    }
})

// app.get('/api/search', (req, res, next) => {
//     newsapi.v2.topHeadlines({
//         sources: 'bbc-news,the-verge',
//         q: 'bitcoin',
//         // category: 'business',
//         language: 'en',
//         // country: 'us'
//       }).then(response => {
//         console.log(response);
//         /*
//           {
//             status: "ok",
//             articles: [...]
//           }
//         */
//       });
// }
// )

// newsapi.v2.topHeadlines({
//     sources: 'bbc-news,the-verge',
//     q: 'bitcoin',
//     category: 'business',
//     language: 'en',
//     country: 'us'
//   }).then(response => {
//     console.log(response);
//     /*
//       {
//         status: "ok",
//         articles: [...]
//       }
//     */
// });

// 404 middleware
// app.use((req, res, next) =>
//   path.extname(req.path).length > 0 ?
//     res.status(404).send('Not found') :
//     next()
// );

// send index.html
// app.use('*', (req, res, next) =>
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'))
// );

// error handling endware
// app.use((err, req, res, next) =>
//   res.status(err.status || 500).send(err.message || 'Internal server error.')
// );


// app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))