import {CommentType} from "./Comment";
import Comment from "./Comment";

interface Props {
    comments: CommentType[];
}

function Comments({comments}: Props) {
    return(
        <div>
            {comments.map(item => {
                return <Comment user={item.user} message={item.message} />
            })}
        </div>
    );
}

export default Comments;