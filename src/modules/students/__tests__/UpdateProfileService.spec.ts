import AppError from '@shared/errors/AppError';
import UpdateProfileService from '../services/UpdateProfileService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let fakeStudentsRepository: FakeStudentRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentRepository();

    updateProfile = new UpdateProfileService(fakeStudentsRepository);
  });

  it('should be able to update the profile', async () => {
    const sponsor = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email3@gmail.com',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '123',
    });

    const updatedSponsor = await updateProfile.execute({
      id: sponsor.id,
      name: 'nome alterado',
      email: 'email-alterado@gmail.com',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
    });

    expect(updatedSponsor.name).toBe('nome alterado');
    expect(updatedSponsor.email).toBe('email-alterado@gmail.com');
  });

  it('should not be able to update a student if does not exist', async () => {
    await expect(
      updateProfile.execute({
        id: 'haufhaufaf',
        name: 'nome',
        email: 'email@gmail.com',
        cpf: 'ALTERADO',
        rg: 'ALTEARADO',
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        gender: 'masculino',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a sponsor with same email from another', async () => {
    const sponsor1 = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email1@gmail.com',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '123',
    });

    const sponsor2 = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email2@gmail.com',
      cpf: '1234',
      rg: '1234',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '123',
    });

    await expect(
      updateProfile.execute({
        id: sponsor1.id,
        name: 'nome',
        email: sponsor2.email,
        cpf: 'ALTERADO',
        rg: 'ALTEARADO',
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        gender: 'masculino',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a sponsor with same cpf from another', async () => {
    const sponsor1 = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email1@gmail.com',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '123',
    });

    const sponsor2 = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email2@gmail.com',
      cpf: '1234',
      rg: '1234',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '123',
    });

    await expect(
      updateProfile.execute({
        id: sponsor1.id,
        name: 'nome',
        email: 'email-alterado@gmail.com',
        cpf: sponsor2.cpf,
        rg: 'ALTEARADO',
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        gender: 'masculino',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a sponsor with same rg from another', async () => {
    const sponsor1 = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email1@gmail.com',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '123',
    });

    const sponsor2 = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email2@gmail.com',
      cpf: '1234',
      rg: '1234',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '123',
    });

    await expect(
      updateProfile.execute({
        id: sponsor1.id,
        name: 'nome',
        email: 'email1@gmail.com',
        cpf: '123',
        rg: sponsor2.rg,
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        gender: 'masculino',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
