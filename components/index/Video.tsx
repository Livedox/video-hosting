import Link from "next/link";
import { useEffect, useRef } from "react";
import useToggle from "../../hooks/useToggle";
import styles from "../../styles/index/video.module.scss";

interface Props {
    src: string;
    title: string;
    id: string;
}

function Video({src, title, id}:Props) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const enter = () => {
        videoRef.current!.play();
    }
    const leave = () => {
        videoRef.current!.pause();
        videoRef.current!.currentTime = 0;
    }

    const [isSoundActive, toggleSound] = useToggle();
    const clickSound = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        toggleSound();
        videoRef.current!.muted = isSoundActive;
    }
    useEffect(() => {
        videoRef.current!.muted = !isSoundActive;
    });
    return(
        <div className={styles.video} onMouseEnter={enter} onMouseLeave={leave}>
            <div className={styles.sound} onClick={clickSound}><span>{isSoundActive ? "🕪" : "🕨"}</span></div>
            <Link href={`/watch/${id}`}>
            <a className={styles.videoLink}>
                <video ref={videoRef} className={styles.view} src={src} loop />
                <h2>{title}</h2>
            </a>
            </Link>
        </div>
    );
}

export default Video;