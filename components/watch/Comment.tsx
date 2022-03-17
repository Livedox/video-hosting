import styles from "../../styles/watch/comment.module.scss";

export type CommentType = {
    user: string,
    message: string,
}

function Comment({user, message}: CommentType) {
    return(
        <div className={styles.comment}>
            <h3 className={styles.comment__title}>{user}</h3>
            <p className={styles.comment__message}>{message}</p>
        </div>
    );
}

export default Comment;