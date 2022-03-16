import {CommentType} from "./Comment";
import CommentComponent from "./Comment";
import { useEffect, useState } from "react";
import { Comment } from "../../models/CommentModel";

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
        <div>
            {comments.map(item => {
                return <CommentComponent user={item.userLogin} message={item.message} />
            })}
        </div>
    );
}

export default Comments;