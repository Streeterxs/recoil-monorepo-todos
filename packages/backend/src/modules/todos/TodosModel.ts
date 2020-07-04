import mongoose, { Schema } from 'mongoose';

export interface ITodos extends mongoose.Document {
    content: string;
    createdAt: number;
    updatedAt: number;
}

const todosModel = new Schema ({
    content: {
        type: String
    }
}, {timestamps: true});

const Todos = mongoose.model<ITodos>('Todos', todosModel);

export default Todos;
