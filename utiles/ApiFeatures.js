class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  async paginate(count) {
    const { page, limit } = this.queryString;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 8;
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;
    const pagination = {};
    if (endIndex < count) {
      pagination.next = {
        page: pageNumber + 1,
        limit: limitNumber,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: pageNumber - 1,
        limit: limitNumber,
      };
    }
    this.query = await this.query.limit(limitNumber).skip(startIndex);
    this.pagination = pagination;
    return this;
  }
  // Search
  search() {
    const { search } = this.queryString;
    if (search) {
      const regex = new RegExp(search, "gi");
      this.query = this.query.find({ name: regex });
    }
    return this;
  }
}
module.exports = ApiFeatures;
