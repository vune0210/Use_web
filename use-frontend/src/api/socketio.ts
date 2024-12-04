import {io, Socket} from "socket.io-client";

export class SocketIO {
    socket: Socket;

    constructor() {
        this.socket = io("ws://192.168.137.1:8080/mynamespace", {
            reconnectionDelayMax: 10000,
            auth: {
                token: "123"
            },
            query: {
                "my-key": "my-value"
            }
        });
    }
}