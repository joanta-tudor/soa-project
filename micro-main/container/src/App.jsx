import React, {useState} from "react";
import ReactDOM from "react-dom";
import { CarList } from 'counter/CarList';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "./index.css";
import {Login} from "./Login";
import {newWebSocket} from "./wsApi";

const App = () => {
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("")
    const saveToken = (value) => {
        setToken(value)
        subscribeToWs(value)
    }

    function subscribeToWs(currentToken) {
        let canceled = false;
        var closeWebSocket;
        if (currentToken?.trim()) {
            closeWebSocket = newWebSocket(token, message => {
                if (canceled) {
                    return;
                }
                const payload = message.payload;
                console.log(`ws message, payload: ${payload}`);
                setMessage(payload)
                setTimeout(()=> {
                        setMessage("")
                    }
                    ,10000);
            });
        }
        return () => {
            console.log('wsEffect - disconnecting');
            canceled = true;
            closeWebSocket?.();
        }
    }

    return (
        <div className="container">
            <h2 className={"page-title"}>Cars manager</h2>
            { message !== "" &&
                <div className={"banner"}>
                    <div className={"banner-title-div"}>
                            <label className={"banner-title"}><b>Did you know?</b></label>
                    </div>
                    <br/>
                    <br/>
                    <label className={"banner-description"}>{message}</label>
                </div>
            }
            <br/>

            <Routes>
                <Route exact path="/" element={<Login didReceiveToken={saveToken}/>}/>
                <Route exact path="/car-manager" element={<CarList value={token}/>}/>
            </Routes>
        </div>
    );
};
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app"));
