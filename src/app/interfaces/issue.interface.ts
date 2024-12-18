export interface Issue {
  issueNo: number;
  title: string;
  description: string;
  priority: 'low' | 'high';
  type: 'Function' | 'Malfunction' | 'Documentation';
  completed?: Date | null;
}
