let path = !`${process.env.API_URL}` ? `${process.env.API_URL}` : "http://localhost:3000";

console.log(path);

const config = {
    server: path
}

export default config;