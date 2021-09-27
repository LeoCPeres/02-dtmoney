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
  title: string;
  category: string;
  type: string;
  amount: number;

  transaction: {
    id: number;
    title: string;
    category: string;
    type: string;
    amount: number;
    createdAt: string;
  };

  createTransaction: (transaction: TransactionInput) => Promise<void>;
  handleOpenNewTransactionModal: () => void;
  handleCloseNewTransactionModal: () => void;
  handleOpenEditTransactionModal: (id: number) => void;
  handleCloseEditTransactionModal: () => void;
  handleSetTitle: (title: string) => void;
  handleSetCategory: (category: string) => void;
  handleSetAmount: (amount: number) => void;
  handleSetType: (type: string) => void;
  editTransaction: (transactionInput: TransactionInput) => Promise<void>;
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
  const [transaction, setTransaction] = useState<Transaction>(
    {} as Transaction
  );
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

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

  const [id, setId] = useState(1);

  function handleOpenEditTransactionModal(id: number) {
    setIsEditTransactionModalOpen(true);
    setTransaction(transactions[id - 1]);
    setId(id);
  }

  useEffect(() => {
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setType(transaction.type);
    setCategory(transaction.category);
  }, [id]);

  function handleCloseEditTransactionModal() {
    setIsEditTransactionModalOpen(false);
  }

  function handleSetTitle(title: string) {
    setTitle(title);
  }

  function handleSetAmount(amount: number) {
    setAmount(amount);
  }

  function handleSetType(type: string) {
    setType(type);
  }

  function handleSetCategory(category: string) {
    setCategory(category);
  }

  async function editTransaction(transactionInput: TransactionInput) {
    const response = await api.patch(`/transactions/${id}`, {
      ...transactionInput,
    });

    const { editedTransaction } = response.data;

    setTransactions([editedTransaction]);
    console.log(editedTransaction);
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([transaction]);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transaction,
        createTransaction,
        title,
        category,
        type,
        amount,
        handleSetAmount,
        handleSetCategory,
        handleSetTitle,
        editTransaction,
        handleSetType,
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
