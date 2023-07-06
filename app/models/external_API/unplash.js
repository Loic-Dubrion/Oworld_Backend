const { createApi } = require('unsplash-js');
const dotenv = require('dotenv').config();

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const fetchUnsplashPictures = async (country) => {
  const response = await unsplash.search.getPhotos({
    query: `${country} landscape`,
    orientation: 'landscape',
    perPage: 5,
  });

  const pictures = response.response.results.map((pic) => ({
    url: pic.urls.full,
    author: pic.user.name,
    description: pic.description || pic.alt_description,
  }));

  return pictures;
};

fetchUnsplashPictures('Japan').then((pictures) => console.log(pictures));
