import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import TransactionDetails from "./pages/TransactionDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/add-transaction" element={<AddTransaction />} />

        <Route
          path="/edit-transaction/:id"
          element={<AddTransaction />}
        />
        <Route
  path="/transactions/:id"
  element={<TransactionDetails />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;