import User, { IUser } from "./UserModel";

export const userLoader = async (identifier: string) => {
    const userFinded = await User.findUserByIdentifier(identifier)
    return userFinded
};
