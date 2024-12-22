"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

const PurchasesManager = () => {
  const [purchases, setPurchases] = useState<
    {
      purchase_id: number;
      customer_id: number;
      product_id: number;
      quantity: number;
      total_price: number;
      purchase_date: string;
    }[]
  >([]);

  const [customerId, setCustomerId] = useState<number | "">("");
  const [productId, setProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [tableStatus, setTableStatus] = useState<string>("");

  // Function to create the table
  const createTable = async () => {
    try {
      setTableStatus("Creating table...");

      const { error } = await supabase.rpc("create_purchases_table");
      if (error) {
        console.error("Error creating table:", error.message);
        setTableStatus("Error creating table: " + error.message);
        return;
      }

      setTableStatus("Table created successfully!");
      fetchPurchases();
    } catch (err) {
      console.error("Error:", err);
      setTableStatus("Error creating table: " + String(err));
    }
  };

  // Function to fetch purchases
  const fetchPurchases = async () => {
    const { data, error } = await supabase.from("purchases").select("*");
    if (error) {
      console.error("Error fetching purchases:", error.message);
      return;
    }

    setPurchases(data || []);
  };

  // Function to add a purchase
  const addPurchase = async () => {
    if (!customerId || !productId || !quantity || !totalPrice) return;

    setLoading(true);

    const { error } = await supabase.from("purchases").insert([
      {
        customer_id: customerId,
        product_id: productId,
        quantity,
        total_price: totalPrice,
      },
    ]);

    if (error) {
      console.error("Error adding purchase:", error.message);
      setLoading(false);
      return;
    }

    setCustomerId("");
    setProductId("");
    setQuantity("");
    setTotalPrice("");
    fetchPurchases();
    setLoading(false);
  };

  // Initialize table on component mount
  useEffect(() => {
    createTable();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Purchases Manager</h1>

      {/* Table status */}
      {tableStatus && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          Status: {tableStatus}
        </div>
      )}

      {/* Add purchase form */}
      <div className="mb-4">
        <input
          type="number"
          value={customerId}
          onChange={(e) => setCustomerId(Number(e.target.value))}
          placeholder="Customer ID"
          className="border p-2 mr-2 rounded"
        />
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(Number(e.target.value))}
          placeholder="Product ID"
          className="border p-2 mr-2 rounded"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
          className="border p-2 mr-2 rounded"
        />
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(Number(e.target.value))}
          placeholder="Total Price"
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={addPurchase}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Purchase"}
        </button>
      </div>

      {/* Purchases list */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Purchases List</h2>
        {purchases.length === 0 ? (
          <p>No purchases added yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {purchases.map((purchase) => (
              <li key={purchase.purchase_id}>
                Purchase ID: {purchase.purchase_id}, Customer ID:{" "}
                {purchase.customer_id}, Product ID: {purchase.product_id},
                Quantity: {purchase.quantity}, Total Price:{" "}
                {purchase.total_price}, Date: {purchase.purchase_date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PurchasesManager;
