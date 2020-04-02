export interface Player {
  id: string;
  username: string;
  discriminator: string;
  avatar: any; // always null?
  status: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  suppress: boolean;
  channel_id: string;
  avatar_url: string;
}

export interface Channel {
  id: string;
  name: string;
  position: number;
}
