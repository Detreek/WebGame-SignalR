import { HubConnectionBuilder } from "@microsoft/signalr"

const connection = new HubConnectionBuilder().withUrl("http://localhost:5230/chathub", {withCredentials: false}).build();

connection.on("snapshot",(snapshot) => {console.log(snapshot)})
connection.invoke("func")
connection.start()
setInterval((() => connection.invoke("OnForward")), 100)
export default connection