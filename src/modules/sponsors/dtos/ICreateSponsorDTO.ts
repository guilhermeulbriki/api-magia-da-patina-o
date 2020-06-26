export default interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  born: Date;
  rg: string;
  cpf: string;
  phone: string;
  whatsapp: string;
  gender: 'masculino' | 'feminino';
  type: string;
  address: string;
}
