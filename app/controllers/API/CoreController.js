/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;

  /**
   * responds with all entries from a table or view
   *
   * @param {Object} request - A boolean to indicate the use of a view or table
   * @param {Object} response
   */
  async getAll(request, response) {
    const useView = request.query.useView === 'true';
    const results = await this.constructor.dataMapper.findAll(useView);
    response.json(results);
  }

  /**
   * responds with a table entry for a specific field and value
   *
   * @param {Object} request - field name and value
   * @param {Object} response
   */
  async getOne(request, response) {
    const { field, value } = request.query;
    const results = await this.constructor.dataMapper.findOneByField(field, value);
    response.json(results);
  }
}

module.exports = CoreController;
