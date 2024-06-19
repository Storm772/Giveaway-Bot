const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const giveawayStore = require('../index');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('greroll')
    .setDescription('🔄 Reroll a giveaway')
    .addStringOption(option => option.setName('message_id').setDescription('🆔 Message ID of the giveaway').setRequired(true)),
  async execute(interaction) {
    const messageId = interaction.options.getString('message_id');
    try {
      if (interaction.channel.type === 'DM') {
        return interaction.reply('⚠️ This command cannot be used in DMs. Please use it in a server channel.');
      }

      console.log('[DEBUG] Executing /greroll command... 🟢');
      const message = await interaction.channel.messages.fetch(messageId);
      const reaction = message.reactions.cache.get('🎉');
      if (!reaction) {
        throw new Error('No 🎉 reactions found on the message.');
      }

      if (!giveawayStore.has(message.id)) {
        throw new Error('The provided message ID is not a giveaway message.');
      }

      const users = reaction.users.cache.filter(user => !user.bot);
      if (users.size > 0) {
        const winner = users.random();
        await interaction.reply(`🔄 Congratulations ${winner}! You won the reroll! 🎉`);
        const embed = new EmbedBuilder()
          .setColor('#FFD700')
          .setTitle('🎉 Congratulations!')
          .setDescription('You have won the reroll giveaway!')
          .addFields(
            { name: '🎁 Prize', value: giveawayStore.get(message.id).prize, inline: true },
            { name: '⏲️ Ended At', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
          )
          .setFooter('Giveaway Bot', interaction.client.user.avatarURL())
          .setTimestamp();

        await winner.send({ embeds: [embed] });
      } else {
        await interaction.reply('⚠️ No one entered the giveaway.');
      }
    } catch (error) {
      console.error('[ERROR] Error rerolling giveaway: ❌', error.message || error);
      interaction.reply({ content: `⚠️ There was an error while rerolling the giveaway: ${error.message || 'Unknown error.'}`, ephemeral: true });
    }
  },
};