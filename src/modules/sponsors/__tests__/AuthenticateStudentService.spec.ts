import AppError from '@shared/errors/AppError';
import AuthenticateSponsorService from '../services/AuthenticateSponsorService';
import FakeSponsorRepository from '../repositories/fakes/FakeSponsorRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeSponsorsRepository: FakeSponsorRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateSponsor: AuthenticateSponsorService;

describe('AuthenticateSponsor', () => {
  beforeEach(() => {
    fakeSponsorsRepository = new FakeSponsorRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateSponsor = new AuthenticateSponsorService(
      fakeSponsorsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const sponsor = await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    const response = await authenticateSponsor.execute({
      email: 'email@gmail.com',
      password: '123',
    });

    expect(response).toHaveProperty('token');
    expect(response.sponsor).toEqual(sponsor);
  });

  it('should not be able to authenticate with non existing sponsor', async () => {
    await expect(
      authenticateSponsor.execute({
        email: 'email@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeSponsorsRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    await expect(
      authenticateSponsor.execute({
        email: 'email@gmail.com',
        password: 'WRONG-PASSWORD',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
