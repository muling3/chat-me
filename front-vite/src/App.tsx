import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./screens/404"
import Chat from "./screens/Chat"
import Login from "./screens/Login"
import UsersList from "./screens/UsersList"
import Header from "./components/Header";

//css
import "./main.css";

const App = () => {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/users" element={<UsersList />}/>
      <Route path="/chat" element={<Chat />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
