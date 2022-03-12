import VideoComponent from "../components/index/Video";
import Header from "../components/layout/Header";
import styles from "../styles/index.module.scss";
import config from "../config";
import { ObjectId } from "mongodb";
import Video from "../types/Video";


type Props = {
    data: Video[],
}

function index({data}:Props) {
    return(
        <Header>
            <div className={styles.main}>
                {data.map((item) => {
                    const id = item._id.toString();
                    return <VideoComponent id={id} src={item.url} title={item.title} key={id} />
                })}
            </div>
        </Header>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${config.server}/api/video/get`);
    const data = await res.json();
    

    return { props: { data } }
}

export default index;