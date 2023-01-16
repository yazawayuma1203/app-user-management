import React from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";

const CLIENT_ID = "765410884034-241s5217dqnd5fgpci8l8usgcc5rq6jl.apps.googleusercontent.com";

export const Login = () => {
    const history = useHistory();
    const success = () => {
        history.push("/home");
    };
    const error = () => {
        history.push("/setting");
    };
    return (
        <div>
        <h1>ログイン画面</h1>
        <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Googleでログイン"
            onSuccess={success}
            onFailure={error}
            cookiePolicy={"single_host_origin"}
        />
        </div>
    );
};