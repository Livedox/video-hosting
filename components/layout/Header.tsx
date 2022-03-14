import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import config from "../../config";
import getId from "../../getId";
import useToggle from "../../hooks/useToggle";
import styles from "../../styles/header.module.scss";
import Register from "../register/Register";

type Props = {
    children: ReactElement,
    isAuth: boolean | void | undefined | null,
}

type Error = {
    id: number,
    error: string
}

function Header({children, isAuth}: Props) {
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
                <Link href={`${config.server}`}>
                    <a className={styles.title}>VideoHosting</a>
                </Link>
            </div>
            
            <div className={styles.container}>
                {isAuth ? 
                <>
                    <button className={styles.button}>Sign out</button>
                    <Link href={`/upload-video`}>
                    <a className={styles.button}>
                        <svg className={styles.uploadIcon} x="0px" y="0px" viewBox="0 0 374.116 374.116">
                            <path d="M344.058,207.506c-16.568,0-30,13.432-30,30v76.609h-254v-76.609c0-16.568-13.432-30-30-30c-16.568,0-30,13.432-30,30
                                v106.609c0,16.568,13.432,30,30,30h314c16.568,0,30-13.432,30-30V237.506C374.058,220.938,360.626,207.506,344.058,207.506z"/>
                            <path d="M123.57,135.915l33.488-33.488v111.775c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30V102.426l33.488,33.488
                                c5.857,5.858,13.535,8.787,21.213,8.787c7.678,0,15.355-2.929,21.213-8.787c11.716-11.716,11.716-30.71,0-42.426L208.271,8.788
                                c-11.715-11.717-30.711-11.717-42.426,0L81.144,93.489c-11.716,11.716-11.716,30.71,0,42.426
                                C92.859,147.631,111.855,147.631,123.57,135.915z"/>
                        </svg>
                    </a></Link>
                </> :
                <>
                    <button className={styles.button}>Log in</button>
                    <button onClick={toggleRegister} className={styles.button}>Register</button>
                </>}
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