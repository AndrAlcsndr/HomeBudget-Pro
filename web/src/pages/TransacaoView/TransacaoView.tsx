import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ModalCriarEditarTransacoes from "../../components/ModalCriarEditarTransacoesComponent/ModalCriarEditarTransacao";
import ModalConfirmarCancelar from "../../components/ModalConfirmarCancelarComponent/ModalConfirmarCancelarComponent";
import ModalSuccessError from "../../components/ModalSuccessErrorComponent/ModalSuccessErrorComponent";

function TransacaoView() {
  const [key, setKey] = useState("pessoa");

  const columns = [
    { field: "descricao", headerName: "Descrição", width: 110 },
    { field: "pessoa", headerName: "Pessoa", width: 150 },
    { field: "categoria", headerName: "Categoria", width: 150 },
    { field: "finalidade", headerName: "Finalidade", width: 150 },
    {
      field: "dataCriacao",
      headerName: "Data da Criação",
      width: 200,
      valueFormatter: (params: any) => formatDate(params),
    },
    {
      field: "dataModificacao",
      headerName: "Data da Modificação",
      width: 200,
      valueFormatter: (params: any) => formatDate(params),
    },
    {
      field: "acoes",
      headerName: "Ações",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        const row = params.row;
  return (
          <div className="flex gap-6 mt-2">
            <Button size="sm" color="warning" onClick={() => handleEdit(row)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>

            <Button
              size="sm"
              color="error"
              onClick={() => handleDelete(row.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await api.getPaged({
        page: 1,
        pageSize: 10,
        groupBy: groupByMap[key as GroupByKey],
      });

      setRows([...(result.items ?? [])]);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message: string) => {
    setModalSuccessError({ show: true, type: "success", message });
  };

  const showError = (message: string) => {
    setModalSuccessError({ show: true, type: "error", message });
  };

  const handleEdit = (transacao: UpdateTransacaoDto) => {
    setTransacaoEdit(transacao);
    setOpenModalEdit(true);
  };
  const handleDelete = (id: string) => {
    setConfirmModal({ show: true, id });
  };

  const addEditTransacao = async (
    transacao: UpdateTransacaoDto | CreateTransacaoDto,
  ) => {
    try {
      setLoading(true);

      if (transacao.idPessoa === empty_Guid) {
        showError("Seleção de pessoa é obrigatório.");
        return;
      }

      if (transacao.idCategoria === empty_Guid) {
        showError(
          `Seleção da categoria de ${transacao.tipo.toString()} é obrigatória.`,
        );
        return;
      }

      const result =
        transacao.id === empty_Guid
          ? await api.create(transacao as CreateTransacaoDto)
          : await api.update(transacao.id, transacao as UpdateTransacaoDto);

      if (result.success) showSuccess(result.message!);
      else showError(result.message!);
    } catch (error: any) {
      showError(
        error?.response?.data?.detail ||
          "Erro ao salvar alterações da transação.",
      );
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const excluirTransacao = async (id: string) => {
    try {
      setLoading(true);

      const result = await api.delete(id);

      if (result.success) showSuccess(result.message!);
      else showError(result.message!);
    } catch (error) {
      console.error("Erro ao excluir transacao:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const getAllPessoas = async () => {
    try {
      setLoading(true);

      const result = await apiPessoa.getAll();

      if (result.success) setPessoas(result.data!);
      else showError(result.message!);
    } catch (error: any) {
      showError(
        error?.response?.data?.detail || "Erro ao obter pessoas do sistema.",
      );
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const getAllCategorias = async () => {
    try {
      setLoading(true);

      const result = await apiCategoria.getAll();

      if (result.success) setCategorias(result.data!);
      else showError(result.message!);
    } catch (error: any) {
      showError(
        error?.response?.data?.detail || "Erro ao obter pessoas do sistema.",
      );
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    getAllPessoas();
    getAllCategorias();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k!)}
          className="mb-0"
    >
          <Tab eventKey="pessoa" title="Gastos p/ pessoa" />
          <Tab eventKey="categoria" title="Gastos p/ categoria" />
          <Tab eventKey="geral" title="Gastos gerais" />
    </Tabs>

        <Button variant="primary" onClick={() => setOpenModalEdit(true)}>
          + Novo
        </Button>
      </div>

      {/* Conteúdo das tabs separado */}
      {key === "pessoa" && (
        <TransacaoPessoaView loading={loading} rows={rows} columns={columns} />
      )}

      {key === "categoria" && (
        <TransacaoCategoriaView
          loading={loading}
          rows={rows}
          columns={columns}
        />
      )}

      {key === "geral" && (
        <TransacaoGeralView loading={loading} rows={rows} columns={columns} />
      )}

      <ModalCriarEditarTransacoes
        show={openModalEdit}
        pessoas={pessoasSelect}
        categorias={categoriasSelect}
        transacao={transacaoEdit}
        onSave={(transacao) => {
          addEditTransacao(transacao);
        }}
        onClose={() => {
          setOpenModalEdit(false);
          setTransacaoEdit(undefined);
        }}
      />

      <ModalSuccessError
        show={modalSuccessError.show}
        type={modalSuccessError.type}
        message={modalSuccessError.message}
        onClose={() =>
          setModalSuccessError({ ...modalSuccessError, show: false })
        }
      />

      <ModalConfirmarCancelar
        show={confirmModal.show}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta transação  ?"
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={() => {
          excluirTransacao(confirmModal.id);
          setConfirmModal({ ...confirmModal, show: false });
        }}
        onCancel={() => setConfirmModal({ ...confirmModal, show: false })}
      />
    </>
  );
}

export default TransacaoView;
