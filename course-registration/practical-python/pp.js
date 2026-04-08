// Replace with your Google Apps Script endpoint
const GAS_ENDPOINT = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
const PAID_REDIRECT = "https://payments.cashfree.com/forms/datasphere_application";

document.getElementById("applicationForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;

  // Basic client-side validation
  if (!form.FullName.value.trim() || !form.Email.value.trim()) {
    alert("Please enter your full name and email.");
    return;
  }

  // Ensure eligibility checkbox is checked
  const eligibilityChecked = form.querySelector('input[name="Eligibility"]');
  if (eligibilityChecked && !eligibilityChecked.checked) {
    alert("Please confirm your eligibility to proceed.");
    return;
  }

  // If education choice is "Other (not eligible for free seat)", confirm they accept paid redirect
  const education = (form.Education && form.Education.value) ? form.Education.value : "";
  const wantsPaid = education.toLowerCase().includes("other");

  const formData = new FormData();

  // Personal Info
  formData.append("FullName", form.FullName.value.trim());
  formData.append("Email", form.Email.value.trim());
  formData.append("Phone", (form.Phone && form.Phone.value) ? form.Phone.value.trim() : "");
  formData.append("Age", (form.Age && form.Age.value) ? form.Age.value.trim() : "");
  formData.append("Education", education);
  formData.append("Institution", (form.Institution && form.Institution.value) ? form.Institution.value.trim() : "");
  formData.append("City", (form.City && form.City.value) ? form.City.value.trim() : "");

  // Course-related fields (adapted)
  formData.append("Course", "Free Practical Python Course");
  formData.append("Experience", (form.Experience && form.Experience.value) ? form.Experience.value.trim() : "");
  formData.append("Why", (form.Why && form.Why.value) ? form.Why.value.trim() : "");

  // Optional proof of enrollment
  const proof = (form.Proof && form.Proof.files && form.Proof.files[0]) ? form.Proof.files[0] : null;
  if (proof) formData.append("Proof", proof);

  // Timestamp
  formData.append("SubmittedAt", new Date().toISOString());

  try {
    const res = await fetch(GAS_ENDPOINT, {
      method: "POST",
      body: formData
    });

    const text = await res.text();
    console.log("GAS response:", text);

    // Adjust success detection depending on your script's reply
    const success = text.includes("✅ Success") || res.ok;

    if (success) {
      alert("✅ Registration submitted. We'll contact eligible candidates by email.");
      form.reset();

      if (wantsPaid) {
        // If the user selected "Other" (not eligible for free seat), redirect them to paid flow
        const proceed = confirm("You selected 'Other' (not eligible for free seat). Would you like to continue to the paid registration?");
        if (proceed) window.location.href = PAID_REDIRECT;
      }
    } else {
      alert("⚠️ Submission failed: " + text);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Network error: " + err.message);
  }
});
