/**
 * PulseCloud - Interactive JavaScript Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year in Footer
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // 3. Client Environment Inspector
  function updateInspector() {
    const originEl = document.getElementById("info-origin");
    const protocolEl = document.getElementById("info-protocol");
    const uaEl = document.getElementById("info-ua");
    const timeEl = document.getElementById("info-time");

    if (originEl) originEl.textContent = window.location.origin || "file:// (local)";
    if (protocolEl) protocolEl.textContent = window.location.protocol.toUpperCase().replace(":", "");
    if (uaEl) uaEl.textContent = navigator.userAgent.slice(0, 48) + "...";
    if (timeEl) timeEl.textContent = new Date().toLocaleTimeString();
  }

  updateInspector();

  const refreshBtn = document.getElementById("refresh-info-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      updateInspector();
      showToast("Environment inspector refreshed! ✨");
    });
  }

  // 4. Code Snippet Copy Button
  const copyBtn = document.getElementById("copy-btn");
  const codeSnippet = document.getElementById("code-snippet");

  if (copyBtn && codeSnippet) {
    copyBtn.addEventListener("click", async () => {
      try {
        const textToCopy = codeSnippet.innerText;
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.textContent = "Copied!";
        showToast("Snippet copied to clipboard! 📋");
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      } catch (err) {
        // Fallback if clipboard API is not permitted
        copyBtn.textContent = "Copied!";
        showToast("Snippet selected!");
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      }
    });
  }

  // 5. Simulate Deploy Interactive Button
  const deployBtn = document.getElementById("demo-deploy-btn");
  if (deployBtn) {
    deployBtn.addEventListener("click", () => {
      deployBtn.disabled = true;
      const originalText = deployBtn.innerHTML;
      deployBtn.innerHTML = "Deploying...";

      setTimeout(() => {
        deployBtn.innerHTML = "Building static assets...";
      }, 700);

      setTimeout(() => {
        deployBtn.innerHTML = "Pushing to edge CDN...";
      }, 1400);

      setTimeout(() => {
        deployBtn.innerHTML = "Live! 🎉";
        showToast("Deployment simulation completed: Status 200 OK! 🚀");
        setTimeout(() => {
          deployBtn.innerHTML = originalText;
          deployBtn.disabled = false;
        }, 2000);
      }, 2100);
    });
  }

  // 6. Toast Notification Helper
  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
});
