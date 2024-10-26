import express from "express";
import axios from "axios";

const router = express.Router();

// Existing Payment Initialization Route
router.post("/initialize", async (req, res) => {
  const { email, amount, mobileNumber } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email,
        amount: amount * 100, // Convert to kobo
        channels: ["mobile_money"],
        metadata: {
          mobile_number: mobileNumber,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res
      .status(200)
      .json({ authorization_url: response.data.data.authorization_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

// New Payout Route
router.post("/payout", async (req, res) => {
  const { amount, mobileNumber } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transfer",
      {
        amount: amount * 100, // Amount in kobo
        recipient: mobileNumber, // Mobile money number
        currency: "GHS", // Ghanaian Cedi
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Payout successful", data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payout failed" });
  }
});

export default router;
