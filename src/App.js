import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/landing/common/FontAwesomeLibrary";
import Landing from "./Components/landing/Landing";
import Account from "./Components/account/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verify as user_verify } from "./api/userCalls";
import PreLoader from "./Components/account/common/Preloader";

const renderComp = (props, Comp) => <Comp {...props} />;
const __tried_login__ = { stat: false };
function App() {
  const [logged_in, setLoggedIn] = useState({
    status: false,
    user_role: null,
    access_token: "",
  });
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    (async () => {
      if (!__tried_login__.stat && !logged_in.status) {
        __tried_login__.stat = true;
        setBusy(true);
        try {
          const __verify = await user_verify(logged_in.access_token);
          if (__verify) setLoggedIn({ ...__verify, status: true });
          setBusy(false);
        } catch (err) {
          //Either no access_token, invalid access_token or expired access_token
        }
      }
    })();
  }, [logged_in]);
  const handleLogin = (stat) => {
    setLoggedIn(stat);
  };
  return (
    <>
      <Switch>
        <Route
          path="/account"
          render={(props) =>
            renderComp(
              { ...props, logged_in: logged_in.status, user: logged_in },
              Account
            )
          }
        />
        <Route
          path="/"
          render={(props) =>
            renderComp(
              { handleLogin, ...props, logged_in: logged_in.status },
              Landing
            )
          }
        />
      </Switch>
      <PreLoader busy={busy} />
      <ToastContainer autoClose={3000} style={{ top: 70 }} hideProgressBar />
    </>
  );
}

export default App;
