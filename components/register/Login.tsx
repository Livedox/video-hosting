import React from "react";
import styles from "../../styles/register/register.module.scss";
import RegisterLayout from "./RegisterLayout";
import Router from "next/router";


interface Props {
    isLogin: boolean;
    toggleLogin: () => void;
    setErrors: (errors: string[]) => void;
}

type Response = {
    type: string,
    errors: string[] | undefined
}

function Register({isLogin, toggleLogin, setErrors}: Props) {
    const register = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const res = await fetch("/api/login", {
            body: JSON.stringify({
                login: form.login.value,
                password: form.password.value,
            }),
            headers: {"Content-Type": "application/json"},
            method: "POST"
        });

        const json: Response = await res.json();
        if(json.errors) {
            setErrors(json.errors);
            return;
        }
        Router.push("/");
        toggleLogin();
    }

    return(
        <RegisterLayout isActive={isLogin} toggleActive={toggleLogin}>
            <>
                <h3 className={styles.title}>Login</h3>
                <form method="POST" className={styles.form} onSubmit={register}>
                    <div className={styles.formContainer}>
                        <p className={styles.text}>Login</p>
                        <input name="login" className={styles.input} type="text" placeholder="login" />
                        <p className={styles.text}>Password</p>
                        <input name="password" className={styles.input} type="password" placeholder="password" />
                    </div>
                    <div className={styles.buttons}>
                        <input onClick={toggleLogin} className={`${styles.cancel} ${styles.button}`} type="button" value="cancel" />
                        <input className={`${styles.enter} ${styles.button}`}  type="submit" value="submit" />
                    </div>
                </form>
            </> 
        </RegisterLayout>
    );
}

export default Register;