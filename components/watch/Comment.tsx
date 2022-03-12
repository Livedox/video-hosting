export interface CommentType {
    user: string;
    message: string;
}

function Comment({user, message}: CommentType) {
    return(
        <div>
            <h3>{user}</h3>
            <p>{message}</p>
        </div>
    );
}

export default Comment;