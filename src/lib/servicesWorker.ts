import { WorkboxLifecycleWaitingEvent } from "workbox-window";

import {BASE_PATH} from "@/lib/constant";

export async function registerSWwithWorkbox() {
  if ("serviceWorker" in navigator) {
    const { Workbox } = await import("workbox-window");

    const wb = new Workbox(BASE_PATH.concat("/sw.js"));

    const showSkipWaitingPrompt = async (
      event: WorkboxLifecycleWaitingEvent
    ) => {
      console.log("serviceWorker showSkipWaitingPrompt");
      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated service worker is still waiting.
      if (event.wasWaitingBeforeRegister) {
        // Assuming the user accepted the update, set up a listener
        // that will reload the page as soon as the previously waiting
        // service worker has taken control.
        wb.addEventListener("controlling", () => {
          console.log("serviceWorker controlling");
          // At this point, reloading will ensure that the current
          // tab is loaded under the control of the new service worker.
          // Depending on your web app, you may want to auto-save or
          // persist transient state before triggering the reload.
          window.location.reload();
        });

        if (confirm("Reload web for update now?")) {
          wb.messageSkipWaiting();
        }
      }
    };

    wb.addEventListener("installed", (event) => {
      if (!event.isUpdate) {
        // First-installed code goes here...
        console.log("serviceWorker installing for the first time!");
      } else {
        console.log("serviceWorker installing");
      }
    });

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener("waiting", (event) => {
      console.log("serviceWorker waiting");
      showSkipWaitingPrompt(event);
    });

    wb.register();
    console.log("Service Worker register");

    const swVersion = await wb.messageSW({ type: "GET_VERSION" });
    console.log("Service Worker version:", swVersion);
  } else {
    console.warn("serviceWorker not supported");
  }
}
