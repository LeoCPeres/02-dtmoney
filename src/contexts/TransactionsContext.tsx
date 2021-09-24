import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  category: string;
  type: string;
  amount: number;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  isNewTransactionModalOpen: boolean;
  isEditTransactionModalOpen: boolean;
  transactionId: number;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  handleOpenNewTransactionModal: () => void;
  handleCloseNewTransactionModal: () => void;
  handleOpenEditTransactionModal: (id: number) => void;
  handleCloseEditTransactionModal: () => void;
}

// interface TransactionInput {
//   title: string;
//   category: string;
//   type: string;
//   amount: number;
// }

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [transactionId, setTransactionId] = useState(0);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  function handleOpenEditTransactionModal(id: number) {
    setIsEditTransactionModalOpen(true);
    setTransactionId(id);
  }

  function handleCloseEditTransactionModal() {
    setIsEditTransactionModalOpen(false);
    setTransactionId(2);
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionId,
        createTransaction,
        handleCloseEditTransactionModal,
        handleCloseNewTransactionModal,
        handleOpenEditTransactionModal,
        handleOpenNewTransactionModal,
        isEditTransactionModalOpen,
        isNewTransactionModalOpen,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
