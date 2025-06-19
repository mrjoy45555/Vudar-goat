module.exports = {
  config: {
    name: "listbox",
    version: "1.0.0",
    credits: "Joy",
    role: 2,
    description: "Shows a list of options with buttons.",
    category: "utility",
    cooldowns: 5
  },

  onStart: async function ({ api, event }) {
    const msg = {
      body: "🧾 𝐏𝐥𝐞𝐚𝐬𝐞 𝐜𝐡𝐨𝐨𝐬𝐞 𝐚𝐧 𝐨𝐩𝐭𝐢𝐨𝐧:",
      attachment: null,
      buttons: [
        {
          type: "postback",
          title: "🔹 User Info",
          payload: "option_userinfo"
        },
        {
          type: "postback",
          title: "🕒 Show Time",
          payload: "option_time"
        },
        {
          type: "postback",
          title: "📚 Help Menu",
          payload: "option_help"
        }
      ]
    };

    return api.sendMessage(msg, event.threadID);
  },

  onEvent: async function ({ api, event }) {
    const { type, payload } = event;

    // Ensure only postback button clicks are handled
    if (type !== "postback") return;

    let reply = "";

    switch (payload) {
      case "option_userinfo":
        reply = `👤 User Info:\n• UID: ${event.senderID}\n• TID: ${event.threadID}`;
        break;
      case "option_time":
        reply = `🕒 Current Time: ${new Date().toLocaleString()}`;
        break;
      case "option_help":
        reply = `📚 Help Menu:\n• listbox\n• help\n• info`;
        break;
      default:
        reply = "❌ Unknown option.";
    }

    return api.sendMessage(reply, event.threadID, event.messageID);
  }
};
