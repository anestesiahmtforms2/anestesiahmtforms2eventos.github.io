(function () {
  const APP_PASSWORD = "8145";
  const AUTH_STORAGE_KEY = "eventos-escala-auth-state";
  const AUTH_DURATION_MS = 90 * 24 * 60 * 60 * 1000;

  function showFallbackMessage(message) {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = message;
      toast.classList.add("visible");
      window.clearTimeout(showFallbackMessage.timeoutId);
      showFallbackMessage.timeoutId = window.setTimeout(() => {
        toast.classList.remove("visible");
      }, 2800);
      return;
    }

    window.alert(message);
  }

  function unlockFallback() {
    const authCard = document.getElementById("authCard");
    const appContent = document.getElementById("appContent");

    try {
      window.localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          unlockedAt: Date.now(),
          expiresAt: Date.now() + AUTH_DURATION_MS,
        }),
      );
    } catch {
      // The storage shim will keep an in-memory fallback when persistent storage fails.
    }

    authCard?.classList.add("hidden");
    appContent?.classList.remove("hidden");
  }

  function bindFallbackAuth() {
    const authForm = document.getElementById("authForm");
    const passwordInput = document.getElementById("passwordInput");

    if (!authForm || !passwordInput) {
      return;
    }

    authForm.addEventListener("submit", (event) => {
      const sanitized = String(passwordInput.value || "").replace(/\D/g, "").slice(0, 4);
      passwordInput.value = sanitized;

      if (sanitized !== APP_PASSWORD) {
        return;
      }

      event.preventDefault();
      unlockFallback();
      showFallbackMessage("Acesso liberado.");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindFallbackAuth, { once: true });
  } else {
    bindFallbackAuth();
  }
})();
