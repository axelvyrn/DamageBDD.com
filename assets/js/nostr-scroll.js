// nostr-scroll.js
export function initNostrScroll({ containerId, pubkey, limit = 50 }) {
  const relay = new WebSocket("wss://relay.damus.io");
  const container = document.getElementById(containerId);
  let since = Math.floor(Date.now() / 1000);
  let loading = false;
  let done = false;

  function parseMarkdown(text) {
    // Escape HTML
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Inline code: `code`
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold: **bold**
    text = text.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');

    // Italic: *italic*
    text = text.replace(/\*([^*]+)\*/g, '<i>$1</i>');

    // Links: [text](url)
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Auto-link bare URLs
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

    // Images from links (jpg/png/webp/gif)
    text = text.replace(/(https?:\/\/[^\s]+?\.(png|jpg|jpeg|gif|webp))/g,
      '<img src="$1" style="max-width: 100%; margin-top: 0.5rem;" />');

    return text;
  }

  function loadPosts() {
    if (loading || done) return;
    loading = true;

    const subId = "sub" + Math.random().toString(36).slice(2);
    const filter = {
      kinds: [1],
      authors: [pubkey],
      until: since,
      limit
    };

    relay.send(JSON.stringify(["REQ", subId, filter]));

    relay.addEventListener("message", function handler(event) {
      const data = JSON.parse(event.data);
      if (data[0] === "EVENT" && data[1] === subId) {
        const ev = data[2];
        const div = document.createElement("div");
        div.className = "nostr-post";
        div.innerHTML = parseMarkdown(ev.content);
        container.appendChild(div);
        since = ev.created_at - 1;
      } else if (data[0] === "EOSE" && data[1] === subId) {
        relay.removeEventListener("message", handler);
        loading = false;
      }
    });
  }

  container.addEventListener("scroll", () => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
      loadPosts();
    }
  });

  relay.addEventListener("open", () => {
    loadPosts(); // Initial load
  });
}

