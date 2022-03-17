import Comments from "../../components/watch/Comments";
import Input from "../../components/watch/Input";
import VideoComponent from "../../components/watch/Video";
import config from "../../config";
import { Video } from "../../models/VideoModel";
import { GetServerSideProps } from "next";
import checkAuth from "../../client-server/chechAuth";
import Header from "../../components/layout/Header";
import styles from "../../styles/watch/index.module.scss";


type Props = {
    data: {
        video: Video,
        isAuth: boolean,
        id: string | string[] | undefined
    },
}

function watch({ data }: Props) {
    return(
        <Header isAuth={data.isAuth}>
            <div className={styles.main}>
                <VideoComponent src={data.video.url} title={data.video.title} description={data.video.description} />
                <Input id={data.id} />
                <Comments id={data.id} />
            </div>
        </Header>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => { 
    const { id } = ctx.query;
    const res = await fetch(`${config.server}/api/video/get/${id}`);
    const video = await res.json();
    
    const auth = await checkAuth(ctx);
    const data = {
        video,
        isAuth: auth,
        id
    };

    return { props: { data } }
}

export default watch;