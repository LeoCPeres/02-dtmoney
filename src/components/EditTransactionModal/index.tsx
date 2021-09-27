import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/fechar.svg";
import incomeImg from "../../assets/entradas.svg";
import outcomeImg from "../../assets/saidas.svg";
import { useTransactions } from "../../contexts/TransactionsContext";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import toast from "react-hot-toast";
interface Transaction {
  id: number;
  title: string;
  category: string;
  type: string;
  amount: number;
  createdAt: string;
}

export function EditTransactionModal() {
  const {
    isEditTransactionModalOpen,
    handleCloseEditTransactionModal,
    transaction,
    transactions,
    title,
    amount,
    category,
    type,
    handleSetAmount,
    handleSetCategory,
    handleSetType,
    handleSetTitle,
    editTransaction,
  } = useTransactions();

  async function handleEditTransaction(event: FormEvent) {
    event.preventDefault();

    if (title === "") {
      toast.error("Transação sem título");
      return;
    }
    if (amount === 0) {
      toast.error("Transação sem valor");
      return;
    }

    if (category === "") {
      toast.error("Transação sem categoria");
      return;
    }

    await editTransaction({
      title,
      amount,
      category,
      type,
    });

    handleCloseEditTransactionModal();
    handleSetTitle("");
    handleSetAmount(0);
    handleSetCategory("");
    handleSetType("deposit");
  }

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

      <Container onSubmit={handleEditTransaction}>
        <h2>Editar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(event) => handleSetTitle(event.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={(event) => handleSetAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              handleSetType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {
              handleSetType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => handleSetCategory(event.target.value)}
        />

        <button type="submit" className="save">
          Salvar
        </button>
        <button type="button" className="delete">
          Apagar
        </button>
      </Container>
    </Modal>
  );
}
