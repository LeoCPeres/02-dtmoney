import { useTransactions } from "../../contexts/TransactionsContext";
import { Container } from "./styles";
import editImg from "../../assets/edit.svg";
import trashImg from "../../assets/trash.svg";

export function TransactionsTable() {
  const {
    transactions,
    handleOpenEditTransactionModal,
    handleOpenDeleteTransactionModal,
  } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {console.log(transactions)}
          {transactions.length === 0 ? (
            <h1>Vazio</h1>
          ) : (
            transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === "withdraw" && "- "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(transaction.amount)}
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(transaction.createdAt)
                    )}
                  </td>
                  <td className="edit">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenEditTransactionModal(transaction.id)
                      }
                    >
                      <img src={editImg} alt="Ações" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenDeleteTransactionModal(transaction.id)
                      }
                    >
                      <img src={trashImg} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </Container>
  );
}
