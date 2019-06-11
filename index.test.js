jest.mock('@google-cloud/firestore');
jest.mock('@google-cloud/storage');
jest.mock('axios');

const getMocks = () => {
  let __mockReq = {
    headers: {},
    get: function(header) {
      return this.headers[header];
    },
    method: '',
    body: {},
    query: {},
    params: {},
  };

  let __mockRes = {
    set: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
    end: jest.fn(),
    status: jest.fn(),
  };

  return {
    req: __mockReq,
    res: __mockRes,
  };
};

describe('Test postFiles', () => {

  test('It create a new page.', async () => {
    const microservice = require('./index');
    const parameters = {
      header: {
        token: '1qaz2wsx3edc4rfv',
      },
      query: {
        userId: '0okm9ijn8uhb',
        websiteId: '5tgb6yhn-7ujm-8ikl-cde3',
      },
      body: {
        type: 'page',
        filename: 'policy.ejs',
        url: 'policy',
        title: 'Policies',
      },
    };
    const mockResponse = {
      status: 202 // authorized
    };
    const mockObjectRef = {
      id: '1qaz2wsx3edc4rfv5tgb6yhn7ujm',
    };
    require('axios').__setMockResponse(mockResponse);
    require('@google-cloud/firestore').__setMockObjectRef(mockObjectRef);
    let mocks = getMocks();
    mocks.req.headers.authorization = `Beare ${parameters.header.token}`;
    mocks.req.method = 'POST';
    mocks.req.body = parameters.body;
    mocks.req.query = parameters.query;
    await microservice.postFiles(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(201);
    expect(mocks.res.send.mock.calls.length).toBe(1);
    expect(mocks.res.send.mock.calls[0][0].id).toBe(mockObjectRef.id);
  });

  // test('It creates a template.', async () => {});

  // test('It creates a page.', async () => {});

  // test('It get an error. Because the user doesn\'t have permission', async () => {});

  // test('It get an error. Because the user doesn\'t have permission', async () => {});

});