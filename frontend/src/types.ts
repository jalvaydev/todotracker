export interface Todo {
  id: number;
  task: string;
  photoUrl?: string;
  photoFile?: File;
  completed: boolean;
}
