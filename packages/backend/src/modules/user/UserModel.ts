import mongoose, {Schema} from 'mongoose';

export interface IUser extends mongoose.Document {
    identifier: string;
    todos: string[];
    createdAt: number;
    updatedAt: number;
}

export interface IUserModel extends mongoose.Model<IUser> {
    findUserByIdentifier(identifier: string): IUser;
}

const userSchema = new Schema({
    identifier: {
        type: String,
        unique: true
    },
    todos: {
        type: [String]
    }
}, {timestamps: true});


userSchema.statics.findUserByIdentifier = async (identifier: string) => {
    try {
        const userFinded = await User.findOne({identifier});
        return userFinded;
    } catch (error) {
        console.log('error: ', error);
    }
}


const User = mongoose.model<IUser, IUserModel>('User_todo', userSchema);

export default User;
