import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import LogActivity from "./pages/admin/LogActivity";
import KelolaUser from "./pages/admin/KelolaUser";
import KelolaBarang from "./pages/gudang/KelolaBarang";
import KelolaLaporan from "./pages/admin/KelolaLaporan";
import KelolaTransaksi from "./pages/kasir/KelolaTransaksi";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/admin" element={<LogActivity />}/>
      <Route path="/admin-kelola-user" element={<KelolaUser />}/>
      <Route path="/admin-kelola-laporan" element={<KelolaLaporan />}/>
      <Route path="/gudang" element={<KelolaBarang />}/>
      <Route path="/kasir" element={<KelolaTransaksi />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;