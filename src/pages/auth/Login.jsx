import { useState } from "react"
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { supabase } from "../../config/supabaseClient";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault()

        const {data , error} = await supabase 
            .from("tbl_user")
            .select("*")
            .eq("username", username)
            .eq("password", password)
            .single();
        
            if(!data || error) {
                setError("Username Atau Password Salah")
            }else {
                localStorage.setItem('user', JSON.stringify(data))
                await supabase
                .from("tbl_log")
                .insert([{
                    aktivitas: "Login",
                    id_user : data.id_user,
                }])

                const role = data.tipe_user

                if(role === "admin"){
                    window.location.href = "/admin"
                }
                if(role === "gudang"){
                    window.location.href = "/gudang"
                }
                if(role === "kasir"){
                    window.location.href = "/kasir"
                }
        }
        
    }
    return(
        <div className="min-h-screen bg-white flex">
            <div className="bg-black flex items-center justify-center w-1/2">
                <h1 className="font-extrabold text-white text-5xl ">LKS MART</h1>
            </div>
            <div className="mt-20 p-8 ">
                <h1 className="text-2xl font-bold">Masuk</h1>
                <p className="mt-5 text-md">Masuk untuk melanjutkan</p>
                {error && (
                    <div className="text-red-500 font-extrabold">{error}</div>
                )}
                <form className="mt-20 gap-6 flex flex-col">
                    <label className="font-semibold">Username</label>
                    <input type="text" className="input w-[500px]" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label className="font-semibold">Password</label>
                    <input type="password" className="input w-[500px]" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="flex gap-4 mt-10">
                        <button type="button" onClick={handleLogin} className="btn btn-neutral rounded-xl px-8 py-4">Masuk</button>
                        <button type="button" onClick={() => {
                            setUsername("")
                            setPassword("")
                            setError("")
                        }} className="btn btn-outline btn-error rounded-xl px-8 py-4">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login