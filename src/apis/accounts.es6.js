import apiRequest from '../apiBase/apiRequest';
import Account from '../models2/Account';

const getPath = (query) => {
  if (query.loggedOut) {
    return 'api/me.json';
  } else if (query.user === 'me') {
    return 'api/v1/me';
  }

  return `user/${query.user}/about.json`;
};

const parseGetBody = apiResponse => {
  const { body } = apiResponse.response;

  if (body) {
    const data = {
      name: 'me', // me is reserved, this should only stay me in the logged out case
      loid: body.loid,
      loid_created: body.loid_created,
      ...(body.data || body),
    };

    apiResponse.addResult(Account.fromJSON(data));
  }

  return apiResponse;
};

export default {
  get(apiOptions, query) {
    const path = getPath(query);

    return apiRequest(apiOptions, 'GET', path, { query }).then(parseGetBody);
  },
};
