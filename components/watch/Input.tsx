import { useState } from "react";
import useToggle from "../../hooks/useToggle";
import styles from "../../styles/watch/input.module.scss";

type Props = {
    id: string | string[] | undefined,
}

function Input({ id }: Props) {
    const [isActive, setActive] = useState(false);

    const add = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const res = await fetch(`/api/comment/add/${id}`, {
            body: JSON.stringify({
                message: form.message.value,
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST"
        });
        const json: Response = await res.json();
        console.log(json);
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