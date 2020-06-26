import AppError from '@shared/errors/AppError';
import UpdateProfileService from '../services/UpdateProfileService';
import FakeSponsorRepository from '../repositories/fakes/FakeSponsorRepository';

let fakeSponsorsRepository: FakeSponsorRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeSponsorsRepository = new FakeSponsorRepository();

    updateProfile = new UpdateProfileService(fakeSponsorsRepository);
  });

  it('should be able to update the profile', async () => {
    const addressAsJson = {
      street: 'Maurício cardoso',
      neighborhood: 'centro',
      complement: '',
      number: 761,
      cep: 98400000,
      city: 'Frederico Westphalen',
    };

    const sponsor = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email3@gmail.com',
      password: '123',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: JSON.stringify(addressAsJson),
    });

    const updatedSponsor = await updateProfile.execute({
      id: sponsor.id,
      name: 'nome alterado',
      email: 'email-alterado@gmail.com',
      password: '123',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: {
        street: 'rua',
        neighborhood: 'bairro',
        complement: '',
        number: 123,
        cep: 123,
        city: 'cidade',
      },
    });

    expect(updatedSponsor.name).toBe('nome alterado');
    expect(updatedSponsor.email).toBe('email-alterado@gmail.com');
  });

  it('should not be able to update a sponsor if does not exist', async () => {
    await expect(
      updateProfile.execute({
        id: 'haufhaufaf',
        name: 'nome',
        email: 'email@gmail.com',
        password: '123',
        cpf: 'ALTERADO',
        rg: 'ALTEARADO',
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        type: 'mãe',
        gender: 'masculino',
        address: {
          street: 'rua',
          neighborhood: 'bairro',
          complement: '',
          number: 123,
          cep: 123,
          city: 'cidade',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a sponsor with same email from another', async () => {
    const sponsor1 = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email1@gmail.com',
      password: '123',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    const sponsor2 = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email2@gmail.com',
      password: '123',
      cpf: '3413',
      rg: '131231',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    await expect(
      updateProfile.execute({
        id: sponsor1.id,
        name: 'nome',
        email: sponsor2.email,
        password: '123',
        cpf: 'ALTERADO',
        rg: 'ALTEARADO',
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        type: 'mãe',
        gender: 'masculino',
        address: {
          street: 'rua',
          neighborhood: 'bairro',
          complement: '',
          number: 123,
          cep: 123,
          city: 'cidade',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a sponsor with same cpf from another', async () => {
    const sponsor1 = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email1@gmail.com',
      password: '123',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    const sponsor2 = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email2@gmail.com',
      password: '123',
      cpf: '3413',
      rg: '131231',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    await expect(
      updateProfile.execute({
        id: sponsor1.id,
        name: 'nome',
        email: sponsor1.email,
        password: '123',
        cpf: sponsor2.cpf,
        rg: 'ALTEARADO',
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        type: 'mãe',
        gender: 'masculino',
        address: {
          street: 'rua',
          neighborhood: 'bairro',
          complement: '',
          number: 123,
          cep: 123,
          city: 'cidade',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a sponsor with same rg from another', async () => {
    const sponsor1 = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email1@gmail.com',
      password: '123',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    const sponsor2 = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email2@gmail.com',
      password: '123',
      cpf: '3413',
      rg: '131231',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    await expect(
      updateProfile.execute({
        id: sponsor1.id,
        name: 'nome',
        email: sponsor1.email,
        password: '123',
        cpf: sponsor1.cpf,
        rg: sponsor2.rg,
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        type: 'mãe',
        gender: 'masculino',
        address: {
          street: 'rua',
          neighborhood: 'bairro',
          complement: '',
          number: 123,
          cep: 123,
          city: 'cidade',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a sponsor under 18', async () => {
    const addressAsJson = {
      street: 'Maurício cardoso',
      neighborhood: 'centro',
      complement: '',
      number: 761,
      cep: 98400000,
      city: 'Frederico Westphalen',
    };

    const sponsor = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email3@gmail.com',
      password: '123',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      born: new Date(1999, 2, 4),
      type: 'mãe',
      gender: 'masculino',
      address: JSON.stringify(addressAsJson),
    });

    await expect(
      updateProfile.execute({
        id: sponsor.id,
        name: 'nome',
        email: 'email3@gmail.com',
        password: '123',
        cpf: 'ALTEARADO',
        rg: '427847284',
        phone: '123',
        whatsapp: '123',
        born: new Date(2003, 2, 4),
        type: 'mãe',
        gender: 'masculino',
        address: {
          street: 'rua',
          neighborhood: 'bairro',
          complement: '',
          number: 123,
          cep: 123,
          city: 'cidade',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
