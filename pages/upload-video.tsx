import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import checkAuth from "../client-server/chechAuth";
import Header from "../components/layout/Header";
import config from "../config";
import styles from "../styles/upload-video.module.scss";


function UploadVideo() {
    const [file, setFile] = useState<File>();

    const change = (e: React.ChangeEvent) => {
        const files = (e.target as HTMLInputElement).files;
        if(files) setFile(files[0]);
    }

    const upload = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!file) return;
        const form = e.target as HTMLFormElement;
        const data = new FormData();
        data.append("file", file);
        data.append("title", form.titleVideo.value);
        data.append("description", form.description.value);
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("video/*");
        xhr.open("POST", "/api/video/add", true);
        xhr.send(data);
    }
    
    useEffect(() => {
        const label = document.querySelector(`.${styles.labelVideo}`)!;
        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            label.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults (e:Event) {
            e.preventDefault();
            e.stopPropagation();
        }

        const handleDrop = (e: any) => {
            const dt = e.dataTransfer!;
            if (/^video/.test(dt.files[0].type)) {
                setFile(dt.files[0]);
            }
        }
        label.addEventListener("drop", handleDrop, false);
    }, []);

    useEffect(() => {
        const preview = document.querySelector<HTMLVideoElement>(`.${styles.video}`)!;
        if(file) preview.src = URL.createObjectURL(file);
    }, [file]);
    return(
        <Header isAuth={true}>
            <div>
                <form method="POST" onSubmit={upload} className={styles.container}>
                    <input className={`${styles.input} ${styles.borderBottom}`} type="text" name="titleVideo" placeholder="Title" />
                    <input className={`${styles.input} ${styles.borderBottom}`} type="description" name="description" placeholder="Description (Can be left blank)" />
                    <div className={styles.videoDropContainer}>
                        <video className={styles.video} autoPlay />
                        <label htmlFor="inputVideo" className={styles.labelVideo}>Please select a file</label>
                        <input onChange={change} id="inputVideo" className={`${styles.input} ${styles.file}`} type="file" name="video" accept="video/*" />
                    </div>
                    <input className={`${styles.input} ${styles.submit}`} type="submit" value="Send" />
                </form>
            </div>
        </Header>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if((!await checkAuth(ctx))) return {
        redirect: {
            destination: `${config.server}`,
            permanent: false,
        },
    }

    return {props: {user: "Bob"}};
}


export default UploadVideo;