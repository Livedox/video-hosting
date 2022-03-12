import mongoose, {Schema, Model} from "mongoose";

export type User = {
    login: string,
    email: string,
    password: string,
    isEmailVerified: boolean,
    registrationDate: Date,
    verificationLink: string,
}

const UserSchema = new Schema<User>({
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isEmailVerified: {type: Boolean, default: false},
    registrationDate: {type: Date, default: new Date()},
    verificationLink: String
}, {collection: "users"});
const UserModel: Model<User, {}, {}, {}> = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;