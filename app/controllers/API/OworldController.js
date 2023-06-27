/**
 * @module Controllers
 */

const CoreController = require('./CoreController');
const oworldDataMapper = require('../../models/OworldDataMapper');

/** Class representing a category controller. */
class OworldController extends CoreController {
  static dataMapper = oworldDataMapper;

  /**
   * create a category controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
  }

  async getPlanet(request, response) {
    const results = await this.constructor.dataMapper.planet();
    response.json(JSON.parse(results));
  }
}

module.exports = new OworldController();
