import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/sponsors/providers/HashProvider/fakes/FakeHashProvider';
import CreateAdminService from '../services/CreateAdminService';
import FakeAdminRepository from '../repositories/fakes/FakeAdminRepository';

let fakeAdminsRepository: FakeAdminRepository;
let fakeHashProvider: FakeHashProvider;
let createAdmin: CreateAdminService;

describe('CreateAdmin', () => {
  beforeEach(() => {
    fakeAdminsRepository = new FakeAdminRepository();
    fakeHashProvider = new FakeHashProvider();

    createAdmin = new CreateAdminService(
      fakeAdminsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new administrator', async () => {
    const admin = await createAdmin.execute({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    expect(admin).toHaveProperty('id');
  });

  it('should not be able to create a new admin with same email from another', async () => {
    await createAdmin.execute({
      name: 'nome',
      email: 'SAME-EMAIL',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    await expect(
      createAdmin.execute({
        name: 'nome',
        email: 'SAME-EMAIL',
        password: '123',
        phone: '123',
        whatsapp: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
