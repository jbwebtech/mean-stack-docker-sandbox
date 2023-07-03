const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');


const port = 3000;
const app = express();
app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/**
 * Index Router
 */
const indexRouter = express.Router();
indexRouter.get('/', (req, res) => {
    res
        .status(200)
        .json({
            message: "hello world",
            timestamp: new Date()
        });
});
app.use('/', indexRouter);


/**
 * Continents Data Model
 */
const continents = [
    { name: "Asia", population: 4641054775 },
    { name: "South America", population: 430759766 },
    { name: "Europe", population: 747636026 },
    { name: "North America", population: 592072212 },
    { name: "Africa", population: 1340598147 },
    { name: "Australia", population: 43111704 },
    { name: "Antarctica", population: 0 },
];


/**
 * Continents Router
 */
const continentRouter = express.Router();
continentRouter.get('/', (req, res) => {
    // Supported querystring modifiers:
    //      sort=alpha    Sort alphabetically, ascending
    //      sort=pop      Sort by population, descending

    let result = continents;
    if (req.query.sort) {
        if (req.query.sort === "alpha") {
            result.sort((a, b) => (a.name > b.name) ? 1 : -1);
        } else if (req.query.sort === "pop") {
            result.sort((a, b) => (a.population > b.population) ? -1 : 1);
        }
    }

    res
        .status(200)
        .json(result);
});

continentRouter.get('/:contentId', (req, res) => {
    const c = continents.find((c) => c.name === req.params.contentId);
    res
        .status(200)
        .json(c ? c : null);
});
app.use('/continents', continentRouter);


/**
 * Error Router
 * 404 error handler route must be defined last
 */
app.get('*', function (req, res) {
    console.warn(`Requested path not found: '${req.url}'`);
    res
        .status(404)
        .send({
            error: "Not Found",
            path: req.url,
            timestamp: new Date()
        });
});

/**
 * HTTP Server
 */
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});
