import { useState } from "react";
import DataListComponent from "../../../components/DataGridComponent/DataGridComponent";
import SkeletonComponent from "../../../components/SkeletonComponent/SkeletonComponent";

function TransacaoGeralView({ loading, rows, columns }: { loading: boolean; rows: any[]; columns: any[] }) {
  const [loadingState,] = useState(loading);
  const [rowsState,] = useState<any[]>(rows);
  const [columnsState,] = useState<any[]>(columns);

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

export default TransacaoGeralView;