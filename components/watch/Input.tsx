import { useState } from "react";
import styles from "../../styles/watch/input.module.scss";
import { Comment } from "../../models/CommentModel";


type Props = {
    id: string | string[] | undefined,
    addComment: (comment: Comment) => void;
}

function Input({ id, addComment }: Props) {
    const [isActive, setActive] = useState(false);

    const add = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if(!form.message.value) return;
        const res = await fetch(`/api/comment/add/${id}`, {
            body: JSON.stringify({
                message: form.message.value,
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST"
        });
        const data = await res.json();
        if (data.type === "ok") addComment(data.comment);
        console.log(data);
    }

    const changeActive = (active: boolean) => () => setActive(active);
    return(
        <form method="POST" onSubmit={add}>
            <input onFocus={changeActive(true)} className={styles.input} name="message" type="text" placeholder="Enter comment text" />
            <div className={`${styles.container} ${isActive ? styles.container_active : ""}`}>
                <input type="button" value="Cancel" onClick={changeActive(false)} className={`${styles.cancel} ${styles.button}`} />
                <input className={`${styles.submit} ${styles.button}`} type="submit" value="Submit comment" />
            </div>
        </form>
    );
}

export default Input;