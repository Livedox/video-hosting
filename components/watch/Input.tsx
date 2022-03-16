type Props = {
    id: string | string[] | undefined,
}

function Input({ id }: Props) {
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
    return(
        <form method="POST" onSubmit={add}>
            <input name="message" type="text" placeholder="Введите текст комментария" />
            <input type="submit" />
        </form>
    );
}

export default Input;