import { RequestParameters, Variables, Network, Environment, RecordSource, Store } from "relay-runtime";

type environmentModuleType = (url: string, auth: string) => Environment;
const environmentModule: environmentModuleType = (url, auth) => {

    async function fetchGraphQL(request: RequestParameters, variables: Variables) {

        const response = await fetch(url as string, {
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
    };

    const networkWrapper = () => {
        const network = Network.create(fetchGraphQL);
        return network;
    }
    
    const environment = new Environment({
        network: networkWrapper(),
        store: new Store(new RecordSource())
    });

    return environment;
};

export default environmentModule;