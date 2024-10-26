document
  .getElementById("paymentForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const amount = document.getElementById("amount").value;
    const mobileNumber = document.getElementById("mobileNumber").value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment/initialize",
        {
          email,
          amount,
          mobileNumber,
        }
      );

      // Redirect to payment authorization URL
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error(error);
      alert("Payment initiation failed");
    }
  });

// Handle payout submission
document
  .getElementById("payoutForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const amount = document.getElementById("payoutAmount").value;
    const mobileNumber = document.getElementById("payoutMobileNumber").value;

    if (mobileNumber.length !== 10) {
      alert("Invalid mobile number. Please enter a 10-digit mobile number");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment/payout",
        {
          amount,
          mobileNumber,
        }
      );

      alert("Payout successful: " + response.data.message);
    } catch (error) {
      console.error(error);
      alert("Payout failed");
    }
  });
