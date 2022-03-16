import { ObjectId } from "mongodb";
import mongoose, {Schema, Model} from "mongoose";

export type Comment = {
    userId: ObjectId,
    videoId: ObjectId,
    userLogin: string,
    message: string,
}

const CommentSchema = new Schema<Comment>({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    videoId: {type: Schema.Types.ObjectId, ref: "Video"},
    message: {type: String, required: true, default: "error"},
    userLogin: {type: String, default: "anonim"}
}, {collection: "comments"});
const CommentModel: Model<Comment, {}, {}, {}> = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default CommentModel;