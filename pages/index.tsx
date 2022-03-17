import VideoComponent from "../components/index/Video";
import Header from "../components/layout/Header";
import styles from "../styles/index.module.scss";
import config from "../config";
import { ObjectId } from "mongodb";
import Video from "../types/Video";
import checkAuth from "../client-server/chechAuth";
import { GetServerSideProps } from "next";


type Props = {
    data: {
        videos: Video[],
        isAuth: boolean
    },
}

function index({data}:Props) {
    return(
        <Header isAuth={data.isAuth}>
            <>
            <div className={styles.main}>
                {!data.videos.length ? "Video upload on vercel don't work! Use local" : ""}
                {data.videos.map((item) => {
                    const id = item._id.toString();
                    return <VideoComponent id={id} src={item.url} title={item.title} key={id} />
                })}
            </div>
            </>
        </Header>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const res = await fetch(`${config.server}/api/video/get`);
    const videos = await res.json();
    
    const auth = await checkAuth(ctx);
    const data = {
        videos,
        isAuth: auth,
    }; 

    return { props: { data } }
}

export default index;