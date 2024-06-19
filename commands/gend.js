const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gend')
    .setDescription('🔚 End a giveaway and select a winner')
    .addStringOption(option => option.setName('message_id').setDescription('🆔 Message ID of the giveaway').setRequired(true)),
  async execute(interaction) {
    const messageId = interaction.options.getString('message_id');
    try {
      if (interaction.channel.type === 'DM') {
        return interaction.reply('⚠️ This command cannot be used in DMs. Please use it in a server channel.');
      }

      console.log('[DEBUG] Executing /gend command... 🟢');
      const message = await interaction.channel.messages.fetch(messageId);
      if (!message) {
        throw new Error('Message with the given ID not found.');
      }
      const reaction = message.reactions.cache.get('🎉');
      if (!reaction) {
        throw new Error('No 🎉 reactions found on the message.');
      }

      const users = reaction.users.cache.filter(user => !user.bot);
      if (users.size > 0) {
        const winner = users.random();
        const prize = message.embeds[0] ? message.embeds[0].description.match(/Prize: (.*)/)[1] : 'Unknown Prize';

        const embed = new EmbedBuilder()
          .setColor('#FFD700')
          .setTitle('🎉 Congratulations!')
          .setDescription(`You have won the **${prize}** in the giveaway!`)
          .setTimestamp()
          .setFooter({ text: 'Giveaway Bot', iconURL: interaction.client.user.avatarURL() });

        await message.channel.send({ content: `🎊 Congratulations ${winner}! You won the **${prize}**! 🎉` });
        await winner.send({ embeds: [embed] })
          .catch(err => console.error('[ERROR] Failed to send DM to winner: ❌', err));

        await message.edit('⏲️ **Giveaway ended!** 🎉');
        console.log('[DEBUG] Giveaway ended successfully. ✅');

        interaction.reply({ content: '🟢 Giveaway ended successfully. The winner has been selected!', ephemeral: true });
      } else {
        interaction.reply('⚠️ No participants in the giveaway.');
      }
    } catch (error) {
      console.error('[ERROR] Error ending giveaway: ❌', error);
      if (error.message.includes('Unknown Message')) {
        interaction.reply({ content: '⚠️ Error: Unknown Message. Please ensure the message ID is correct.', ephemeral: true });
      } else if (error.message.includes('No 🎉 reactions found')) {
        interaction.reply({ content: '⚠️ Error: No 🎉 reactions found on the message.', ephemeral: true });
      } else if (error.message.includes('Message with the given ID not found')) {
        interaction.reply({ content: '⚠️ Error: Message with the given ID not found.', ephemeral: true });
      } else {
        interaction.reply({ content: '⚠️ An unexpected error occurred while ending the giveaway. Please try again later.', ephemeral: true });
      }
    }
  },
};