import Modal from "react-modal";
import closeImg from "../../assets/fechar.svg";
import { useTransactions } from "../../contexts/TransactionsContext";
import { Container } from "./styles";

interface EditTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: number;
}

export function EditTransactionModal() {
  const { isEditTransactionModalOpen, handleCloseEditTransactionModal } =
    useTransactions();

  return (
    <Modal
      isOpen={isEditTransactionModalOpen}
      onRequestClose={handleCloseEditTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={handleCloseEditTransactionModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={1}
          //onChange={(event) => setTitle(event.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={1}
          // onChange={(event) => setAmount(Number(event.target.value))}
        />

        <input
          placeholder="Categoria"
          //value={category}
          //onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
