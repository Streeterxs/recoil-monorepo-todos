import { atom, useRecoilState } from "recoil";

import { environmentModule } from "@StreeterxsTodos/relay";
import config from "../config";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import { Device } from "src/Services";

console.log('entrou módulo store environment');

const {
    environment,
    setAuthentication,
    getAuthentication
} = environmentModule(`${config.GRAPHQL_URL}`, '');

Device.getDevice().then(device => setAuthentication(device));

export const environmentState = atom<RelayModernEnvironment>({
    key: 'environment',
    default: environment
});

export { setAuthentication, getAuthentication };
