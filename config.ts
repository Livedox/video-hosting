const url = process.env.VERCEL_URL || process.env.API_URL;
let path = !!url ? url : "http://localhost:3000";

const config = {
    server: path
}

export default config;