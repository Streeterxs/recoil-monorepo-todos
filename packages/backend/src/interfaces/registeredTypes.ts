import User from "../modules/user/UserModel";
import { userLoader } from "../modules/user/UserLoader";

const registeredTypes = [
    {
        name: 'User',
        qlType: 'UserType',
        dbType: User,
        loader: userLoader
    }
]

export default registeredTypes;