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
  then?: string;
  catch?: string;
  finally?: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  isNewTransactionModalOpen: boolean;
  isEditTransactionModalOpen: boolean;
  success: boolean;
  handleSetSuccess: () => void;
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

  const [success, setSuccess] = useState(false);

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
  }

  function handleCloseEditTransactionModal() {
    setIsEditTransactionModalOpen(false);
  }

  function handleSetSuccess() {
    setSuccess(true);
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setSuccess(true);
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        success,
        handleSetSuccess,
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
