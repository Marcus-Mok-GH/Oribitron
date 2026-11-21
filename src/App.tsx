import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./lib/auth";
import Home from "./pages/Home";
import Models from "./pages/Models";
import ModelDetail from "./pages/ModelDetail";
import Compare from "./pages/Compare";
import Calculator from "./pages/Calculator";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:slug" element={<ModelDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
