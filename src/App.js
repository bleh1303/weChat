import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter  as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./styles.scss";
import { AuthContext } from "./context/AuthContext.js";
import { useContext } from "react";

function App() {

  const {currentUser} = useContext(AuthContext)  
  console.log(currentUser);
  const ProtectedRoute = ({children}) => {
    if(!currentUser)
    {
      return <Navigate to="/login"/>
    }

    return children
  }

  return (
    <>
      <Router>
          <Routes>
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
