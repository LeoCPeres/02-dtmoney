import logoImg from "../../assets/logo.svg";
import { useTransactions } from "../../contexts/TransactionsContext";
import { Container, Content } from "./styles";

export function Header() {
  const { handleOpenNewTransactionModal } = useTransactions();

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <button type="button" onClick={handleOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
