import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const isLoading = useSelector((store) => store.account.isLoading);
  const balance = useSelector((store) => store.account.balance);

  return (
    <div className="balance">
      {isLoading ? "Loading..." : formatCurrency(balance)}
    </div>
  );
}

export default BalanceDisplay;
