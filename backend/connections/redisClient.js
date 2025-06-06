import Redis from "ioredis";

const client = new Redis(
  "rediss://default:AVm8AAIjcDFhMzdmMjA3NWMxMzg0NDkyYTA4NzIzZDM3NjE5OGUwYnAxMA@maximum-gecko-22972.upstash.io:6379"
);

// const client = new Redis(process.env.REDIS_URL);

client.on("error", (err) => console.error("redis error:", err));

console.log("redis is connected");

export default client;
