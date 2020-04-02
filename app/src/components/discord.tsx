import React, { useEffect } from 'react';

import discordAPI from 'services/discordAPI';
import { User, Channel } from 'interfaces/discord';
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

  const isConnected = (user: User): boolean => {
    if (!user.channel_id) {
      return false;
    }
    return true;
  };

  const renderConnectedusers = () => {
    const users: JSX.Element[] = [];

    discordServerInfo.members.forEach((user: User) => {
      if (isConnected(user)) {
        users.push(renderuser(user));
      }
    });
    return users;
  };

  const renderuser = (user: User) => {
    const channel = getChannel(user);

    return (
      <div key={user.id}>
        <p>
          {user.username} in {channel}
        </p>
      </div>
    );
  };

  const getChannel = (user: User): string => {
    return discordServerInfo.channels.find((channel: Channel) => channel.id === user.channel_id).name;
  };

  return (
    <div className="discord-container">
      <p>Discord component</p>
      {discordServerInfo && (
        <div>
          <p>Server name: {discordServerInfo.name}</p>
          <p>{discordServerInfo.members.length} users online</p>
          {discordServerInfo.members && renderConnectedusers()}
        </div>
      )}
    </div>
  );
};

export default Discord;
