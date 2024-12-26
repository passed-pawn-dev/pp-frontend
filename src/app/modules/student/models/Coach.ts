import { Title } from "./Title";

export interface Coach {
    id: string;
    firstName: string;
    lastName: string;
    photoId: string;
    dateOfBirth: Date;
    ELO: number;
    title: Title;
    countryId: string;
  }
  