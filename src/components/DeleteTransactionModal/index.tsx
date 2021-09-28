import { FormEvent } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/fechar.svg";
import trashImg from "../../assets/trash.svg";
import { useTransactions } from "../../contexts/TransactionsContext";
import { Container } from "./styles";
import toast from "react-hot-toast";

export function DeleteTransactionModal() {
  const {
    isDeleteTransactionModalOpen,
    handleCloseDeleteTransactionModal,
    deleteTransaction,
    title,
  } = useTransactions();

  async function handleDeleteTransaction(event: FormEvent) {
    event.preventDefault();

    const test = await deleteTransaction();

    toast.success("Transação deletada com sucesso!");

    handleCloseDeleteTransactionModal();
  }

  return (
    <Modal
      isOpen={isDeleteTransactionModalOpen}
      onRequestClose={handleCloseDeleteTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={handleCloseDeleteTransactionModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleDeleteTransaction}>
        <img src={trashImg} alt="" />
        <h2>Você realmente deseja deletar</h2>

        <button type="submit" className="save">
          Apagar
        </button>
      </Container>
    </Modal>
  );
}
