require('dotenv').config();

const axios = require('axios');
const { Error503 } = require('../../errors');
const redisClient = require('../../services/clientDB/clientRedis');

const wikimedia = {
  fetchCountryPictures: async (name) => {
    // redis caching
    // await redisClient.connect();
    // const cacheKey = `wikimedia:${name}`;
    // const cacheValue = await redisClient.get(cacheKey);

    // If cached data, I return them
    // if (cacheValue) {
    //   await redisClient.quit();
    //   return JSON.parse(cacheValue);
    // }

    // query construction for the category
    const baseUrl = 'https://commons.wikimedia.org/w/api.php?';
    const param = {
      action: 'query',
      format: 'json',
      list: 'categorymembers',
      cmtitle: `Category:Landscapes of ${name}`,
      cmtype: 'file',
      cmlimit: 3, // limit to first 3 images
    };

    const url = `${baseUrl}action=${param.action}&format=${param.format}&list=${param.list}&cmtitle=${param.cmtitle}&cmtype=${param.cmtype}&cmlimit=${param.cmlimit}`;
    console.log(url);

    try {
      const response = await axios.get(url);
      const pages = response.data.query.categorymembers;
      const imageInfoResponses = await Promise.all(pages.map(async (page) => {
        const imageUrl = `${baseUrl}action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(page.title)}`;
        return axios.get(imageUrl);
      }));

      const images = imageInfoResponses.map((res) => {
        const { pages } = res.data.query;
        const imageInfo = pages[Object.keys(pages)[0]].imageinfo[0];
        const imageUrl = imageInfo.url;
        const description = imageInfo.extmetadata.Description
          ? imageInfo.extmetadata.Description.value
          : 'No description available';
        const artist = imageInfo.extmetadata.Artist
          ? imageInfo.extmetadata.Artist.value
          : 'No artist information available';
        const dateTimeOriginal = imageInfo.extmetadata.DateTimeOriginal
          ? imageInfo.extmetadata.DateTimeOriginal.value
          : 'No date information available';
        const usageTerms = imageInfo.extmetadata.UsageTerms
          ? imageInfo.extmetadata.UsageTerms.value
          : 'No usage terms available';
        return {
          imageUrl, description, artist, dateTimeOriginal, usageTerms,
        };
      });

      // Caching with Redis
      // await redisClient.set(cacheKey, JSON.stringify(images));
      // redisClient.expire(cacheKey, process.env.REDIS_TTL);
      // await redisClient.quit();

      return images;
    } catch (error) {
      if (redisClient) await redisClient.quit();
      throw new Error503({ HttpCode: 503, Status: 'Fail', Message: 'Service Unavailable' });
    }
  },

  fetchCelebrityPicture: async (celebrityName) => {
    // query construction for the category
    const baseUrl = 'https://commons.wikimedia.org/w/api.php?';
    const param = {
      action: 'query',
      format: 'json',
      list: 'categorymembers',
      cmtitle: `Category:${celebrityName}`,
      cmtype: 'file',
      cmlimit: 1, // Limit the response to 1 result
    };

    const url = `${baseUrl}action=${param.action}&format=${param.format}&list=${param.list}&cmtitle=${param.cmtitle}&cmtype=${param.cmtype}&cmlimit=${param.cmlimit}`;

    try {
      const response = await axios.get(url);
      const pages = response.data.query.categorymembers;

      if (pages.length === 0) {
        return null;
      }

      const page = pages[0];
      const imageUrl = `${baseUrl}action=${param.action}&format=${param.format}&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(page.title)}`;
      const imageInfoResponse = await axios.get(imageUrl);

      const imageInfo = imageInfoResponse.data.query.pages[Object.keys(imageInfoResponse.data.query.pages)[0]].imageinfo[0];
      return imageInfo.url;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

wikimedia.fetchCountryPictures('Japan').then(console.log).catch(console.error);
wikimedia.fetchCelebrityPicture('Coluche').then(console.log).catch(console.error);

module.exports = wikimedia;
