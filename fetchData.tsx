import React, { useState } from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid, { SelectColumn, SortColumn } from 'react-data-grid';

// Sample items array
interface Row {
    id: number;
    name: string;
    amount: number;
    spendDate: string;
    category: string
}

const MyComponent = () => {
    const items: Row[] = [
        { id: 1, name: "Pizza", amount: 80, spendDate: "2020-10-10", category: "Food" },
        { id: 2, name: "Grape Juice", amount: 30, spendDate: "2020-10-12", category: "Food" },
        { id: 3, name: "Cinema", amount: 210, spendDate: "2020-10-16", category: "Entertainment" },
        { id: 4, name: "Java Programming book", amount: 242, spendDate: "2020-10-15", category: "Academic" },
        { id: 5, name: "Mango Juice", amount: 35, spendDate: "2020-10-16", category: "Food" },
        { id: 6, name: "Dress", amount: 2000, spendDate: "2020-10-25", category: "Cloth" },
        { id: 7, name: "Tour", amount: 2555, spendDate: "2020-10-29", category: "Entertainment" },
        { id: 8, name: "Meals", amount: 300, spendDate: "2020-10-30", category: "Food" },
        { id: 9, name: "Mobile", amount: 3500, spendDate: "2020-11-02", category: "Gadgets" },
        { id: 10, name: "Exam Fees", amount: 1245, spendDate: "2020-11-04", category: "Academic" }
    ];

    const [rows, setRows] = useState(items);
    const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());
    const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Default page size





    const paginatedRows = rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    // Total pages
    const totalPages = Math.ceil(rows.length / pageSize);

    const columns = [
        { key: 'id', name: 'ID', sortable: true },
        { key: 'name', name: 'Name', sortable: true },
        { key: 'amount', name: 'Amount' },
        { key: 'spendDate', name: 'SpendDate' },
        { key: 'category', name: 'category' }
    ];

    function rowKeyGetter(row: Row) {
        return row.id;
    }

    function onSortColumnsChange(sortColumns: SortColumn[]) {
        //setSortColumns(sortColumns.slice(-1)); // Original - only keeps the *last* sort
        setSortColumns(sortColumns); // Modified - allows multiple sort columns
    }

    // Function to apply sorting to the rows
    const sortedRows = React.useMemo(() => {
        if (sortColumns.length === 0) return rows;

        let sorted = [...rows]; // Create a copy to avoid mutating the original array

        sorted.sort((a, b) => {
            for (const sortColumn of sortColumns) {
                const sortKey = sortColumn.columnKey as keyof Row;
                const sortDirection = sortColumn.direction;

                if (a[sortKey] < b[sortKey]) {
                    return sortDirection === 'ASC' ? -1 : 1;
                }
                if (a[sortKey] > b[sortKey]) {
                    return sortDirection === 'ASC' ? 1 : -1;
                }
            }
            return 0; // Equal, move to the next sort column or keep original order
        });
        return sorted;
    }, [rows, sortColumns]);

    const containerStyle = {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const gridStyle = {
        border: '1px solid #ddd',
        borderRadius: '5px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const paginationStyle = {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const buttonStyle = {
        padding: '8px 12px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        ':disabled': {
            backgroundColor: '#ccc',
            cursor: 'default',
        },
    };

    const pageSizeStyle = {
        marginTop: '10px',
        textAlign: 'center',
    };

    const selectStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    };

    return (
        <div style={containerStyle}>
            <div style={gridStyle}>
                <DataGrid
                    columns={columns}
                    rows={paginatedRows} // Use the sorted rows here
                    rowKeyGetter={rowKeyGetter}
                    onRowsChange={setRows}
                    sortColumns={sortColumns}
                    onSortColumnsChange={onSortColumnsChange}
                />
            </div>

            <div style={paginationStyle}>
                <button
                    style={buttonStyle}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span> Page {currentPage + 1} of {totalPages} </span>
                <button
                    style={buttonStyle}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </button>
            </div>
            <div style={pageSizeStyle}>
                <label htmlFor="pageSize">Rows per page:</label>
                <select id="pageSize" value={pageSize} style={selectStyle} onChange={(e) => setPageSize(Number(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
};

export default MyComponent;
