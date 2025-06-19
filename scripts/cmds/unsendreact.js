module.exports = {
  config: {
    name: "unsendreact",
    version: "1.0.1",
    permission: 2,
    credits: "Joy",
    description: "Auto unsend bot's message only when specific emoji is reacted",
    prefix: false,
    category: "automation",
    usages: "React 😆 to bot's message to unsend it",
    cooldowns: 0
  },

  onReaction: async function ({ api, event }) {
    const { messageID, userID, reaction } = event;

    // ✅ শুধু এই emoji দিলে unsend হবে
    const allowedEmoji = "😆"; // চাইলে পরিবর্তন করতে পারো

    try {
      const msgInfo = await api.getMessageInfo(messageID);

      // ✅ Check if message is sent by the bot
      if (msgInfo.senderID !== api.getCurrentUserID()) return;

      // ✅ Bot নিজের react করলে কিছু না
      if (userID === api.getCurrentUserID()) return;

      // ✅ শুধুমাত্র allowedEmoji তে unsend করবে
      if (reaction !== allowedEmoji) return;

      // ✅ Unsend the message
      await api.unsendMessage(messageID);
    } catch (err) {
      console.error("❌ Failed to unsend on reaction:", err);
    }
  }
};
