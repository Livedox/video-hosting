import styles from "../../styles/watch/video.module.scss";

interface Props {
    src: string;
    title: string;
    description: string;
}

function Video({src, title, description}: Props) {
    return(
        <div className={styles.video}>
            <video src={src} className={styles.view} controls />
            <div className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
        
    );
}

export default Video;