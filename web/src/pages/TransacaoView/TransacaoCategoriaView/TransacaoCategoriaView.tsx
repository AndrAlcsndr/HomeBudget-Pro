import { useState } from "react";
import DataListComponent from "../../../components/DataGridComponent/DataGridComponent";
import SkeletonComponent from "../../../components/SkeletonComponent/SkeletonComponent";

function TransacaoCategoriaView({ loading, rows, columns }: { loading: boolean; rows: any[]; columns: any[] }) {
  const [loadingState,] = useState(loading);
  const [columnsState,] = useState<any[]>(columns);
  const [rowsState,] = useState<any[]>(rows);

  return (
    <div className="container mt-4">
        {loadingState ? (
          <SkeletonComponent show={true} as="list" times={3} />
        ) : (
          <DataListComponent columns={columnsState} rows={rowsState} />
        )}
    </div>
  );
}

export default TransacaoCategoriaView;