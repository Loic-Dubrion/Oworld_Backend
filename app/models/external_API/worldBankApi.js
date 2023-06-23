require('dotenv').config();

const axios = require('axios');
const redisClient = require('../../services/clientDB/clientRedis');

const { Error503 } = require('../../errors');

// variables for building the query
const baseUrl = 'http://api.worldbank.org/v2/country';

const categories = {
  environnement: 'EN.ATM.CO2E.KT;EG.USE.PCAP.KG.OE;ER.PTD.TOTL.ZS;EN.ATM.PM25.MC.M3;AG.SRF.TOTL.K2',
  population: 'SP.POP.TOTL;SP.DYN.LE00.IN;SP.POP.GROW;SP.POP.DPND.OL;SP.ADO.TFRT',
  economy: 'NY.GDP.MKTP.CD;NY.GDP.MKTP.KD.ZG;FP.CPI.TOTL.ZG;GC.DOD.TOTL.GD.ZS;BX.KLT.DINV.WD.GD.ZS',
  job: 'SL.EMP.TOTL.SP.ZS;SL.UEM.TOTL.ZS;SL.TLF.TOTL.IN;SI.DST.FRST.20;SL.EMP.TOTL.SP.FE.ZS',
  education: 'SE.ADT.LITR.ZS;SE.XPD.TOTL.GD.ZS;SE.SEC.ENRL.TC.ZS;SE.SEC.CUAT.UP.ZS;SE.SEC.CMPT.LO.ZS',
};

const source = 'source=2';
const format = 'format=json';
const date = 'date=2002:2022';
const size = 'per_page=150';

async function fetchDataByCategory(country) {
  // Redis caching
  await redisClient.connect();
  const cacheKey = `WB:${country}`;

  const cacheValue = await redisClient.get(cacheKey);

  if (cacheValue) {
    await redisClient.quit();
    return JSON.parse(cacheValue);
  }

  const transformedData = {};

  try {
    const promises = Object.keys(categories).map(async (category) => {
      const url = `${baseUrl}/${country}/indicator/${categories[category]}?${source}&${format}&${date}&${size}`;
      const response = await axios.get(url);

      if (!response.data || response.data.length < 2) {
        console.error('Invalid response data');
        return null;
      }

      const result = response.data[1];
      const groupedData = [];
      for (let i = 0; i < result.length; i += 21) {
        groupedData.push(result.slice(i, i + 21));
      }

      const transformedCategoryData = groupedData.map((group) => {
        const { indicator } = group[0];
        const mappedValues = group.map((item) => ({ date: item.date, value: item.value }));
        const reducedValues = mappedValues.reduce((acc, curr) => {
          acc[curr.date] = curr.value;
          return acc;
        }, {});

        return {
          indicator: {
            id: indicator.id,
            value: indicator.value,
          },
          values: reducedValues,
        };
      });

      transformedData[category] = transformedCategoryData;
    });

    await Promise.all(promises);

    const finalData = { country: { id: country }, ...transformedData };

    await redisClient.set(cacheKey, JSON.stringify(finalData));
    redisClient.expire(cacheKey, process.env.REDIS_TTL);
  } catch (error) {
    await redisClient.quit();
    console.error(error);
    return null;
  }

  return transformedData;
}

async function fetchWorldBankData(iso3) {
  try {
    const country = iso3;
    const transformedData = await fetchDataByCategory(country);
    return transformedData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = fetchWorldBankData;
