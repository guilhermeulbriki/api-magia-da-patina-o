import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/sponsors/providers/HashProvider/fakes/FakeHashProvider';
import CreateAdminService from '../services/CreateAdminService';
import FakeAdminRepository from '../repositories/fakes/FakeAdminRepository';

let fakeAdminsRepository: FakeAdminRepository;
let fakeHashProvider: FakeHashProvider;
let createAdmin: CreateAdminService;

describe('CreateAdmin', () => {
  const ACESS_CODE = process.env;

  beforeEach(() => {
    fakeAdminsRepository = new FakeAdminRepository();
    fakeHashProvider = new FakeHashProvider();

    createAdmin = new CreateAdminService(
      fakeAdminsRepository,
      fakeHashProvider,
    );

    jest.resetModules();
    process.env = { ...ACESS_CODE };
  });

  afterAll(() => {
    process.env = ACESS_CODE;
  });

  it('should be able to create a new administrator', async () => {
    process.env.ACESS_CODE = '123';

    const admin = await createAdmin.execute({
      data: {
        name: 'nome',
        email: 'email@gmail.com',
        password: '123',
        phone: '123',
        whatsapp: '123',
      },
      acessCode: String(process.env.ACESS_CODE),
    });

    expect(admin).toHaveProperty('id');
  });

  it('should not be able to create a new admin with same email from another', async () => {
    process.env.ACESS_CODE = '123';

    await createAdmin.execute({
      data: {
        name: 'nome',
        email: 'SAME-EMAIL',
        password: '123',
        phone: '123',
        whatsapp: '123',
      },
      acessCode: String(process.env.ACESS_CODE),
    });

    await expect(
      createAdmin.execute({
        data: {
          name: 'nome',
          email: 'SAME-EMAIL',
          password: '123',
          phone: '123',
          whatsapp: '123',
        },
        acessCode: String(process.env.ACESS_CODE),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new admin with same email from another', async () => {
    process.env.ACESS_CODE = '123';

    await expect(
      createAdmin.execute({
        data: {
          name: 'nome',
          email: 'SAME-EMAIL',
          password: '123',
          phone: '123',
          whatsapp: '123',
        },
        acessCode: 'WRONG-ACESS-CODE',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
