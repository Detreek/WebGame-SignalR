import { HubConnectionBuilder } from "@microsoft/signalr"

const connection = new HubConnectionBuilder().withUrl("http://localhost:5230/chathub", {withCredentials: false}).build();


connection.start()

export default connection