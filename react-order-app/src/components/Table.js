import React,{Fragment} from "react";
import { useTable,usePagination } from "react-table";
import { Table as NTable } from 'react-bootstrap';
import { Row,Col,Button,FormControl } from 'react-bootstrap';

export default function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state: { pageIndex, pageSize },
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0,pageSize : 20 },
    },
        usePagination
    )

    const onChangeInSelect = event => {
        setPageSize(Number(event.target.value))
    }

    const onChangeInInput = event => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
    }

    // Render the UI for your table
    return (
        <Fragment>

        <NTable {...getTableProps()} responsive="sm"  striped >
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </NTable>
        <Row style={{ maxWidth: 1000, textAlign: "center" }}>
            <Col md={3}>
                <Button variant="secondary" size="sm"
                    color="primary"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                        className='mr-1'
                >
                    {"<<"}
                </Button>
                <Button variant="secondary" size="sm"
                    color="primary"
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                >
                    {"<"}
                </Button>
            </Col>
            <Col md={2} style={{ marginTop: 7 }}>
                Page{" "}
                <strong>
                    {pageIndex + 1} of {pageCount}
                </strong>
            </Col>
            <Col md={2}>
                <FormControl
                    type="number"
                    min={1}
                    style={{ width: 70 }}
                    max={pageOptions.length}
                    defaultValue={pageIndex + 1}
                    onChange={onChangeInInput}

                />
            </Col>
            <Col md={2}>
                <FormControl as="select" value={pageSize} onChange={onChangeInSelect}>
                    >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </FormControl>
            </Col>
            <Col md={3}>
                <Button variant="secondary" size="sm" color="primary" onClick={nextPage} disabled={!canNextPage} className='mr-1'>
                    {">"}
                </Button>
                <Button variant="secondary" size="sm"
                    color="primary"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {">>"}
                </Button>
            </Col>
        </Row>


        </Fragment>
    )

}