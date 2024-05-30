import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/Auth";
import { login, logOut } from "./store/AuthSlice";
import {Header ,Footer} from './Components/index.js'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => setLoading(false));
  }, []);

 return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">Test
  <div className="w-full block">
   <Header />
   <main>
     {/* Todo: Outlet */}
   </main>
   <Footer />
  </div>
  </div>
 ) : null
}

export default App;
