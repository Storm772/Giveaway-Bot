module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log('[DEBUG] Bot is ready. Logged in as', client.user.tag, '✅');
  },
};