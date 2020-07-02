import AppError from '@shared/errors/AppError';
import UpdateService from '../services/UpdateService';
import FakeAdminRepository from '../repositories/fakes/FakeAdminRepository';

let fakeAdminsRepository: FakeAdminRepository;
let updateProfile: UpdateService;

describe('UpdateAdmin', () => {
  beforeEach(() => {
    fakeAdminsRepository = new FakeAdminRepository();

    updateProfile = new UpdateService(fakeAdminsRepository);
  });

  it('should be able to update the profile', async () => {
    const admin = await fakeAdminsRepository.create({
      name: 'nome',
      email: 'email3@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    const updatedAdmin = await updateProfile.execute({
      id: admin.id,
      name: 'nome alterado',
      email: 'email-alterado@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    expect(updatedAdmin.name).toBe('nome alterado');
    expect(updatedAdmin.email).toBe('email-alterado@gmail.com');
  });

  it('should not be able to update a admin if does not exist', async () => {
    await expect(
      updateProfile.execute({
        id: 'haufhaufaf',
        name: 'nome',
        email: 'email@gmail.com',
        password: '123',
        phone: '123',
        whatsapp: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a admin with same email from another', async () => {
    const admin1 = await fakeAdminsRepository.create({
      name: 'nome',
      email: 'email1@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    const admin2 = await fakeAdminsRepository.create({
      name: 'nome',
      email: 'email2@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    await expect(
      updateProfile.execute({
        id: admin1.id,
        name: 'nome',
        email: admin2.email,
        password: '123',
        phone: '123',
        whatsapp: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
