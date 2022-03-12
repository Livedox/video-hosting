import { ObjectId } from "mongodb";
import mongoose, {Schema, Model} from "mongoose";

export type Token = {
    userId: ObjectId,
    refreshToken: string
}

const TokenSchema = new Schema<Token>({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: String, required: true}
}, {collection: "tokens"});
const TokenModel: Model<Token, {}, {}, {}> = mongoose.models.Token || mongoose.model("Token", TokenSchema);

export default TokenModel;