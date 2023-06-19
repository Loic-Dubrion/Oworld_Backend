const client = require('prom-client');

const counter = new client.Counter({
  name: 'requests_total',
  help: 'Total number of requests',
});

function incrementCounter() {
  counter.inc();
}

async function exposeMetrics(req, res) {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.end(metrics);
}

module.exports = { incrementCounter, exposeMetrics };
