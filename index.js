const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.Port || 3000;
const NewsAPI = require('newsapi');
const dotenv = require('dotenv').config()

const app = express();

module.exports = app;

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// 'API' routes
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

let sources = 'bloomberg, the-wall-street-journal, the-new-york-times, finantial-times, business-insider, the-washington-post, usa-today, buzzfeed, financial-post, fortune, the-economist, abc-news, cbs-news, fox-news, cnn, msnbc, nbc-news, news24, newsweek'

app.get('/', async (req, res, next) => {
    try {
        let response = await newsapi.v2.everything({
            sources,
            language: 'en',
            pageSize: 100
          })
        res.status(200).json(response)      
    } catch (err) {
        next(err)
    }
})

app.get('/api/search', async (req, res, next) => {
    let q = req.query.q;
    let selectedSources = req.query.sources || sources;
    let from = req.query.from;
    let to = req.query.to;
    console.log('-----', from);
    console.log('-----', to);
    try {
        let response = await newsapi.v2.everything({
            q,
            sources: selectedSources,
            language: 'en',
            sortBy: 'publishedAt', 
            from,
            to,
            pageSize: 100,
          })
        res.status(200).json(response)      
    } catch (err) {
        next(err)
    }
})


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



app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
