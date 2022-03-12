import { ReactElement, useEffect, useState } from "react";
import getId from "../../getId";
import useToggle from "../../hooks/useToggle";
import styles from "../../styles/header.module.scss";
import Register from "../register/Register";

interface Props {
    children: ReactElement;
}

type Error = {
    id: number,
    error: string
}

function Header({children}: Props) {
    const [isRegister, toggleRegister] = useToggle();
    const [errors, setErrors] = useState<Error[]>([]);
    
    const updateErrors = (newErrors: string[]) => {
        newErrors.forEach((item) => {
            const id = getId();
            const error: Error = {id, error: item};
            setErrors((prev) => [...prev, error]);

            setTimeout(() => {
                setErrors((prev) => prev.filter(value => value.id !== id));
            }, 5000);
        });
        
    }

    return(
        <>
        <header className={styles.header}>
            <div>
                <a href="./" className={styles.title}>VideoHosting</a>
            </div>
            <div className={styles.container}>
                <button className={styles.register}>Log in</button>
                <button onClick={toggleRegister} className={styles.register}>Register</button>
            </div>
        </header>
        <div className={styles.errors}>
            {errors.map((item) => {
                return <div className={styles.error} key={item.id}>
                    {item.error}
                </div>
            })}
        </div>
        <Register isRegister={isRegister} toggleRegister={toggleRegister} setErrors={updateErrors} />
        {children}
        </>
    );
}

export default Header;