import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const KelolaTransaksi = () => {
  const [barangList, setBarangList] = useState([]);
  const [barang, setBarang] = useState(null);
  const [keranjang, setKeranjang] = useState([]);
  const [noTransaksi, setNoTransaksi] = useState("");
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);
  const [cash, setCash] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const [kasir, setKasir] = useState({
    nama: "",
    id_user: null,
  });
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    telepon: "",
  });

  useEffect(() => {
    setNoTransaksi(`TRX${Date.now()}`);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setKasir(user);
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    const { data } = await supabase.from("tbl_barang").select("*");
    setBarangList(data);
  };

  const handleSelectBarang = (e) => {
    const b = barangList.find(
      (item) => item.id_barang === parseInt(e.target.value)
    );
  };

  const handleQtyChange = (e) => setQty(parseInt(e.targe.value));

  const handleTambah = () => {
    if (!barang || qty < 1)
      return toast.error("Pilih Barang dan Jumlah Barang");
    const totalItem = barang.harga_satuan * qty;
    const item = { ...barang, qty, total: totalItem };
    setKeranjang({ ...keranjang, item });
    setTotal(totalItem + total);
  };

  const handleReset = () => {
    setKeranjang([]);
    setKembalian(0);
    setTotal(0);
    setCash(0);
  };

  const handleCashChange = (e) => {
    const val = parseInt(e.target.value);
    setCash(val);
    setKembalian(val - total);
  };

  const handleTeleponChange = async (e) => {
    const telp = e.target.value;
    setPelanggan({ ...pelanggan, telepon: telp });
    if (telp.length >= 5) {
      const { data } = await supabase
        .from("tbl_pelanggan")
        .select("*")
        .eq("telepon", telp)
        .single();
      if (data) setPelanggan({ nama: data.nama, telepon: data.telepon });
    }
  };

  const handleSimpan = async () =>{
    let id_pelanggan = null;
    const {data: existing} = await supabase 
    .from('tbl_pelanggan')
    .select("*")
    .eq('telepon', pelanggan.telepon)
    .limit(1);

    if (existing.length === 0) {
        const {data} = await supabase.from("tbl_pelanggan").insert([pelanggan]).select().single()
        id_pelanggan = pelanggan.id_pelanggan
    } else {
        id_pelanggan = existing[0].id_pelanggan
    }
    for (let item of keranjang) {
        await supabase .from('tbl_transaksi') .insert([{
            no_transaksi: noTransaksi,
            tgl_transaksi: new Date().toISOString(),
            nama_kasir: kasir.nama,
            total_bayar: item.total,
            id_user : kasir.id_user,
            id_pelanggan,
            id_barang : item.id_barang
        }])
    }
    toastz.success("transaksi berhasil")
    handleReset()
  }
  return (
    <div className="p-6">
        <Toaster />
      <Navbar page="Kasir" />
      <div className="p-6 mt-5">
        <form className="mt-10 flex gap-10 ml-10 items-center">
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Pilih Barang</label>
            <select className="select w-[300px]" onChange={handleSelectBarang}>
              <option value="">Pilih Barang</option>
              {barangList.map((b) => (
                <option key={b.id_barang} value={b.id_barang}>{b.kode_barang} - {b.nama_barang}</option>
              ))}
            </select>
            <label className="font-semibold">Telepon</label>
            <input
              type="text"
              name="telepon"
              className="input w-[300px]"
              value={pelanggan.telepon}
              onChange={handleTeleponChange}
            />
            <label className="font-semibold">Nama Pelanggan</label>
            <input
              type="text"
              name="nama_pelanggan"
              className="input w-[300px]"
              value={pelanggan.nama}
              onChange={(e) => setPelanggan({...pelanggan, nama: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Harga Satuan</label>
            <input
              type="number"
              name="harga_satuan"
              className="input w-[300px]"
              value={barang?.harga_satuan|| ""}
              readOnly
            />
            <label className="font-semibold">Quantiitas</label>
            <input
              type="number"
              name="qty"
              className="input w-[300px]"
              value={qty}
              onChange={handleQtyChange}
            />
            <label className="font-semibold">Total Harga</label>
            <input
              type="number"
              name="total_harga"
              className="input w-[300px]"
              value={barang? barang.harga_satuan * qty : ""}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2">
            <button type="button" className="btn btn-outline btn-neutral" onClick={handleTambah}>Tambah</button>
            <button type="button" className="btn btn-outline btn-error" onClick={handleReset}>Reset</button>
          </div>
        </form>
        <div className="overflow-x-auto rounded-box border border-base-content/5 mt-20 p-6">
          <h1 className="p-6 mb-10 font-bold text-2xl">Keranjang</h1>

          <table className="table table-zebra">
            <thead>
              <tr>
                <th>No Transaksi</th>
                <th>Kode Barang</th>
                <th>Nama Barang</th>
                <th>Harga Satuan</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
                {keranjang.map((item, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{noTransaksi}</td>
                        <td>{item.kode_barang}</td>
                        <td>{item.nama_barang}</td>
                        <td>{item.harga_satuan}</td>
                        <td>{item.qty}</td>
                        <td>{item.qty}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          <div className="items-end">
              <div className="flex flex-col mt-10">
                <div className="font-semibold">Total Harga :</div>
                <div className="font-semibold">Diskon :</div>
              </div>
            </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4 mt-10 justify-center">
            <div className="flex gap-0">
              <div className="bg-black text-white font-bold px-4 py-2 rounded">
                Cash
              </div>
              <input type="number" className="input w-[200px]" />
            </div>
            <button className="btn btn-outline btn-neutral w-[250px]">
              Bayar
            </button>
            <p className="font-semibold">Kembalian :</p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-neutral rounded">Print</button>
            <button className="btn btn-neutral rounded">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelolaTransaksi;
