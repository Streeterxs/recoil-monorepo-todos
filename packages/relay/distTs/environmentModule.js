import { Network, Environment, RecordSource, Store } from "relay-runtime";

const environmentModule = (url, auth) => {
  async function fetchGraphQL(request, variables) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify({
        query: request.text,
        variables
      })
    });
    return await response.json();
  }

  ;

  const networkWrapper = () => {
    const network = Network.create(fetchGraphQL);
    return network;
  };

  const environment = new Environment({
    network: networkWrapper(),
    store: new Store(new RecordSource())
  });
  return environment;
};

export default environmentModule;