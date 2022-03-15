import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import config from "../config";
import cookie, { CookieSerializeOptions } from "cookie";

async function fetchWithCookie(url: string, ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    const cookie = ctx.req ? ctx.req.headers.cookie : "";
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Cookie", cookie as string);
    const res = await fetch(url, {
        credentials: "include",
        headers: requestHeaders
    });
    return res;
}

async function checkAuth(ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
    const result = await (await fetchWithCookie(`${config.server}/api/check-authorization`, ctx)).json();
    if(result.type === "ok") return true;


    const data = await (await fetchWithCookie(`${config.server}/api/refresh`, ctx)).json();
    const cookieOptions: CookieSerializeOptions = {
        httpOnly: true,
        maxAge: 2_592_000_000,//30d
        secure: true,
        path: "/"
    };

    if(data.userData) {
        ctx.res.setHeader("Set-Cookie", [cookie.serialize("refreshToken", data.userData.refreshToken, cookieOptions),
            cookie.serialize("accessToken", data.userData.accessToken, {...cookieOptions, maxAge:1_800_000})]);
        return true;
    }
    return false;
}

export default checkAuth;