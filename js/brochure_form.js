document.getElementById("brochureForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  // Add email from the form
  formData.append("Email", form.Email.value);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyn337Qzq7u7X92xha1pb1ucPbDiqohchlNhTTmiJwW2U6RvaV3LsoGrzXZesxyOkX_Fg/exec", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    alert("Submitted")


    if (text.includes("✅")) {
      alert("✅ Brochure sent successfully!");
      form.reset();
    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});