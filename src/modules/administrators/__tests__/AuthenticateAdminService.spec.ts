import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/sponsors/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateAdminService from '../services/AuthenticateAdminService';
import FakeAdminRepository from '../repositories/fakes/FakeAdminRepository';

let fakeAdminRepository: FakeAdminRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateAdmin: AuthenticateAdminService;

describe('AuthenticateAdmin', () => {
  beforeEach(() => {
    fakeAdminRepository = new FakeAdminRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateAdmin = new AuthenticateAdminService(
      fakeAdminRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const admin = await fakeAdminRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    const response = await authenticateAdmin.execute({
      email: 'email@gmail.com',
      password: '123',
    });

    expect(response).toHaveProperty('token');
    expect(response.admin).toEqual(admin);
  });

  it('should not be able to authenticate with non existing admin', async () => {
    await expect(
      authenticateAdmin.execute({
        email: 'email@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeAdminRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    await expect(
      authenticateAdmin.execute({
        email: 'email@gmail.com',
        password: 'WRONG-PASSWORD',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
