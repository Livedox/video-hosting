import CommentComponent from "./Comment";
import { useEffect, useState } from "react";
import { Comment } from "../../models/CommentModel";
import styles from "../../styles/watch/comment.module.scss";

type Props = {
    id: string | string[] | undefined,
}

function Comments({id}: Props) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`/api/comment/get/${id}`)
            .then((res) => res.json())
            .then((comments) => setComments(comments));
    }, []);
    return(
        <div className={styles.comments}>
            {comments.map(item => {
                return <CommentComponent user={item.userLogin} message={item.message} />
            })}
        </div>
    );
}

export default Comments;