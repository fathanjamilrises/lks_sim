import { useState } from "react"
import Layout from "../../layouts/Layout"
import { useEffect } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../config/supabaseClient";

const KelolaUser = () => {
    const [users, setUsers] = useState([]);
    const [selectId, setSelectId] = useState(null);
    const [form, setForm] = useState({
        tipe_user: "",
        nama: "",
        alamat: "",
        telepon: "",
        username: "",
        password: "",
       })
    useEffect(()=> {
        fetchUser()
    },[])

    const fetchUser = async () => {
      const {data, error}  = await supabase 
        .from('tbl_user')
        .select('*')

        if(!error) setUsers(data)
    }

    const selectedId = (id) => {
        const selectUser = users.find(user => user.id_user === id)
        if(selectUser) {
            setForm({
                tipe_user: selectUser.tipe_user,
                nama: selectUser.nama,
                alamat: selectUser.alamat,
                telepon: selectUser.telepon,
                username: selectUser.username,
                password: selectUser.password
            })
            setSelectId(id)
        }
    }

    const handleChange = (e) => {
        setForm ({...form, [e.target.name]: e.target.value})
    }

    const resetForm = () => {
        setForm({
            tipe_user: "",
            nama: "",
            alamat: "",
            telepon: "",
            username: "",
            password: "",
        })
    }

    const handleAdd = async () => {
        const {error} = await supabase .from("tbl_user").insert([form])
        if(!error)
            toast.success('user berhasil ditambahkan')
            fetchUser()
            resetForm()
    }
    const handleEdit = async () => {
        const {error} = await supabase .from("tbl_user").update([form]).eq('id_user', selectId)
        if(!error)
            toast.success('user berhasil diubah')
            fetchUser()
            resetForm()
    }
    const handleDelete = async () => {
        const {error} = await supabase .from("tbl_user").delete([form]).eq('id_user', selectId)
        if(!error)
            toast.success('user berhasil dihapus')
            fetchUser()
            resetForm()
    }
    return (
        <Layout>
            <form className="mt-10 flex gap-10">
                <div className="flex flex-col gap-4">
                    <label className="font-semibold">Tipe User</label>
                    <select name="tipe_user" className="select w-[300px]" value={form.tipe_user} onChange={handleChange}>
                        <option value="">Pilih Tipe User</option>
                        <option value="admin">Admin</option>
                        <option value="gudang">Gudang</option>
                        <option value="kasir">Kasir</option>
                    </select>
                    <label className="font-semibold">Nama</label>
                    <input type="text" name="nama" className="input w-[300px]" value={form.nama} onChange={handleChange} />
                    <label className="font-semibold">Telepon</label>
                    <input type="text" name="telepon" className="input w-[300px]" value={form.telepon} onChange={handleChange} />
                    <label className="font-semibold">Alamat</label>
                    <textarea name="alamat" className="textarea" value={form.alamat} onChange={handleChange}></textarea>
                </div>
                <div className="flex flex-col gap-4">
                <label className="font-semibold">Username</label>
                <input type="text" name="username" className="input w-[300px]" value={form.username} onChange={handleChange} />
                <label className="font-semibold">Password</label>
                    <input type="text" name="password" className="input w-[300px]" value={form.password} onChange={handleChange} />
                    <div className="flex gap-2">
                    <button type="button" className="btn btn-outline btn-neutral" onClick={handleAdd}>Tambah</button>
                    <button type="button" className="btn btn-outline btn-warning" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline btn-error" onClick={handleDelete}>Hapus</button>
                </div>
                </div>
            </form>
            <div className="overflow-x-auto rounded-box border border-base-content/5 mt-20 p-6">
            <h1 className="p-6 mb-10 font-bold text-2xl">Tabel User</h1>

            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th>No</th>
                        <th>Tipe User</th>
                        <th>Nama</th>
                        <th>Telepon</th>
                        <th>Alamat</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u,index)=>(
                        <tr key={u.id_user}>
                            <td><input type="checkbox" className="checkbox" checked={selectId === u.id_user} onChange={() => selectedId(u.id_user)} /></td>
                            <td>{index + 1}</td>
                            <td>{u.tipe_user}</td>
                            <td>{u.nama}</td>
                            <td>{u.telepon}</td>
                            <td>{u.alamat}</td>
                            <td>{u.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </Layout>
    )
}

export default KelolaUser