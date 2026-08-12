(function () {
  const memoryStore = new Map();

  function getStorage() {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  const storage = getStorage();
  if (!storage) {
    const fallback = {
      getItem(key) {
        return memoryStore.has(key) ? memoryStore.get(key) : null;
      },
      setItem(key, value) {
        memoryStore.set(String(key), String(value));
      },
      removeItem(key) {
        memoryStore.delete(String(key));
      },
    };

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      enumerable: true,
      value: fallback,
    });
    return;
  }

  const originalGetItem = storage.getItem.bind(storage);
  const originalSetItem = storage.setItem.bind(storage);
  const originalRemoveItem = storage.removeItem.bind(storage);

  storage.getItem = function getItemWithFallback(key) {
    try {
      return originalGetItem(key);
    } catch {
      return memoryStore.has(key) ? memoryStore.get(key) : null;
    }
  };

  storage.setItem = function setItemWithFallback(key, value) {
    const normalizedKey = String(key);
    const normalizedValue = String(value);
    memoryStore.set(normalizedKey, normalizedValue);

    try {
      return originalSetItem(normalizedKey, normalizedValue);
    } catch {
      return undefined;
    }
  };

  storage.removeItem = function removeItemWithFallback(key) {
    const normalizedKey = String(key);
    memoryStore.delete(normalizedKey);

    try {
      return originalRemoveItem(normalizedKey);
    } catch {
      return undefined;
    }
  };
})();
