import { useState } from "react";

export default function App() {
  const [PayRaw, setPayRaw] = useState(0);
  const [rate, setRate] = useState(0);
  const [rate2, setRate2] = useState(0);

  function handlePayRaw(pay) {
    setPayRaw(pay);
  }

  function handleRate(rate) {
    setRate(rate);
  }

  function handleRate2(rate2) {
    setRate2(rate2);
  }
  return (
    <div>
      <Bill PayRaw={PayRaw} handlePayRaw={handlePayRaw}>
        <p>How much was the bill?</p>
      </Bill>
      <Tip rate={rate} handleRate={handleRate}>
        <p>How did you like the service?</p>
      </Tip>
      <Tip rate={rate2} handleRate={handleRate2}>
        <p>How did your friend like the service?</p>
      </Tip>
      <Pay rate={rate} rate2={rate2} payRaw={PayRaw} />
      <Reset
        handlePayRaw={handlePayRaw}
        handleRate={handleRate}
        handlerate2={handleRate2}
      />
    </div>
  );
}

function Bill({ PayRaw, handlePayRaw, children }) {
  return (
    <div>
      {children}
      <input
        type="text"
        value={PayRaw}
        onChange={(e) => handlePayRaw(Number(e.target.value))}
      ></input>
    </div>
  );
}

function Tip({ rate, handleRate, children }) {
  return (
    <div>
      {children}
      <select value={rate} onChange={(e) => handleRate(Number(e.target.value))}>
        <option value={0}>Dissatisfied(0%)</option>
        <option value={0.05}>It was ok(5%)</option>
        <option value={0.1}>It was good(10%)</option>
        <option value={0.2}>Absolutely amazing!(20%)</option>
      </select>
    </div>
  );
}

function Pay({ payRaw, rate, rate2 }) {
  return (
    <div>
      {rate > 0
        ? `You pay ${
            payRaw + (payRaw * (rate + rate2)) / 2
          }$ in total(${payRaw}$ + ${Math.round(
            (payRaw * (rate + rate2)) / 2
          )}$ Tip)`
        : `You pay ${payRaw}$ with no tip!`}
    </div>
  );
}

function Reset({ handlePayRaw, handleRate, handlerate2 }) {
  return (
    <button
      onClick={(e) => {
        handlePayRaw(0);
        handleRate(0);
        handlerate2(0);
      }}
    >
      Reset
    </button>
  );
}
