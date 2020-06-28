import User from "../modules/user/UserModel";
import { userLoader } from "../modules/user/UserLoader";
import Todos from "../modules/todos/TodosModel";
import { todosLoader } from "../modules/todos/TodosLoader";

const registeredTypes = [
    {
        name: 'User',
        qlType: 'UserType',
        dbType: User,
        loader: userLoader
    },
    {
        name: 'Todos',
        qlType: 'TodosType',
        dbType: Todos,
        loader: todosLoader
    }
]

export default registeredTypes;