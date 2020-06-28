export default interface ICreateStudentDTO {
  name: string;
  email: string;
  born: Date;
  rg: string;
  cpf: string;
  phone: string;
  whatsapp: string;
  gender: 'masculino' | 'feminino';
  sponsor_id: string;
}
