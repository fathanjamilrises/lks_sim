import { useState } from "react"
import Layout from "../../layouts/Layout"
import { supabase } from "../../config/supabaseClient";
import { useEffect } from "react";
import moment from "moment";

const LogActivity = () => {
    const [data,setData] = useState([]);

    useEffect(()=> {
        fetchLog()
    },[])

    const fetchLog = async ()  => {
        const {data, error} = await supabase
        .from("tbl_log")
        .select("*, tbl_user(username)")

        if(!error) setData(data)
    }
    return (
        <Layout>
            <form className="flex gap-6 items-end mt-10">
                <div className="flex flex-col gap-4">
                    <label className="font-semibold">Dari tanggal</label>
                    <input type="date" name="dari_tanggal" className="input w-[300px]" />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold">Sampai tanggal</label>
                    <input type="date" name="sampai_tanggal" className="input w-[300px]" />
                </div>
                <button className="btn btn-neutral">Cari</button>
            </form>
            <div className="overflow-x-auto rounded-box border border-base-content/5 mt-20 p-6">
            <h1 className="p-6 mb-10 font-bold text-2xl">Tabel Log Activity</h1>

            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Waktu</th>
                        <th>Aktivitas</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d)=> (
                        <tr key={d.id_log}>
                            <td>{d.id_log}</td>
                            <td>{d.tbl_user.username}</td>
                        <td>{moment(d.waktu).format('lll')}</td>
                            <td>{d.aktivitas}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </Layout>
    )
}

export default LogActivity