import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewBook from "./pages/NewBook";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import UserProvider from "./contexts/UserContext";
import ErrorProvider from "./contexts/GlobarErrorContext";
import GlobalError from "./components/GlobalError";
import Redirect from "./components/Redirect";
import MyBook from "./pages/MyBook";

const App = () => {
  return (
    <UserProvider>
      <ErrorProvider>
        <BrowserRouter>
          <Navbar />
          <GlobalError />
          <Redirect disabled>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/newbook" element={<NewBook />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/mybook/:bookId" element={<MyBook />} />
            </Routes>
          </Redirect>
        </BrowserRouter>
      </ErrorProvider>
    </UserProvider>
  );
};

export default App;
