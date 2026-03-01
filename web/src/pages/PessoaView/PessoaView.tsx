function PessoaView() {
  

  const columns = [
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "idade", headerName: "Idade", width: 110 },
    { field: "cpf", headerName: "CPF", width: 150 },
    {
      field: "dataCriacaoModificacao",
      headerName: "Data de Modificação",
      width: 200,
      valueFormatter: (params: any) =>
        new Date(params.value).toLocaleString("pt-BR"),
    },
  ];

  return (
    <>
      <div className="mb-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold ">Pessoas</span>
          <Button variant="primary" onClick={() => setLoading(!loading)}>
            +Novo
          </Button>
        </div>

        {loading ? (
          <SkeletonComponent show={true} as="list" times={3} />
        ) : (
          <DataListComponent columns={columns} rows={rows} />
        )}
    </div>
    </>
  );
}

export default PessoaView;
