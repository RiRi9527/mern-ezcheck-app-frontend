export type User = {
  _id?: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  position: string;
  hourlyWage: number;
  isAdmin: boolean;
  imageUrl: string;
};

export type EventData = {
  title: string;
  startTime: string;
  endTime: string;
};
