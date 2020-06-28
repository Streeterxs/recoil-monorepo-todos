import { userLoader } from "./modules/user/UserLoader";
import { IUser } from "./modules/user/UserModel";

type getCurrentUserType = (identifier: string) => Promise<IUser | {me: null}>;

const getCurrentUser: getCurrentUserType = async (identifier: string) => {
    try {
        const me = await userLoader(identifier);

        return me
    } catch(err) {
        console.log('error: ', err);
        return {me: null}
    }
};

export default getCurrentUser;
