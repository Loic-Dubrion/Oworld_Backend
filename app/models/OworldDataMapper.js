/* eslint-disable class-methods-use-this */
const CoreDataMapper = require('./CoreDataMapper');
const client = require('../services/clientRedis');

/** Class representing a oWorld data mapper. */
class OworldDataMapper extends CoreDataMapper {
  static viewName = 'country_list';

  /**
   * create a oWorld data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
  }

  async planet() {
    await client.connect();
    const key = 'planet';
    const result = client.get(key);
    await client.quit();
    return result;
  }
}

module.exports = new OworldDataMapper();
