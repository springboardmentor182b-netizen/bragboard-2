import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function App() {
  // Hardcoded role: "admin" or "user"
  const role = "user"; // change to "user" to test user view

  return (
    <BrowserRouter>
      <Routes>
        {role === "admin" ? (
          <>
            <Route path="/home" element={<AdminHome role={role} />} />
            <Route path="/reports" element={<Reports role={role} />} />
            <Route path="/settings" element={<Settings role={role} />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home role={role} />} />
            <Route path="/reports" element={<Reports role={role} />} />
            <Route path="/settings" element={<Settings role={role} />} />
          </>
        )}
        <Route path="*" element={role === "admin" ? <AdminHome role={role} /> : <Home role={role} />} />
      </Routes>
    </BrowserRouter>
  );
}
