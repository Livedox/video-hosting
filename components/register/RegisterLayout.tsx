import { ReactElement } from "react";
import styles from "../../styles/register/option.module.scss";

interface Props {
    children: ReactElement;
    isActive: boolean;
    toggleActive: () => void;
}

function RegisterLayout({children, isActive, toggleActive}: Props) {
    const stop = (e: React.MouseEvent) => {
        e.stopPropagation();
    }
    return(
        <div className={`${styles.option} ${isActive ? styles.option_active : ""}`} onClick={toggleActive}>
            <div className={styles.container} onClick={stop}>
                <div className={styles.register}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default RegisterLayout;