export default interface IcreateCompetitionDTO {
  name: string;
  city: string;
  award: 1 | 2 | 3 | 4 | 5;
  category: string;
  date: Date;
  student_name: string;
}
