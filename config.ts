let path = "http://localhost:3000";
if (process.env.VERCEL_URL) path = "https://"+process.env.VERCEL_URL;

const config = {
    server: path
}

export default config;