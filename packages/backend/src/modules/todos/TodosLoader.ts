import Todos from "./TodosModel";

export const todosLoader = async (id: string) => {
    const todoFinded = await Todos.findById(id);
    return todoFinded
};
