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
  schedule: UserSchedule;
};

export type UserSchedule = {
  monday?: { checkIn: string; checkOut: string };
  tuesday?: { checkIn: string; checkOut: string };
  wednesday?: { checkIn: string; checkOut: string };
  thursday?: { checkIn: string; checkOut: string };
  friday?: { checkIn: string; checkOut: string };
  saturday?: { checkIn: string; checkOut: string };
  sunday?: { checkIn: string; checkOut: string };
};

export type EventData = {
  _id?: string;
  title: string;
  startTime?: string;
  endTime?: string;
};
