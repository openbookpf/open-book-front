import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFromCurrency, setExchangeRate } from "../../redux/actions";
import axios from "axios";

const PriceConverter = () => {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.fromCurrency);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/4181e515fd970b9491f6594d/latest/usd`
        );

        const data = response.data;
        dispatch(setExchangeRate(data.conversion_rates));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchExchangeRates();
  }, []);

  return (
    <div>
      <select
        className="m-5 text-sm rounded-xl bg-blue-0 text-white-0 px-2 py-1 hover:scale-105 transition-transform delay-50 "
        value={selectedCurrency}
        onChange={(e) => dispatch(setFromCurrency(e.target.value))}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ARS">ARS</option>
      </select>
    </div>
  );
};

export default PriceConverter;
