import { GetServerSideProps } from "next";
import checkAuth from "../client-server/chechAuth";
import Header from "../components/layout/Header";
import config from "../config";


function uploadVideo() {
    const upload = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const file = form.video.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("title", form.titleVideo.value);
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("video/*");
        xhr.open("POST", "/api/video/add", true);
        xhr.send(data);
    }
    return(
        <Header isAuth={true}>
            <div>
                <form method="POST" onSubmit={upload}>
                    <input type="text" name="titleVideo" />
                    <input type="file" name="video" accept="video/*" />
                    <input type="submit" />
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


export default uploadVideo;