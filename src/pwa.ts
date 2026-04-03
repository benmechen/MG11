import { registerSW } from "virtual:pwa-register";

// Register service worker for PWA offline support
const updateSW = registerSW({
  onNeedRefresh() {
    // Prompt user when new version is available
    if (confirm("New content available. Reload to update?")) {
      updateSW(true); // Force update and reload
    }
  },
  onOfflineReady() {
    // Notify user that app is ready to work offline
    console.log("App ready to work offline");
    // You could show a toast notification here
  },
});
