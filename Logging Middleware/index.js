import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let accessToken = process.env.ACCESS_TOKEN;

export function setToken(token) {
  accessToken = token;
}

export async function log({ stack, level, pack, message }) {
  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: pack,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
}

export function loggingMiddleware(req, res, next) {
  log({
    stack: "backend",
    level: "info",
    pkg: "route",
    message: `${req.method} ${req.url}`
  });
  next();
}
