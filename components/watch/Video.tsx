import styles from "../../styles/watch/video.module.scss";

type Props = {
    src: string,
    title: string,
    description: string,
}

function Video({src, title, description}: Props) {
    return(
        <div className={styles.video}>
            <div className={styles.videoContainer}>
                <video src={src} className={styles.view} controls />
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
        
    );
}

export default Video;