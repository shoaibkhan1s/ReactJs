import React, { useId } from 'react';

// InputBox component definition
function InputBox({
    label, // input field ka label
    amount, // current amount value
    onAmountChange, // amount change hone par call hone wala function
    onCurrencyChange, // currency change hone par call hone wala function
    currencyOptions = [], // available currency options list
    selectCurrency = "usd", // default selected currency
    amountDisable = false, // amount input disabled hai ya nahi
    currencyDisable = false, // currency select disabled hai ya nahi
    className = "", // additional CSS classes
}) {
    // unique ID generate karne ke liye useId hook ka use
    const amountInputId = useId();

    return (
        // Main container div, jo CSS classes ko apply karta hai
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                {/* Input field ka label */}
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                {/* Amount input field */}
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number" // Input field ka type number set karta hai
                    placeholder="Amount" // Placeholder text jab field empty ho
                    disabled={amountDisable} // Agar amountDisable true ho to field disabled hoga
                    value={amount} // Current amount value set karta hai
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} // Value change hone par call hone wala function
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                {/* Currency type label */}
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                {/* Currency select dropdown */}
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency} // Current selected currency value set karta hai
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // Value change hone par call hone wala function
                    disabled={currencyDisable} // Agar currencyDisable true ho to dropdown disabled hoga
                >
                    {/* Currency options ko map karke dropdown ke liye options create karta hai */}
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
