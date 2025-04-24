import { Link } from "react-router-dom"
import { FaUser,FaClock,FaClipboard } from "react-icons/fa"

const Sidebar = () => {
    return (
        <div className="w-64 min-h-screen border-r-1 border-gray-400 flex flex-col p-6">
            <h1 className="font-extrabold text-xl">LKS MART</h1>
            <ul className="flex flex-col gap-6  menu rounded-box w-56 font-semibold mt-10">
                <li><Link className="flex gap-2 items-center" to= "/admin-kelola-user"><FaUser /> Kelola User</Link></li>
                <li><Link className="flex gap-2 items-center" to="/admin-kelola-laporan"><FaClipboard /> Kelola Laporan</Link></li>
                <li><Link className="flex gap-2 items-center" to ="/admin"><FaClock /> Log Activity</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar