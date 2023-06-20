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

// A histogram to track the latency of the requests
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  buckets: [0.1, 0.3, 0.5, 1, 1.5], // buckets for response time from 0.1ms to 1.5ms
});

// A histogram to track memory usage over time
const memoryUsageHistogram = new client.Histogram({
  name: 'memory_usage_bytes_histogram',
  help: 'Memory usage in bytes over time',
  buckets: [1000000, 2000000, 5000000], // Custom buckets for memory ranges
});

function incrementTotalRequests() {
  totalRequests.inc();
}

function incrementSuccessfulRequests() {
  successfulRequests.inc();
}

function updateMemoryUsage() {
  const memoryUsed = process.memoryUsage().heapUsed;
  memoryUsageHistogram.observe(memoryUsed);
}

// This function should be called with the context of the request
function startTimer() {
  const start = process.hrtime();
  return () => {
    const delta = process.hrtime(start);
    httpRequestDurationMicroseconds.observe(delta[0] + delta[1] / 1e9);
  };
}

async function exposeMetrics(req, res) {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.end(metrics);
}

module.exports = {
  incrementTotalRequests, incrementSuccessfulRequests, startTimer, updateMemoryUsage, exposeMetrics,
};
