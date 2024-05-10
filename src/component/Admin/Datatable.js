import { useEffect, useMemo, useState, useRef } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Datatable = ({
  columns,
  initSorting,
  tableData = [],
  loading = false,
  itemsQueryFn = null,
  itemEditFn = null,
  itemDeleteFn = null,
}) => {
  const selectAllRef = useRef();
  const [autoReset, setAutoReset] = useState(true);
  const [data, setData] = useState(tableData);
  const [isLoading, setIsLoading] = useState(loading);
  const [rowSelection, setRowSelection] = useState({}); //manage your own row selection state
  const [columnFilters, setColumnFilters] = useState([]); //no default filters
  const [sorting, setSorting] = useState(initSorting || []);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const columnDefs = useMemo(
    () => [
      {
        id: "select-col",
        header: ({ table }) => (
          <Form.Check
            ref={selectAllRef}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
          />
        ),
        cell: ({ row }) => (
          <Form.Check
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
      ...Object.keys(columns).map((column) => ({
        accessorFn: (row) => row[column],
        id: column,
        cell: (info) =>
          columns[column].template
            ? columns[column].template(info)
            : info.getValue(),
        header: () => <span>{columns[column].title}</span>,
        footer: (props) => props.column.id,
        enableSorting: !columns[column].disableSorting,
        enableColumnFilter: !columns[column].disableFiltering,
      })),
      {
        id: "actions-col",
        header: () => <span>Actions</span>,
        cell: ({ row }) => (
          <div className="row justify-content-center align-items-center p-1">
            <Button
              hidden={!itemEditFn}
              className="col-5 mx-2"
              variant="primary"
              onClick={(e) => itemEditFn && handleItemEdit(e, row)}
            >
              <i className="fas fa fa-edit px-2" />
              <span>Edit</span>
            </Button>
            <Button
              hidden={!itemDeleteFn}
              className="col-5 mx-2"
              variant="danger"
              onClick={(e) => itemDeleteFn && handleItemDelete(e, row)}
            >
              <i className="fas fa fa-trash px-2" />
              <span>Delete</span>
            </Button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, itemEditFn, itemDeleteFn]
  );

  const table = useReactTable({
    data,
    columns: columnDefs,
    state: {
      columnFilters, //pass controlled state back to the table (overrides internal state)
      rowSelection, //pass the row selection state back to the table instance
      sorting,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters, // hoist columnFilters state into our own state management
    onRowSelectionChange: setRowSelection, // hoist up the row selection state to your own scope
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualFiltering: !!itemsQueryFn,
    manualSorting: !!itemsQueryFn,
    manualPagination: !!itemsQueryFn,
    autoResetAll: autoReset,
  });

  useEffect(
    () => async () => {
      if (itemsQueryFn) {
        setIsLoading(true);

        const items = await itemsQueryFn(columnFilters, sorting, pagination);
        setData(items);

        setIsLoading(false);
      }
    },
    [columnFilters, sorting, pagination, itemsQueryFn]
  );

  useEffect(() => setData(tableData), [tableData]);
  useEffect(() => setIsLoading(loading), [loading]);
  useEffect(() => setAutoReset(true), [data]);
  useEffect(() => {
    if (selectAllRef?.current) {
      selectAllRef.current.indeterminate = table.getIsSomeRowsSelected();
    }
  }, [rowSelection, selectAllRef, table]);

  useEffect(() => {
    const actionsCol = table.getColumn("actions-col");
    const actionsColVisibility = !!itemEditFn || !!itemDeleteFn;

    if (actionsCol.getIsVisible() !== actionsColVisibility) {
      actionsCol.toggleVisibility(actionsColVisibility);
    }
  }, [itemEditFn, itemDeleteFn, table]);

  const handleItemEdit = async (e, row) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      console.log("Editing item:", row.original);

      // Call the itemEditFn with the original record

      const updatedRow = await itemEditFn(row.original);

      if (!updatedRow) {
        throw new Error(" Updated row is undefined");
      }

      console.log("Updated item:", updatedRow);

      // Update the datatable's state with the updated record
      setData(
        data.map((item) => (item.name === updatedRow.name ? updatedRow : item))
      );
    } catch (error) {
      console.error("Error editing item:", error);
    }

    setIsLoading(false);
  };

  const handleItemDelete = async (e, row) => {
    e.stopPropagation();

    setIsLoading(true);
    setAutoReset(false);
    await itemDeleteFn(row.original);
    const dataCopy = [...data];
    dataCopy.splice(row.index, 1);
    setData(dataCopy);

    setIsLoading(false);
  };

  return (
    <div className="p-2">
      <Table responsive striped bordered hover className="datatable-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() &&
                        ({
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column?.getIsSorted()?.toString()] ??
                          null)}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={table.getVisibleFlatColumns().length}>
                <div className="row justify-content-center align-items-center py-3">
                  <Spinner animation="grow" variant="secondary" />
                  <Spinner animation="grow" variant="success" />
                  <Spinner animation="grow" variant="danger" />{" "}
                </div>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={row.getIsSelected() ? "selected" : null}
                  onClick={row.getToggleSelectedHandler()}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={columnDefs.length}>
              <div className="flex items-center gap-2">
                <Button
                  className="border rounded p-1"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"GOTO FIRST PAGE"}
                </Button>
                <Button
                  className="border rounded p-1"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"PREVIOUS PAGE"}
                </Button>
                <Button
                  className="border rounded p-1"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {"NEXT PAGE"}
                </Button>
                <Button
                  className="border rounded p-1"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {"LAST PAGE"}
                </Button>
                <span className="flex items-center gap-1">
                  <div>Page</div>
                  <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount().toLocaleString()}
                  </strong>
                </span>
                <span className="flex items-center gap-1">
                  | Go to page:
                  <Form.Control
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="border p-1 rounded w-16"
                  />
                </span>
                <Form.Select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <Form.Group className="flex space-x-2">
      <Form.Control
        type="number"
        value={Array(columnFilterValue)?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded datatable-input"
      />
      <Form.Control
        type="number"
        value={Array(columnFilterValue)?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded datatable-input"
      />
    </Form.Group>
  ) : (
    <Form.Control
      type="text"
      value={(columnFilterValue ?? "").toString()}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded datatable-input"
    />
  );
}

export default Datatable;
