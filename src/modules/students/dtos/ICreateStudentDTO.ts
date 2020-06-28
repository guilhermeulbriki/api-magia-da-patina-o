export default interface ICreateStudentDTO {
  name: string;
  email: string;
  age: number;
  rg: string;
  cpf: string;
  phone: string;
  whatsapp: string;
  group: string;
  gender: 'masculino' | 'feminino';
  sponsor_id: string;
}
