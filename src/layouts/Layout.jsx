import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { Toaster } from "react-hot-toast"

const Layout = ({children}) => {
    return (
        <div className="min-h-screen bg-white flex">
            <Toaster />
            <Sidebar />
        <div className="flex-1 flex flex-col p-6">
            <Navbar page="Admin" />
        <div className="p-8">{children}</div>
        </div>
        </div>
    )
}

export default Layout