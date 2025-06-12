import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL);

client.on("error", (err) => console.error("redis error:", err));

console.log("redis is connected");

export default client;
