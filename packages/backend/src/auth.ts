
type getCurrentUserType = (identifier: string) => Promise<any | {me: null}>;

const getCurrentUser: getCurrentUserType = async (identifier: string) => {
    try {
        // const meFinded = meLoader
        // return meFinded;

        return {}
    } catch(err) {
        console.log('error: ', err);
        return {me: null}
    }
};

export default getCurrentUser;
