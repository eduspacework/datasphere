document.getElementById("bookDemoForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  formData.append("Name", form.firstName.value + " " + form.lastName.value);
  formData.append("Email", form.email.value);
  formData.append("Phone", form.phone.value);
  formData.append("Course", form.program.value);
  formData.append("Date", form.preferredDate.value);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxCz8UN1Ui5CBu6fyh_NDBCojvMgSYaTi0zERtj8RVE0BfTfdHCexXeGLXKGsKbzoPsxA/exec", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    alert("Submitted")
    
    if (text.includes("✅ Success")) {
      alert("✅ Demo booked successfully! You’ll receive confirmation shortly.");
      form.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById("bookDemoModal"));
      if (modal) modal.hide();
    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});

