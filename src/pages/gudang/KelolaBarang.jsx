import { useState } from "react"
import Navbar from "../../components/Navbar"
import { useEffect } from "react"
import { supabase } from "../../config/supabaseClient"
import toast from "react-hot-toast"

const KelolaBarang = () => {
    const [barang, setBarang] = useState([])
    const [selectedId, setSelectId] = useState(null)
    const [form, setForm] = useState({
        kode_barang : "",
        jumlah_barang: "",
        nama_barang: "",
        satuan: "",
        expired_date: "",
        harga_satuan: ""
    })

    useEffect(() => {
        fetchBarang()
    })

    const fetchBarang = async () => {
        const {data, error} = await supabase  
        .from("tbl_barang")
        .select("*")
        if(!error) setBarang(data)
    }

    const handleCheck = (id) => {
        const checkId = barang.find(b => b.id_barang === id )
        if(checkId) {
            setForm({
                kode_barang: checkId.kode_barang,
                jumlah_barang: checkId.jumlah_barang,
                nama_barang: checkId.nama_barang,
                satuan: checkId.satuan,
                expired_date : checkId.expired_date,
                harga_satuan: checkId.harga_satuan
            })
            setSelectId(id)
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const resetForm = () => {
        setForm({
        kode_barang : "",
        jumlah_barang: "",
        nama_barang: "",
        satuan: "",
        expired_date: "",
        harga_satuan: ""
        })
    }

    const handleAdd = async () => {
        const {error} = await supabase .from('tbl_barang').insert([form])
        if(!error) toast.success("barang berhasil ditambah")
        fetchBarang()
        resetForm()
    }
    const handleEdit = async () => {
        const {error} = await supabase .from('tbl_barang').update([form]).eq('id_barang', selectedId)
        if(!error) toast.success("barang berhasil diubah")
        fetchBarang()
        resetForm()
    }

    const handleDelete = async () => {
        const {error} = await supabase .from('tbl_barang').delete([form]).eq('id_barang', selectedId)
        if(!error) toast.success("barang berhasil diubah")
        fetchBarang()
        resetForm()
    }
    return (
        <div className="p-6">
            <Navbar page = "Gudang" />
        <div className="p-6 mt-5">
        <form className="mt-10 flex gap-10 ml-10 items-center">
                <div className="flex flex-col gap-4">
                    <label className="font-semibold">Kode Barang</label>
                    <input type="text" name="kode_barang" className="input w-[300px]" value={form.kode_barang} onChange={handleChange} />
                    <label className="font-semibold">Jumlah Barang</label>
                    <input type="number" name="jumlah_barang" className="input w-[300px]" value={form.jumlah_barang} onChange={handleChange} />
                    <label className="font-semibold">Nama Barang</label>
                    <input type="text" name="nama_barang" className="input w-[300px]" value={form.nama_barang} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-4">
                <label className="font-semibold">Satuan</label>
                <input type="text" name="satuan" className="input w-[300px]" value={form.satuan} onChange={handleChange} />
                <label className="font-semibold">Expired Date</label>
                <input type="date" name="expired_date" className="input w-[300px]" value={form.expired_date} onChange={handleChange} />
                <label className="font-semibold">Harga Satuan</label>
                <input type="number" name="harga_satuan" className="input w-[300px]" value={form.harga_satuan} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                    <button type="button" className="btn btn-outline btn-neutral" onClick={handleAdd}>Tambah</button>
                    <button type="button" className="btn btn-outline btn-warning" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline btn-error" onClick={handleDelete}>Hapus</button>
                </div>
            </form>
            <div className="overflow-x-auto rounded-box border border-base-content/5 mt-20 p-6">
            <h1 className="p-6 mb-10 font-bold text-2xl">Tabel Barang</h1>

            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th>Id Barang</th>
                        <th>Kode Barang</th>
                        <th>Nama Barang</th>
                        <th>Expired Date</th>
                        <th>Qty</th>
                        <th>Satuan</th>
                        <th>Harga Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    {barang.map((b)=> (
                        <tr key={b.id_barang}>
                            <td><input type="checkbox" className="checkbox" checked={selectedId === b.id_barang} onChange={()=> handleCheck(b.id_barang)}/></td>
                            <td>{b.id_barang}</td>
                            <td>{b.kode_barang}</td>
                            <td>{b.nama_barang}</td>
                            <td>{b.expired_date}</td>
                            <td>{b.jumlah_barang}</td>
                            <td>{b.satuan}</td>
                            <td>{b.harga_satuan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
}

export default KelolaBarang