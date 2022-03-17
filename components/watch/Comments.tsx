import CommentComponent from "./Comment";
import { Comment } from "../../models/CommentModel";
import styles from "../../styles/watch/comment.module.scss";
import getId from "../../getId";


type Props = {
    comments: Comment[],
}

function Comments({comments}: Props) {
    return(
        <div className={styles.comments}>
            {comments.map(item => {
                return <CommentComponent user={item.userLogin} message={item.message} key={getId()} />
            })}
        </div>
    );
}

export default Comments;