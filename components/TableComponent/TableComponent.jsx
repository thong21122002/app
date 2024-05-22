import { Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../LoadingComponent/Loading';


const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isPending = false, columns = [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }


    return (
        <Loading isPending={isPending}>
            {rowSelectedKeys.length > 0 && (
                <div style={{ backgroundColor: 'rgb(167, 14, 19)', color: '#fff', fontWeight: 'bold', padding: '10px', cursor: 'pointer' }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}


            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </Loading>
    )
}
export default TableComponent