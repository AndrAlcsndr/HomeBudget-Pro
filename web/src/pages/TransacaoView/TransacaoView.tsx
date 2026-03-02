import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ModalCriarEditarTransacoes from "../../components/ModalCriarEditarTransacoesComponent/ModalCriarEditarTransacao";
import ModalConfirmarCancelar from "../../components/ModalConfirmarCancelarComponent/ModalConfirmarCancelarComponent";
import ModalSuccessError from "../../components/ModalSuccessErrorComponent/ModalSuccessErrorComponent";

function TransacaoView() {
  const [key, setKey] = useState("pessoa");

  return (
    <>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k!)}
      className="mb-3"
    >
      <Tab eventKey="pessoa" title="Gastos p/ pessoa">
        <TransacaoPessoaView />
      </Tab>
      <Tab eventKey="categoria" title="Gastos p/ categoria">
        <TransacaoCategoriaView />
      </Tab>
      <Tab eventKey="geral" title="Gastos gerais">
         <TransacaoGeralView />
      </Tab>
    </Tabs>

    <ModalCriarEditarTransacoes />
    <ModalConfirmarCancelar />
    <ModalSuccessError />
    </>
  );
}

export default TransacaoView;