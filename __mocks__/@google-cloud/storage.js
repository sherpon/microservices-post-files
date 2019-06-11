/**
 * https://jestjs.io/docs/en/manual-mocks
 */

const { Storage } = jest.genMockFromModule('@google-cloud/storage');

module.exports = Storage;
