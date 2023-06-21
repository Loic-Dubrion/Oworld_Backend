const client = require('../app/services/clientRedis'); // Remplacez par le chemin vers votre fichier de configuration Redis
const logger = require('../app/services/logger');

const planets = {
  Earth: {
    name: 'Earth',
    diameter: '12,742 km',
    mass: '5.972 × 10^24 kg',
    orbitalPeriod: '365.25 days',
    rotationPeriod: '23.934 hours',
    averageTemperature: '15 °C',
    moons: [
      {
        name: 'Moon',
        diameter: '3,474 km',
        mass: '7.342 × 10^22 kg',
        orbitalPeriod: '27.3 days',
      },
    ],
    population: '7.9 billion (2023 estimate)',
    atmosphereComposition: {
      nitrogen: '78%',
      oxygen: '21%',
      argon: '0.93%',
      carbonDioxide: '0.04%',
      other: '0.03%',
    },
    continents: ['Africa', 'Antarctica', 'Asia', 'Australia', 'Europe', 'North America', 'South America'],
    inhabitants: 'terrien',
    'level of development': {
      'death by selfies': '380',
      'death by hunger': '9 million',
      'food waste': '1.3 trillion tonnes',
      'annual consumption': '1.75 times what the planet produces',
    },
    dataCategory: {
      population: {
        2000: 6127700428,
        2001: 6213239478,
        2002: 6301358022,
        2003: 6390488172,
        2004: 6480720731,
        2005: 6572451591,
        2006: 6665005977,
        2007: 6759316173,
        2008: 6853449099,
        2009: 6947192850,
        2010: 7041567895,
        2011: 7136626584,
        2012: 7231953443,
        2013: 7327812099,
        2014: 7425061349,
        2015: 7523989129,
        2016: 7624259087,
        2017: 7726109476,
        2018: 7828863434,
        2019: 7932642117,
        2020: 8037942923,
      },
    },
  },
  Mars: {
    name: 'Mars',
    diameter: '6,792 km',
    mass: '6.4171 × 10^23 kg',
    orbitalPeriod: '687 days',
    rotationPeriod: '24.622 hours',
    averageTemperature: '-63 °C',
    moons: [
      {
        name: 'Phobos',
        diameter: '22.2 km',
        mass: '1.0659 × 10^16 kg',
        orbitalPeriod: '0.319 days',
      },
      {
        name: 'Deimos',
        diameter: '12.6 km',
        mass: '1.471 × 10^15 kg',
        orbitalPeriod: '1.263 days',
      },
    ],
    population: 'Robotic (as of 2023)',
    atmosphereComposition: {
      carbonDioxide: '95.32%',
      nitrogen: '2.7%',
      argon: '1.6%',
      oxygen: '0.13%',
      carbonMonoxide: '0.08%',
      minor: '<0.2%',
    },
    continents: ['Meridiani Planum', 'Elysium Planitia', 'Olympus Mons', 'Hellas Planitia'],
    inhabitants: 'Robotic',
    'level of development': {
      'rover landings': '8',
      'successful missions': '20+',
      'failed missions': '25+',
    },
  },
  Mercury: {
    name: 'Mercury',
    diameter: '4,879 km',
    mass: '3.3011 × 10^23 kg',
    orbitalPeriod: '88 days',
    rotationPeriod: '58.646 days',
    averageTemperature: '167 °C',
  },
  Venus: {
    name: 'Venus',
    diameter: '12,104 km',
    mass: '4.8675 × 10^24 kg',
    orbitalPeriod: '225 days',
    rotationPeriod: '243 days',
    averageTemperature: '462 °C',
  },
  Jupiter: {
    name: 'Jupiter',
    diameter: '139,820 km',
    mass: '1.8982 × 10^27 kg',
    orbitalPeriod: '11.9 years',
    rotationPeriod: '9.93 hours',
    averageTemperature: '-108 °C',
  },
  Saturn: {
    name: 'Saturn',
    diameter: '116,460 km',
    mass: '5.6834 × 10^26 kg',
    orbitalPeriod: '29.5 years',
    rotationPeriod: '10.7 hours',
    averageTemperature: '-139 °C',
  },
  Uranus: {
    name: 'Uranus',
    diameter: '50,724 km',
    mass: '8.6810 × 10^25 kg',
    orbitalPeriod: '84 years',
    rotationPeriod: '17.2 hours',
    averageTemperature: '-197 °C',
  },
  Neptune: {
    name: 'Neptune',
    diameter: '49,244 km',
    mass: '1.02413 × 10^26 kg',
    orbitalPeriod: '165 years',
    rotationPeriod: '16.1 hours',
    averageTemperature: '-201 °C',
  },
};

(async () => {
  await client.connect();
  const key = 'planet';
  await client.set(key, JSON.stringify(planets));
  await client.quit();
})().catch((error) => logger.error(error));
