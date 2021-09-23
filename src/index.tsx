import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "Venda",
          amount: 12000,
          createdAt: new Date("2021-04-13 09:00:00"),
        },
        {
          id: 2,
          title: "Hamburguer",
          type: "withdraw",
          category: "Alimentação",
          amount: 59,
          createdAt: new Date("2021-04-10 12:35:00"),
        },
        {
          id: 3,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1200,
          createdAt: new Date("2021-03-27 17:42:00"),
        },
        {
          id: 4,
          title: "Computador",
          type: "deposit",
          category: "Venda",
          amount: 5400,
          createdAt: new Date("2021-03-15 15:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
