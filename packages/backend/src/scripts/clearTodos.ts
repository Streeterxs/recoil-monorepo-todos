import { connectDatabase } from "../database";
import Todos from "../modules/todos/TodosModel";



(async () => {
    console.log('Connection to the database...');
    await connectDatabase();

    await Todos.deleteMany({}, () => console.log('deleted'));

    process.exit(0);
})();
