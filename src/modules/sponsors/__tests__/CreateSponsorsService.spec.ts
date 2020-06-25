import AppError from '@shared/errors/AppError';

import CreateSponsorService from '../services/CreateSponsorService';
import FakeSponsorRepository from '../repositories/fakes/FakeSponsorRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeSponsorsRepository: FakeSponsorRepository;
let fakeHashProvider: FakeHashProvider;
let createSponsor: CreateSponsorService;

describe('CreateSponsor', () => {
  beforeEach(() => {
    fakeSponsorsRepository = new FakeSponsorRepository();
    fakeHashProvider = new FakeHashProvider();

    createSponsor = new CreateSponsorService(
      fakeSponsorsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new sponsor', async () => {
    const sponsor = await createSponsor.execute({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: '',
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

    expect(sponsor).toHaveProperty('id');
  });

  it('should not be able to create a new sponsor with same email from another', async () => {
    await createSponsor.execute({
      name: 'nome',
      email: 'SAME-EMAIL',
      password: '123',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: '',
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

    await expect(
      createSponsor.execute({
        name: 'nome',
        email: 'SAME-EMAIL',
        password: '123',
        cpf: '1234',
        rg: '1234',
        phone: '123',
        whatsapp: '123',
        born: '',
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

  it('should not be able to create a new sponsor with same cpf from another', async () => {
    await createSponsor.execute({
      name: 'nome',
      email: 'email@email.com',
      password: '123',
      cpf: 'SAME-CPF',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: '',
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

    await expect(
      createSponsor.execute({
        name: 'nome',
        email: 'email2@email.com',
        password: '123',
        cpf: 'SAME-CPF',
        rg: '1234',
        phone: '123',
        whatsapp: '123',
        born: '',
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

  it('should not be able to create a new sponsor with same rg from another', async () => {
    await createSponsor.execute({
      name: 'nome',
      email: 'email@email.com',
      password: '123',
      cpf: '123',
      rg: 'SAME-RG',
      phone: '123',
      whatsapp: '123',
      born: '',
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

    await expect(
      createSponsor.execute({
        name: 'nome',
        email: 'email2@email.com',
        password: '123',
        cpf: '1234',
        rg: 'SAME-RG',
        phone: '123',
        whatsapp: '123',
        born: '',
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
