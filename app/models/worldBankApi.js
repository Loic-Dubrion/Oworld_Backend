const logger = require('../services/logger');

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
  const transformedData = {};

  const promises = Object.keys(categories).map(async (category) => {
    const url = `${baseUrl}/${country}/indicator/${categories[category]}?${source}&${format}&${date}&${size}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Convert response to JSON
      const data = await response.json();

      // Extract relevant data
      const result = data[1];

      // Group data by indicator
      const groupedData = [];
      for (let i = 0; i < result.length; i += 21) {
        groupedData.push(result.slice(i, i + 21));
      }

      // Transform data to simplify the structure
      const transformedCategoryData = groupedData.map((group) => {
        const { indicator } = group[0];
        const mappedValues = group.map((item) => ({ date: item.date, value: item.value }));
        // transform an array of objects into a single object with specific keys and values
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

      // Add transformed data to the main object
      transformedData[category] = transformedCategoryData;
    } catch (error) {
      logger.error(error);
    }
  });

  await Promise.all(promises);

  return { country: { id: country }, ...transformedData };
}

async function fetchAndLogData(iso3) {
  try {
    const country = iso3;
    const transformedData = await fetchDataByCategory(country);
    console.log('Country:', transformedData.country);
    return transformedData;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

module.exports = fetchAndLogData;
