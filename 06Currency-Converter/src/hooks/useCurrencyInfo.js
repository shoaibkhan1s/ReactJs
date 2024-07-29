import { useState, useEffect } from "react";

// Custom hook jo currency information fetch karta hai
function useCurrencyInfo(currency) {

  // State variable 'data' create karte hain aur initial value empty object set karte hain
  const [data, setData] = useState({});

  // useEffect hook jo tab run hota hai jab 'currency' change hoti hai
  useEffect(() => {
    
    // API call karte hain specified URL pe jo 'currency' parameter use karta hai
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
    
    // Response ko JSON format mein convert karte hain
      .then((res) => res.json())
    
      // Response se specific currency data ko 'data' state variable mein set karte hain
      .then((res) => setData(res[currency]));
    
    
      // Debugging ke liye 'data' ko console pe print karte hain
    console.log(data);
  
}, [currency]); // Dependency array mein 'currency' daalte hain taaki effect tab run ho jab currency change ho

  // Debugging ke liye 'data' ko console pe print karte hain
  console.log(data);

  // Hook se 'data' ko return karte hain
  return data;
}

// Hook ko default export banate hain taaki dusre files mein use kar sakein
export default useCurrencyInfo;
