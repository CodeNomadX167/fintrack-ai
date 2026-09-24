import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import TransactionDetails from "./pages/TransactionDetails";
import Categories from "./pages/Categories";
import Accounts from "./pages/Accounts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/add-transaction" element={<AddTransaction />} />

        <Route path="/edit-transaction/:id" element={<AddTransaction />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
