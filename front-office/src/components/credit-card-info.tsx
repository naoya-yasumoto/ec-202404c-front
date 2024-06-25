import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOST_IP } from "../config";

const CreditCardInfo: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("paypal");
  const [cardDetails, setCardDetails] = useState({
    card_number: "",
    card_exp_month: "",
    card_exp_year: "",
    card_cvv: "",
  });
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [billingOption, setBillingOption] = useState<string>("monthly");
  const navigate = useNavigate();

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "card_number") {
      // スペースを削除
      formattedValue = value.replace(/\s/g, "");

      // 最大16桁まで制限
      if (formattedValue.length > 16) {
        formattedValue = formattedValue.slice(0, 16);
      }

      // 4桁ずつ区切る
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(" ") || "";
    }
    if (name === "card_cvv") {
      // 最大3桁まで制限
      formattedValue = value.slice(0, 3);
    }

    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: formattedValue,
    }));
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBillingOption(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment Method:", paymentMethod);
    console.log("Card Details:", cardDetails);
    console.log("Terms Accepted:", termsAccepted);
    console.log("Billing Option:", billingOption);

    try {
      const response = await axios.post(
        `http://${HOST_IP}:8080/ec-202404c/order/card`,
        cardDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/complete");
      } else {
        alert("このカードはご利用いただけません");
      }
      console.log("response: ", response.data);
    } catch (error) {
      console.error("Error during form submission: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-8">
      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg"
      >
        <div className="lg:col-span-2">
          <h2 className="text-sm font-medium">Payment Method</h2>
          <div className="bg-white rounded mt-4 shadow-lg">
            <div className="flex items-center px-8 py-5">
              <input
                className="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 checked:bg-blue-600"
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={handlePaymentMethodChange}
              />
              <label className="text-sm font-medium ml-4">PayPal</label>
            </div>
            <div className="border-t">
              <div className="flex items-center px-8 py-5">
                <input
                  className="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 checked:bg-blue-600"
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={handlePaymentMethodChange}
                />
                <label className="text-sm font-medium ml-4">Credit Card</label>
              </div>
              {paymentMethod === "credit-card" && (
                <div className="grid grid-cols-2 gap-4 px-8 pb-8">
                  <div className="col-span-2">
                    <label
                      className="text-xs font-semibold"
                      htmlFor="card_number"
                    >
                      Card number
                    </label>
                    <input
                      className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                      type="text"
                      name="card_number"
                      value={cardDetails.card_number}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-semibold"
                      htmlFor="card_exp_month"
                    >
                      Expiry Month
                    </label>
                    <input
                      className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                      type="text"
                      name="card_exp_month"
                      value={cardDetails.card_exp_month}
                      onChange={handleInputChange}
                      placeholder="MM"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-semibold"
                      htmlFor="card_exp_year"
                    >
                      Expiry Year
                    </label>
                    <input
                      className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                      type="text"
                      name="card_exp_year"
                      value={cardDetails.card_exp_year}
                      onChange={handleInputChange}
                      placeholder="YYYY"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold" htmlFor="card_cvv">
                      CVC/CVV
                    </label>
                    <input
                      className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                      type="password"
                      name="card_cvv"
                      value={cardDetails.card_cvv}
                      onChange={handleInputChange}
                      placeholder="..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-medium">Purchase Summary</h2>
          <div className="bg-white rounded mt-4 shadow-lg py-6">
            <div className="px-8">
              <div className="flex items-end">
                <select
                  className="text-sm font-medium focus:outline-none -ml-1"
                  value={billingOption}
                  onChange={handleBillingChange}
                >
                  <option value="monthly">Product (Billed Monthly)</option>
                  <option value="annually">Product (Billed Annually)</option>
                </select>
                <span className="text-sm ml-auto font-semibold">$20</span>
                <span className="text-xs text-gray-500 mb-px">/mo</span>
              </div>
              <span className="text-xs text-gray-500 mt-2">
                Save 20% with annual billing
              </span>
            </div>
            <div className="px-8 mt-4">
              <div className="flex items-end justify-between">
                <span className="text-sm font-semibold">Tax</span>
                <span className="text-sm text-gray-500 mb-px">10%</span>
              </div>
            </div>
            <div className="px-8 mt-4 border-t pt-4">
              <div className="flex items-end justify-between">
                <span className="font-semibold">Today you pay (AUD)</span>
                <span className="font-semibold">$0</span>
              </div>
              <span className="text-xs text-gray-500 mt-2">
                After 1 month free: $22/mo.
              </span>
            </div>
            <div className="flex items-center px-8 mt-8">
              <input
                id="termsConditions"
                type="checkbox"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              <label
                className="text-xs text-gray-500 ml-2"
                htmlFor="termsConditions"
              >
                I agree to the terms and conditions.
              </label>
            </div>
            <div className="flex flex-col px-8 pt-4">
              <button
                type="submit"
                className="flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700"
              >
                Start Subscription
              </button>
              <button
                type="button"
                className="text-xs text-blue-500 mt-3 underline"
              ></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreditCardInfo;