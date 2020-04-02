export default {
  getServerInfo: async (): Promise<any> => {
    const url = `https://discordapp.com/api/guilds/${process.env.REACT_APP_DISCORD_GUILD}/widget.json`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      return response.json();
    } catch (errors) {
      console.log(errors);
    }
  },
};
