import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import Router from "./Router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, []);
  const window_width = window.innerWidth
  return (
    <>
      <Header />
      <Container maxWidth ="lg">
        <Router />
      </Container>
    </>
  );
}

export default App;
