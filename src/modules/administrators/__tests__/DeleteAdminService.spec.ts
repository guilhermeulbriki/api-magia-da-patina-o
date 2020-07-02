import AppError from '@shared/errors/AppError';
import DeleteAdminService from '../services/DeleteAdminService';
import FakeAdminRepository from '../repositories/fakes/FakeAdminRepository';

let fakeAdminsRepository: FakeAdminRepository;
let deleteAdmin: DeleteAdminService;

describe('DeleteAdmin', () => {
  beforeEach(() => {
    fakeAdminsRepository = new FakeAdminRepository();

    deleteAdmin = new DeleteAdminService(fakeAdminsRepository);
  });

  it('should be able to delete a sponsor', async () => {
    const admin = await fakeAdminsRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    await deleteAdmin.execute(admin.id);

    await expect(fakeAdminsRepository.findById(admin.id)).toBeUndefined;
  });

  it('should not be able to delete a sponsor if does not exist', async () => {
    await expect(deleteAdmin.execute('123')).rejects.toBeInstanceOf(AppError);
  });
});
