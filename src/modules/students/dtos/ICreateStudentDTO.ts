export default interface ICreateStudentDTO {
  name: string;
  email: string;
  age: number;
  rg: string;
  cpf: string;
  phone: string;
  whatsapp: string;
  gender: 'masculino' | 'feminino';
  group_id: string;
  sponsor_id: string;
}
