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
  schedule: object;
};

export type EventData = {
  _id?: string;
  title: string;
  startTime?: string;
  endTime?: string;
};
