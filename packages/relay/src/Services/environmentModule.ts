import { RequestParameters, Variables, Network, Environment, RecordSource, Store } from "relay-runtime";

export type environmentModuleReturn = {
    environment: Environment,
    setAuthentication(newAuth: string): void,
    getAuthentication(): string | null
};

type environmentModuleType = (url: string, auth: string | null) => environmentModuleReturn;

const environmentModule: environmentModuleType = (url, auth) => {
    let authentication = auth;

    const getAuthentication = () => {
        return authentication
    }

    const setAuthentication = (newAuth: string) => {
        authentication = newAuth;
    }

    async function fetchGraphQL(request: RequestParameters, variables: Variables) {

        const response = await fetch(url as string, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                Authorization: `${getAuthentication()}`
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

    return {environment, setAuthentication, getAuthentication};
};

export default environmentModule;
