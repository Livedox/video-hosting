import Comments from "../../components/watch/Comments";
import Input from "../../components/watch/Input";
import VideoComponent from "../../components/watch/Video";
import comments from "../../comments";
import config from "../../config";
import Video from "../../types/Video";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

type Props = {
    data: Video,
}

function watch({ data }: Props) {
    return(
        <div>
            <VideoComponent src={data.url} title={data.title} description="veri cool" />
            <Input />
            <Comments comments={comments} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => { 
    const { id } = context.query;
    const res = await fetch(`${config.server}/api/video/get/${id}`);
    const data = await res.json();

    return { props: { data } }
}

export default watch;