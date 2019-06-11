/**
 * https://jestjs.io/docs/en/manual-mocks
 */

let Firestore = jest.genMockFromModule('@google-cloud/firestore');

let __mockObjectRef = {
  id: '',
};
const __setMockObjectRef = (newObjectRef) => {
  __mockObjectRef = newObjectRef;
};
Firestore.__setMockObjectRef = __setMockObjectRef;

const collection = function () {
  return {
    doc: function () {
      return collection;
    },
    add: function () {
      return new Promise((resolve, reject) => {
        resolve(__mockObjectRef);
      });
    },
  };  
};

Firestore.collection = collection;

module.exports = Firestore;