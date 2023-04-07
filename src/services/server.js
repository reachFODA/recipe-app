import axios from "axios";

// json-server --watch -d 180 --host IPV4 database.json
// exemplo: json-server --watch -d 180 --host 192.168.1.228 database.json

const server = axios.create({
  baseURL: "http://192.168.1.228:3000",
});

export default server;
