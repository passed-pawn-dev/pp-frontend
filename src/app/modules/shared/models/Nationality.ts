interface Flag {
  id: string;
}

export interface Nationality {
  id: string;
  fullName: string;
  shortName: string;
  flag: Flag;
}
