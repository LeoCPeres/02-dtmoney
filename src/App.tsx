import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { EditTransactionModal } from "./components/EditTransactionModal";

Modal.setAppElement("#root");

export function App() {
  return (
    <TransactionsProvider>
      <Header />
      <Dashboard />
      <NewTransactionModal />
      <EditTransactionModal />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
