import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/fechar.svg";
import incomeImg from "../../assets/entradas.svg";
import outcomeImg from "../../assets/saidas.svg";
import { FormEvent, useState } from "react";
import { useTransactions } from "../../contexts/TransactionsContext";
import toast, { Toaster } from "react-hot-toast";

export function NewTransactionModal() {
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  const {
    createTransaction,
    isNewTransactionModalOpen,
    handleCloseNewTransactionModal,
  } = useTransactions();

  async function handleCrateNewTransaction(event: FormEvent) {
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

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    const capitalized = title[0].toUpperCase() + title.substr(1);

    toast.success(
      `Transação ${capitalized} no valor de ${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)} cadastrada!`
    );
    handleCloseNewTransactionModal();
    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
  }

  return (
    <>
      <Toaster />
      <Modal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={handleCloseNewTransactionModal}
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar Modal" />
        </button>

        <Container onSubmit={handleCrateNewTransaction}>
          <h2>Cadastrar transação</h2>

          <input
            placeholder="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            placeholder="Valor"
            type="number"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {
                setType("deposit");
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
                setType("withdraw");
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
            onChange={(event) => setCategory(event.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    </>
  );
}
