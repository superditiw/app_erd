import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { formatRupiah } from '../utils/Format';
import '../styles/Items.css';

function Items() {
    const [items, setItems] = useState([]);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role_code === 'ADMIN';

    if (!user.user_id) {
        window.location.href = "/";
    }

    console.log('USER:', user);
    console.log('ROLE:', user?.role_code);
    console.log('IS ADMIN:', isAdmin);

    const fetchItems = async () => {
        try {
            const res = await api.get('/items');
            setItems(res.data);
        } catch (error) {
            console.error(error);
            alert('Gagal ambil data');
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            await api.delete(`/items/${id}`, {
            data: {
                updated_id: user.user_id
            }
            });

            alert('Item deleted');

            fetchItems(); // refresh data
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || 'Delete gagal');
        }
    };
    
    const [form, setForm] = useState({
        item_name: '',
        description: '',
        std_qty: '',
        unit_cost: '',
        unit_retail: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleCreate = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            await api.post('/items', {
            ...form,
            status: 'A',
            min_stock: 1,
            max_stock: 10,
            supplier_id: 1,
            created_id: user.user_id
            });

            alert('Item created');

            fetchItems();

            // reset form
            setForm({
            item_name: '',
            description: '',
            std_qty: 0,
            unit_cost: 0,
            unit_retail: 0
            });

        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || 'Create gagal');
        }
    };

    const [editId, setEditId] = useState(null);

    const handleEdit = (item) => {
        setForm({
            item_name: item.item_name,
            description: item.description,
            std_qty: item.std_qty,
            unit_retail: item.unit_retail,
            min_stock: item.min_stock,
            max_stock: item.max_stock,
            unit_cost: item.unit_cost
        });

        setEditId(item.item_id);
    };

    const handleUpdate = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            await api.put(`/items/${editId}`, {
            ...form,
            status: 'A',
            supplier_id: 1,
            updated_id: user.user_id
            });

            alert('Item updated');

            fetchItems();

            // reset
            setEditId(null);
            setForm({
            item_name: '',
            description: '',
            std_qty: 0,
            unit_retail: 0,
            min_stock: 0,
            max_stock: 0,
            unit_cost: 0
            });

        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || 'Update gagal');
        }
    };

    return (
        <div className='app-content'>
            <Navbar />
            {/* <h2>Items Page</h2> */}

            {isAdmin && (
                <div>
                    <h3>New Item</h3>
                    <input name="item_name" placeholder="Nama Item" value={form.item_name} onChange={handleChange} />
                    <input name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} />
                    <input name="std_qty" type="number" placeholder="QTY" value={form.std_qty} onChange={handleChange} />
                    <input name="unit_cost" type="number" placeholder="Harga Beli" value={form.unit_cost} onChange={handleChange} />
                    <input name="unit_retail" type="number" placeholder="Harga Jual" value={form.unit_retail} onChange={handleChange} />

                    {editId ? (
                        <button onClick={handleUpdate}>Update</button>
                    ) : (
                        <button onClick={handleCreate}>Add</button>
                    )}
                </div>
            )}

            <table border="1">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Stok</th>
                        <th>Harga</th>
                        {isAdmin && <th>Edit / Delete</th>}
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.item_id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-left">{item.item_name}</td>
                            <td className="text-left">{item.description}</td>
                            <td className="text-center">{item.std_qty}</td>
                            <td className="text-right">{formatRupiah(item.unit_retail)}</td>

                            {isAdmin && (
                                <td className='button-action'>
                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                    <button onClick={() => handleDelete(item.item_id)}>Delete</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Items;