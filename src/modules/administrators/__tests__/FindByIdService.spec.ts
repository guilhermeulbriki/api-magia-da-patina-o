import AppError from '@shared/errors/AppError';

import ShowAdminService from '../services/ShowAdminService';
import FakeAdminRepository from '../repositories/fakes/FakeAdminRepository';

let fakeAdminsRepository: FakeAdminRepository;
let showProfile: ShowAdminService;

describe('ShowAdmin', () => {
  beforeEach(() => {
    fakeAdminsRepository = new FakeAdminRepository();

    showProfile = new ShowAdminService(fakeAdminsRepository);
  });

  it('should be able to get an admin with their id', async () => {
    const admin = await fakeAdminsRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      phone: '123',
      whatsapp: '123',
    });

    expect(await showProfile.execute(admin.id)).toEqual(admin);
  });

  it('should not be able to get a admin with wrong id', async () => {
    await expect(showProfile.execute('WRONG-ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
