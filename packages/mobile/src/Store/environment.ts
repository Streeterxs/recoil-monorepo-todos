import { atom, useRecoilState, selector } from "recoil";

import { environmentModule } from "@StreeterxsTodos/relay";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import { Device } from "../Services";

const {
    environment,
    setAuthentication,
    getAuthentication
} = environmentModule(`http://192.168.1.2:3333/graphql`, '');

Device.getDevice().then(device => {
    console.log('device: ', device);
    setAuthentication(device);
});

export const environmentState = atom<RelayModernEnvironment>({
    key: 'environment',
    default: environment
});

export const deviceSelector = selector<string | null>({
    key: 'device',
    get: async () => {
        return await Device.getDevice()
    }
});

export { setAuthentication, getAuthentication };
