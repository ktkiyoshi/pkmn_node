require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

const pokedexRouter = require('./routes/pokedex');
const typesRouter = require('./routes/types');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/api/pokedex', pokedexRouter);
app.use('/api/type', typesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening at http://localhost:${port}`)
});