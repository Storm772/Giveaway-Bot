module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    try {
      if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        if (interaction.channel.type === 'DM') {
          return interaction.reply('⚠️ Commands cannot be executed in DMs. Please use them in a server channel.');
        }

        console.log(`[DEBUG] Executing command: ${interaction.commandName}`);
        await command.execute(interaction);
      } else if (interaction.isModalSubmit()) {
        const command = interaction.client.commands.get('gcreate');
        if (command && command.handleModalSubmit) {
          console.log('[DEBUG] Handling modal submit for /gcreate...');
          await command.handleModalSubmit(interaction);
        }
      }
    } catch (error) {
      console.error('[ERROR] Error during interaction: ❌', error);
      interaction.reply({
        content: '⚠️ There was an error processing your interaction.',
        ephemeral: true,
      });
    }
  },
};