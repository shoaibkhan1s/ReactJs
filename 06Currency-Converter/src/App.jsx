import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  // State variables declare karte hain
  const [amount, setAmount] = useState(0); // Amount input field ke liye
  const [from, setFrom] = useState("usd"); // Source currency ke liye
  const [to, setTo] = useState("inr"); // Target currency ke liye
  const [convertedAmount, setConvertedAmount] = useState(0); // Converted amount ke liye

  // useCurrencyInfo hook use karke currency information fetch karte hain
  const currencyInfo = useCurrencyInfo(from);

  // Available currency options ko object keys se nikalte hain
  const options = Object.keys(currencyInfo);

  // Currency swap karne ke liye function
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  // Currency convert karne ke liye function
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      // Background image aur styling set karte hain
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            // Form submit hone par convert function call karte hain
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)} // Currency change handler
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)} // Amount change handler
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap} // Swap button click handler
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount} // Converted amount display
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)} // Currency change handler
                selectCurrency={to}
                amountDisable // Amount input disable karte hain
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
