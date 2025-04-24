import Navbar from "../../components/Navbar"

const KelolaTransaksi = () => {
    return (
        <div className="p-6">
            <Navbar page = "Kasir" />
        <div className="p-6 mt-5">
        <form className="mt-10 flex gap-10 ml-10 items-center">
                <div className="flex flex-col gap-4">
                    <label className="font-semibold">Pilih Barang</label>
                    <select  className="select w-[300px]">
                        <option value="">Pilih Barang</option>
                    </select>
                    <label className="font-semibold">Telepon</label>
                    <input type="text" name="jumlah_barang" className="input w-[300px]" />
                    <label className="font-semibold">Nama Pelanggan</label>
                    <input type="text" name="nama_pelanggan" className="input w-[300px]" />
                </div>
                <div className="flex flex-col gap-4">
                <label className="font-semibold">Harga Satuan</label>
                <input type="number" name="harga_satuan" className="input w-[300px]" readOnly />
                <label className="font-semibold">Quantiitas</label>
                <input type="text" name="expired_date" className="input w-[300px]" />
                <label className="font-semibold">Total Harga</label>
                <input type="number" name="harga_satuan" className="input w-[300px]" readOnly />
                </div>
                <div className="flex flex-col gap-2">
                    <button className="btn btn-outline btn-neutral">Tambah</button>
                    <button className="btn btn-outline btn-warning">Edit</button>
                    <button className="btn btn-outline btn-error">Hapus</button>
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
                <div className="items-end">
                <div className="flex flex-col mt-10">
                    <div className="font-semibold">Total Harga :</div>
                    <div className="font-semibold">Diskon :</div>
                </div>
                </div>
            </table>
            </div>
            <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4 mt-10 justify-center">
                <div className="flex gap-0">
                    <div className="bg-black text-white font-bold px-4 py-2 rounded">Cash</div>
                    <input type="number" className="input w-[200px]" />
                </div>
                <button className="btn btn-outline btn-neutral w-[250px]">Bayar</button>
                <p className="font-semibold">Kembalian :</p>
            </div>
            <div className="flex gap-4">
                <button className="btn btn-neutral rounded">Print</button>
                <button className="btn btn-neutral rounded">Simpan</button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default KelolaTransaksi
