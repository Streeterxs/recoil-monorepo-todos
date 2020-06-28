import mongoose, { Schema } from 'mongoose';

export interface ITodos extends mongoose.Document {
    title: string;
    description: string;
    createdAt: number;
    updatedAt: number;
}

const todosModel = new Schema ({
    title: {
        type: String
    },
    description: {
        type: String
    }
}, {timestamps: true});

const Todos = mongoose.model('Todos', todosModel);

export default Todos;
