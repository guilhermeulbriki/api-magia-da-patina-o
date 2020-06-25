export default interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  born: string;
  rg: string;
  cpf: string;
  phone: string;
  whatsapp: string;
  gender: 'masculino' | 'feminino';
  type: string;
  address: string;
}
