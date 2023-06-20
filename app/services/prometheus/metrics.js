const client = require('prom-client');

// A counter to track the total number of requests
const totalRequests = new client.Counter({
  name: 'requests_total',
  help: 'Total number of requests',
});

// A counter to track the number of successful requests
const successfulRequests = new client.Counter({
  name: 'requests_successful',
  help: 'Number of successful requests',
});

function incrementTotalRequests() {
  totalRequests.inc();
}

function incrementSuccessfulRequests() {
  successfulRequests.inc();
}

async function exposeMetrics(req, res) {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.end(metrics);
}

module.exports = {
  incrementTotalRequests,
  incrementSuccessfulRequests,
  exposeMetrics,
};
