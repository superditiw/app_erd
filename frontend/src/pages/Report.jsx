import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { formatRupiah } from "../utils/Format";
import '../styles/Report.css';
import { exportToExcel } from "../utils/Export";

function Report() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/items").then((res) => {
            setItems(res.data);
        });
    }, []);

    const totalValue = items.reduce(
        (acc, item) => acc + item.std_qty * item.unit_retail,
        0
    );

    return (
        <div className='app-content'>
            <Navbar />
            {/* <h2>REPORTING</h2> */}

            <h3>Total Items: {items.length}</h3>
            <h3>Total Value: {formatRupiah(totalValue)}</h3>

            <button onClick={() => exportToExcel(items)}>
                Download Excel
            </button>

            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID Item</th>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Status</th>
                        <th>Min Stok</th>
                        <th>Max Stok</th>
                        <th>Stok</th>
                        <th>Harga Beli</th>
                        <th>Harga Jual</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.item_id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{item.item_id}</td>
                            <td className="text-left">{item.item_name}</td>
                            <td className="text-left">{item.description}</td>
                            <td className="text-center">{item.status}</td>
                            <td className="text-center">{item.min_stock}</td>
                            <td className="text-center">{item.max_stock}</td>
                            <td className="text-center">{item.std_qty}</td>
                            <td className="text-right">{formatRupiah(item.unit_cost)}</td>
                            <td className="text-right">{formatRupiah(item.unit_retail)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Report;