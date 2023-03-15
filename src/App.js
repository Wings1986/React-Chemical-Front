
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import AddChemical from "./screens/AddChemical";
import { useEffect, useState } from "react";
import {api_url} from './utils/constants'
import Welcome from "./screens/Welcome";

function App() {
  const { token} = JSON.parse(localStorage.getItem("user_info")) || "";

  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [chemicals, setChemicals] = useState([]);

  const fetchChemicals = (token) => {
      console.log('test');
    fetch(api_url + "/chemicals", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          setChemicals(data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchChemicals(token);
  }, []);

  const addChemical =  (chem) => {
    const chemical = {
      _id: chem._id,
      chemicalName: chem.chemicalName,
      chemicalQuantity: chem.chemicalQuantity
    };
    setChemicals((oldArr) => [...oldArr, chemical]);
  };
  const handleChemicalDelete = (id) => {
    fetch(api_url + `/chemicals/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setChemicals(chemicals.filter((chemical) => chemical._id !== id));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    setIsLoggedIn("true");
  };

  const handleLogout = () => {
    setIsLoggedIn("false");
    localStorage.removeItem("user_info")
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route
        exact
        path="/login"
        render={(props) => {
          if (isLoggedIn === "true" || token) {
            return <Redirect to="/" />;
          }
          return (
            <Login
              {...props}
              handleLogin={handleLogin}
              fetchChemicals={fetchChemicals}
            />
          );
        }}
      />
      <Route
        exact
        path="/register"
        render={(props) => {
          if (isLoggedIn === "true" || token) {
            return <Redirect to="/" />;
          }
          return (
            <Register
              {...props}
              handleLogin={handleLogin}
              fetchChemicals={fetchChemicals}
            />
          );
        }}
      />
      <Route
        exact
        path="/dashboard"
        render={(props) => {
          if (isLoggedIn === "true" || token) {
            return (
              <Dashboard
                {...props}
                  chemicals={chemicals}
                fetchChemicals={() => fetchChemicals(token)}
                addChemical={addChemical}
                handleChemicalDelete={handleChemicalDelete}
                initialChemicals={chemicals}
              />
            );
          }
          return <Redirect to="/login" />;
        }}
      />
        <Route
            exact
            path="/add-chemical"
            render={(props) => {
                if (isLoggedIn === "true" || token) {
                    return <AddChemical fetchChemicals={() => fetchChemicals(token)} addChemical={addChemical} {...props} />;
                }
                return <Redirect to="/login" />;
            }}
        />
        <Route
            exact
            path="/welcome"
            render={(props) => {
                if (isLoggedIn === "true" || token) {
                    return <Welcome token={token} />;
                }
                return <Redirect to="/login" />;
            }}
        />
      <Footer />
    </div>
  );
}

export default App;
