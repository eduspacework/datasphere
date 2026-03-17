document.getElementById("applicationForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  // Personal Info
  formData.append("FullName", form.FullName.value);
  formData.append("Email", form.Email.value);
  formData.append("Phone", form.Phone.value);
  formData.append("Location", form.Location.value);

  // Program Details
  formData.append("Program", form.Program.value);
  formData.append("PreferredMonth", form.PreferredMonth.value);

  // Background
  formData.append("Qualification", form.Qualification.value);
  formData.append("Experience", form.Experience.value);
  formData.append("Background", form.Background.value);

  // Motivation & Career Goals
  formData.append("Motivation", form.Motivation.value);
  formData.append("CareerGoals", form.CareerGoals.value);

  // Resume (optional)
  const resumeFile = form.Resume.files[0];
  if (resumeFile) {
    formData.append("Resume", resumeFile);
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwzu-uCSPaZTpUqJxZVBabS5IXi06jU-sKlc--OFg12sSRdeJ0m-duS-KQboSt8ERog-g/exec", {
      method: "POST",
      body: formData
    });

    const text = await response.text();
    console.log("Server response:", text);

    if (text.includes("✅ Success")) {
      alert("✅ Your application has been submitted successfully! Redirecting to payment...");
      form.reset();
      
      // Redirect to payment page after successful submission
      window.location.href = "https://payments.cashfree.com/forms/datasphere_application";

    } else {
      alert("⚠️ Something went wrong: " + text);
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});
