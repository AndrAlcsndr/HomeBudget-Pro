import { DataGrid } from "@mui/x-data-grid";

function DataListComponent({ rows, columns }: { rows: any[]; columns: any[] }) {
  return (
    <div className="flex">
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        getRowId={(row) => row.id}
      />
    </div>
  );
}

export default DataListComponent;
