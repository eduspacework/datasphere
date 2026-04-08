const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwAlNhdjXExj8JRtSS7OZE_9TnuqVVUAmw0SgQvXHDFD-W0RheAfV0eKLr9e__OLVHqpg/exec";
const SECRET_TOKEN = "my-secret-key";

document.getElementById("applicationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const overlay = document.getElementById("loadingOverlay");
  const btn = form.querySelector("button[type='submit']");

  // Validation
  if (!form.FullName.value.trim() || !form.Email.value.trim()) {
    alert("Please enter your full name and email.");
    return;
  }

  // 🔥 SHOW loader (ONLY here)
  overlay.style.display = "flex";
  btn.disabled = true;
  btn.innerText = "Submitting...";

  const formData = new FormData();

  formData.append("FullName", form.FullName.value.trim());
  formData.append("Email", form.Email.value.trim());
  formData.append("Phone", form.Phone.value || "");
  formData.append("Age", form.Age.value || "");
  formData.append("Education", form.Education.value || "");
  formData.append("Institution", form.Institution.value || "");
  formData.append("City", form.City.value || "");
  formData.append("Experience", form.Experience.value || "");
  formData.append("Why", form.Why.value || "");
  formData.append("Eligibility", form.Eligibility.checked ? "true" : "false");
  formData.append("token", SECRET_TOKEN);

  // File handling
  const proof = form.Proof.files[0];

  if (proof) {
    const reader = new FileReader();

    const base64Data = await new Promise((resolve, reject) => {
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(encodeURIComponent(base64));
      };
      reader.onerror = reject;
      reader.readAsDataURL(proof);
    });

    formData.append("ProofBase64", base64Data);
    formData.append("ProofName", proof.name);
    formData.append("ProofMime", proof.type);
  }

  try {
    const res = await fetch(GAS_ENDPOINT, {
      method: "POST",
      body: new URLSearchParams(formData)
    });

    const text = await res.text();

    if (text.includes("✅ Success")) {
      alert("✅ Registration submitted successfully!");
      form.reset();
    } else {
      alert("⚠️ Submission failed:\n" + text);
    }

  } catch (err) {
    alert("❌ Network error: " + err.message);
  }

  // 🔥 ALWAYS HIDE loader (critical fix)
  overlay.style.display = "none";
  btn.disabled = false;
  btn.innerText = "Register";
});
