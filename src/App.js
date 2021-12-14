import "./App.css";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

function App() {
  const [loggedData, setLoggedData] = useState();

  const onClickLogin = async () => {
    // 프로젝트 아이디로 수정하세요.
    const projectId = "ccc15289-9634-4cbe-bd2a-449d539a8cdc";
    const redirectUri = window.location.protocol + "//" + window.location.host;

    const queryString = new URLSearchParams({
      client_id: projectId,
      redirect_uri: redirectUri,
    }).toString();

    const loginUrl = `https://mrlogin.io/login?${queryString}`;

    // provider 를 지정하면 원하는 소셜로그인 화면을 다이렉트로 표시할 수 있습니다.
    // const loginUrl = `https://mrlogin.io/auth/${provider}/login?${queryString}`;

    window.location.href = loginUrl;
  };

  useEffect(() => {
    let parsedUrl = new URL(window.location.href);
    const accessToken = parsedUrl.searchParams.get("access_token");
    const refreshToken = parsedUrl.searchParams.get("refresh_token");

    if (accessToken || refreshToken) {
      setLoggedData({
        accessToken: jwt.decode(accessToken),
        refreshToken: refreshToken,
      });
    }
  }, []);

  return (
    <div className="app">
      <button className="loginButton" onClick={onClickLogin}>
        로그인 버튼
      </button>
      <pre className="jwtPre">{JSON.stringify(loggedData, null, 2)}</pre>
    </div>
  );
}

export default App;
