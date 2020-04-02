import React, { useEffect } from 'react';

import discordAPI from 'services/discordAPI';
import { Player, Channel } from 'interfaces/discord';
import { useStateValue } from 'hooks/provider';
import 'styles/components/discord.scss';

const Discord = () => {
  const [{ discordServerInfo }, dispatch] = useStateValue() as Array<any>;

  useEffect(() => {
    if (discordServerInfo === undefined) {
      discordAPI.getServerInfo().then((response: any) => {
        dispatch({ key: 'discordServerInfo', value: response });
      });
    }
  }, [discordServerInfo, dispatch]);

  const isConnected = (player: Player): boolean => {
    if (!player.channel_id) {
      return false;
    }
    return true;
  };

  const renderConnectedPlayers = () => {
    const players: JSX.Element[] = [];

    discordServerInfo.members.forEach((player: Player) => {
      if (isConnected(player)) {
        players.push(renderPlayer(player));
      }
    });
    return players;
  };

  const renderPlayer = (player: Player) => {
    const channel = getChannel(player);

    return (
      <div key={player.id}>
        <p>
          {player.username} in {channel}
        </p>
      </div>
    );
  };

  const getChannel = (player: Player): string => {
    return discordServerInfo.channels.find((channel: Channel) => channel.id === player.channel_id).name;
  };

  return (
    <div className="discord-container">
      <p>Discord component</p>
      {discordServerInfo && (
        <div>
          <p>Server name: {discordServerInfo.name}</p>
          <p>{discordServerInfo.members.length} players online</p>
          {discordServerInfo.members && renderConnectedPlayers()}
        </div>
      )}
    </div>
  );
};

export default Discord;
