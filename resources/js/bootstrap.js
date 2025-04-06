import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Make Pusher available globally (needed for Echo even when using Reverb)
window.Pusher = Pusher;

// Debugging to see what values are actually available
console.log("REVERB CONFIG:", {
    key: import.meta.env.VITE_REVERB_APP_KEY,
    host: import.meta.env.VITE_REVERB_HOST,
    port: import.meta.env.VITE_REVERB_PORT,
    scheme: import.meta.env.VITE_REVERB_SCHEME,
    cluster: import.meta.env.VITE_REVERB_CLUSTER,
});

window.Echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY,
    cluster: import.meta.env.VITE_REVERB_CLUSTER || "mt1",
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: parseInt(import.meta.env.VITE_REVERB_PORT || "8080"),
    wssPort: parseInt(import.meta.env.VITE_REVERB_PORT || "8080"),
    // Force regular WebSockets instead of secure WebSockets
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    disableStats: true,
});
