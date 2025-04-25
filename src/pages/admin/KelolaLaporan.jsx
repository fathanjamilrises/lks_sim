import { useEffect } from "react";
import Layout from "../../layouts/Layout";
import { useState } from "react";
import { supabase } from "../../config/supabaseClient";

const KelolaLaporan = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchLaporan();
  });

  const fetchLaporan = async () => {
    const { data, error } = await supabase
      .from("tbl_transaksi")
      .select("*, tbl_pelanggan(nama)");
    if (!error) setData(data);
  };

  return (
    <Layout>
      <form className="flex gap-6 items-end mt-10">
        <div className="flex flex-col gap-4">
          <label className="font-semibold">Dari tanggal</label>
          <input type="date" name="dari_tanggal" className="input w-[300px]" />
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-semibold">Sampai tanggal</label>
          <input
            type="date"
            name="sampai_tanggal"
            className="input w-[300px]"
          />
        </div>
        <button className="btn btn-neutral">Cari</button>
      </form>
      <div className="overflow-x-auto rounded-box border border-base-content/5 mt-20 p-6">
        <h1 className="p-6 mb-10 font-bold text-2xl">Tabel Transaksi</h1>

        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No Transaksi</th>
              <th>Tanggal Transaksi</th>
              <th>Total Penjualan</th>
              <th>Nama Pelanggan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id_transaksi}>
                <td>{d.no_transaksi}</td>
                <td>{d.tgl_transaksi}</td>
                <td>{d.total_bayar}</td>
                <td>{d.tbl_pelanggan.nama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default KelolaLaporan;
