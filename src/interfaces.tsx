export interface Task {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  important: boolean;
  id: string;
}


export interface User{
  user: {
    id: string;
    username: string;
    email: string;
    profilePicture: string;
  } | null;
}