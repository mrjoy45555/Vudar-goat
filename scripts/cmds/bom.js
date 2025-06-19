const axios = require("axios");

module.exports = {
  config: {
    name: "bom",
    version: "1.0.0",
    credits: "Rahad (Converted for GoatBot by Joy)",
    description: "Sends a spam message multiple times.",
    category: "fun",
    usages: "[amount]",
    cooldowns: 5
  },

  onStart: async function({ api, event, args }) {
    const userId = event.senderID;

    try {
      // Approved Admin List from GitHub
      const adminRes = await axios.get('https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/refs/heads/main/admins.json');
      const approvedAdmins = adminRes.data.adminUIDs;

      if (!approvedAdmins.includes(userId)) {
        return api.sendMessage(
          `𝐘𝐨𝐮 𝐝𝐨 𝐧𝐨𝐭 𝐡𝐚𝐯𝐞 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐭𝐨 𝐮𝐬𝐞 𝐭𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝. 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐭𝐡𝐞 𝐚𝐝𝐦𝐢𝐧 𝐟𝐨𝐫 𝐚𝐩𝐩𝐫𝐨𝐯𝐞😗.\n\n(𝗔𝗱𝗺𝗶𝗻) JOY AHMED\n🔵 m.me/100001435123762\n🔵 Fb: https://www.facebook.com/100001435123762`,
          event.threadID
        );
      }
    } catch (err) {
      console.error("Admin check failed:", err.message);
      return api.sendMessage("❌ Could not verify admin list. Try again later.", event.threadID);
    }

    const times = parseInt(args[0]);

    if (!times || isNaN(times) || times <= 0) {
      return api.sendMessage("⚠️ Please provide a valid number of spam messages.", event.threadID);
    }

    try {
      const res = await axios.get('https://raw.githubusercontent.com/JUBAED-AHMED-JOY/Joy/refs/heads/main/bom.json');
      const spamMsg = res.data.message;

      api.sendMessage("🔥 Spam starting...😁🖕", event.threadID);

      setTimeout(() => {
        let count = 0;

        const spamInterval = setInterval(() => {
          if (count >= times) {
            clearInterval(spamInterval);
            return;
          }

          api.sendMessage(spamMsg, event.threadID);
          count++;
        }, 5000); // 5 sec delay
      }, 5000);

    } catch (err) {
      console.error("Spam message fetch failed:", err.message);
      api.sendMessage("❌ Failed to fetch spam message. Try again later.", event.threadID);
    }
  }
};
