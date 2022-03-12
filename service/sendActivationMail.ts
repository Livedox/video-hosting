import nodemailer from "nodemailer";
import { google } from "googleapis";
import config from "../config";

const sendActivationMail = (function() {
    const oAuth2Client = new google.auth.OAuth2(
        `${process.env.MAIL_CLIENT_ID}`,
        `${process.env.MAIL_CLIENT_SECRET}`,
        `${process.env.MAIL_REDIRECT_URI}`);
    
    
    oAuth2Client.setCredentials({refresh_token: `${process.env.MAIL_REFRESH_TOKEN}`});

    return async (email: string, link: string) => {
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: "videohosting43123@gmail.com",
                clientId: `${process.env.MAIL_CLIENT_ID}`,
                refreshToken: `${process.env.MAIL_REFRESH_TOKEN}`,
                accessToken: accessToken.token!
            }
        });

        await transporter.sendMail({
            from: `${process.env.MAIL_USER}`,
            to: email,
            subject: `Activation on ${config.server}`,
            text: "",
            html: `
                <div>
                    <h1>To activate, follow the link</h1>
                    <a href="${link}">${link}</a>
                </div>`
        });
    }
})();

export default sendActivationMail;