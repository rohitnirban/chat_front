import { io } from "socket.io-client";
import React from "react";
const SOCKET_URL = "http://back.royad.ga";
export const socket = io(SOCKET_URL);
// app context
export const AppContext = React.createContext();
