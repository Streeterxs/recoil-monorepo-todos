
export type TodoCreationProps = {
    onNewTodo(): void;
    onTodoEdit(): void;
    todoToEdit?: string
};

export function TodoCreation(props: TodoCreationProps): JSX.Element;
