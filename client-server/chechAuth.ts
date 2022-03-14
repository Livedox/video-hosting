import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import config from "../config";

async function checkAuth(ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    const cookie = ctx.req ? ctx.req.headers.cookie : "";
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Cookie", cookie as string);
    const res = await fetch(`${config.server}/api/check-authorization`, {
        credentials: "include",
        headers: requestHeaders
    });
    const data = await res.json();
    if(data.type !== "ok") return {
        redirect: {
            destination: `${config.server}`,
            permanent: false,
        },
    }

    return null;
}

export default checkAuth;