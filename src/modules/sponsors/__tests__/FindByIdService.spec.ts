import AppError from '@shared/errors/AppError';

import FindByIdService from '../services/FindByIdService';
import FakeSponsorRepository from '../repositories/fakes/FakeSponsorRepository';

let fakesponsorsRepository: FakeSponsorRepository;
let findById: FindByIdService;

describe('FindByIdSponsor', () => {
  beforeEach(() => {
    fakesponsorsRepository = new FakeSponsorRepository();

    findById = new FindByIdService(fakesponsorsRepository);
  });

  it('should be able to get a sponsor with their id', async () => {
    const sponsor = await fakesponsorsRepository.create({
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

    expect(await findById.execute(sponsor.id)).toEqual(sponsor);
  });

  it('should not be able to get a sponsor with wrong id', async () => {
    await expect(findById.execute('WRONG-ID')).rejects.toBeInstanceOf(AppError);
  });
});
