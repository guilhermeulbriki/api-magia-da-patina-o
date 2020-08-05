import AppError from '@shared/errors/AppError';
import DeleteSponsorService from '../services/DeleteSponsorService';
import FakeSponsorRepository from '../repositories/fakes/FakeSponsorRepository';

let fakeSponsorsRepository: FakeSponsorRepository;
let deleteSponsor: DeleteSponsorService;

describe('DeleteSponsor', () => {
  beforeEach(() => {
    fakeSponsorsRepository = new FakeSponsorRepository();

    deleteSponsor = new DeleteSponsorService(fakeSponsorsRepository);
  });

  it('should be able to delete a sponsor', async () => {
    const addressAsJson = {
      street: 'Maurício cardoso',
      neighborhood: 'centro',
      complement: '',
      number: 761,
      cep: 98400000,
      city: 'Frederico Westphalen',
    };

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
      address: JSON.stringify(addressAsJson),
    });

    await deleteSponsor.execute(sponsor.id);

    const sponsors = await fakeSponsorsRepository.listAll(1);

    expect(sponsors).toEqual([]);
  });

  it('should not be able to delete a sponsor if does not exist', async () => {
    await expect(deleteSponsor.execute('123')).rejects.toBeInstanceOf(AppError);
  });
});
