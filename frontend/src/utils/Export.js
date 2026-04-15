import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (items) => {
    const data = items.map((item, index) => ({
        No: index + 1,
        ID: item.item_id,
        Nama: item.item_name,
        Deskripsi: item.description,
        Status: item.status,
        Min_Stok: item.min_stock,
        Max_Stok: item.max_stock,
        Stok: item.std_qty,
        Harga_Beli: item.unit_cost,
        Harga_Jual: item.unit_retail
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const fileData = new Blob([excelBuffer], {
        type: "application/octet-stream"
    });

    saveAs(fileData, "report_items.xlsx");
};