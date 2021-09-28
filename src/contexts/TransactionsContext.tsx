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
  isDeleteTransactionModalOpen: boolean;
  title: string;
  category: string;
  type: string;
  amount: number;
  id: number;

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
  handleOpenDeleteTransactionModal: (id: number) => void;
  handleCloseEditTransactionModal: () => void;
  handleCloseDeleteTransactionModal: () => void;
  handleSetTitle: (title: string) => void;
  handleSetCategory: (category: string) => void;
  handleSetAmount: (amount: number) => void;
  handleSetType: (type: string) => void;
  editTransaction: (transactionInput: TransactionEdit) => Promise<void>;
  deleteTransaction: () => Promise<void>;
}

// interface TransactionInput {
//   title: string;
//   category: string;
//   type: string;
//   amount: number;
// }

type TransactionInput = Omit<Transaction, "id" | "createdAt">;
type TransactionEdit = Omit<Transaction, "createdAt">;

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] =
    useState(false);
  const [transaction, setTransaction] = useState<Transaction>(
    {} as Transaction
  );
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  const [id, setId] = useState(0);

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
    setId(id);
  }, [id]);

  console.log(id);

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

  async function editTransaction(transactionInput: TransactionEdit) {
    const newTransaction = transactions.map((transaction: Transaction) =>
      transaction.id === id
        ? {
            ...transaction,
            title: title,
            category: category,
            amount: amount,
            type: type,
          }
        : transaction
    );

    setTransactions(newTransaction);
  }

  async function deleteTransaction() {
    console.log(id);
    const responseDelete = await api.delete(`/transactions/${id}`);

    const filteredTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    console.log(filteredTransactions);
    setTransactions(filteredTransactions);

    console.log(responseDelete.status);
  }

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  function handleOpenDeleteTransactionModal(id: number) {
    setIsDeleteTransactionModalOpen(true);
    setTransaction(transactions[id - 1]);
    setId(id);
  }
  function handleCloseDeleteTransactionModal() {
    setIsDeleteTransactionModalOpen(false);
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
        id,
        amount,
        handleSetAmount,
        handleSetCategory,
        handleSetTitle,
        isDeleteTransactionModalOpen,
        editTransaction,
        handleSetType,
        deleteTransaction,
        handleCloseEditTransactionModal,
        handleCloseNewTransactionModal,
        handleOpenEditTransactionModal,
        handleOpenNewTransactionModal,
        isEditTransactionModalOpen,
        isNewTransactionModalOpen,
        handleOpenDeleteTransactionModal,
        handleCloseDeleteTransactionModal,
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
