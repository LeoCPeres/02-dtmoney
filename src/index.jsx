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

    this.delete('/transactions/:id', (schema, request) => {
      let id = request.params.id

      return schema.transactions.find(id).destroy();

    });

    this.patch("/transactions/:id", (schema, request) => {
      const newData = JSON.parse(request.requestBody);
      let id = request.params.id;

      const transaction = schema.transactions.find(id);

      return transaction.update(newData);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
