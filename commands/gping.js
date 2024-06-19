const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gping')
    .setDescription('🏓 Ping the bot to check if it is alive and get latency'),
  async execute(interaction) {
    console.log('[DEBUG] Executing /gping command... 🟢');
    try {
      const startTime = Date.now();
      const sent = await interaction.reply({ content: '⏱️ Pong!', fetchReply: true });
      const endTime = Date.now();
      const roundtrip_latency = sent.createdTimestamp - interaction.createdTimestamp;
      const api_latency = Math.round(interaction.client.ws.ping);

      await interaction.editReply(`
        ⏱️ Pong! 🏓
        - Roundtrip latency: **${roundtrip_latency}ms**
        - API latency: **${api_latency}ms**
        - Timestamp: **${new Date().toUTCString()}**
        - Response time: **${endTime - startTime}ms**
      `);
      console.log('[DEBUG] /gping command executed successfully. ✅');
    } catch (err) {
      console.error('[ERROR] Error executing /gping command: ❌', err);
      interaction.reply('⚠️ There was an error while executing the /gping command.');
    }
  },
};