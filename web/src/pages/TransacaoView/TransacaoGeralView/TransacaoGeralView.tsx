import { useState } from "react";
import DataListComponent from "../../../components/DataGridComponent/DataGridComponent";
import SkeletonComponent from "../../../components/SkeletonComponent/SkeletonComponent";

function TransacaoGeralView() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container mt-4">
        {loading ? (
          <SkeletonComponent show={true} as="list" times={3} />
        ) : (
          <DataListComponent columns={columns} rows={rows} />
        )}
    </div>
  );
}

export default TransacaoGeralView;