import ListSponsorsService from '../services/ListSponsorsService';
import FakeSponsorRepository from '../repositories/fakes/FakeSponsorRepository';

let fakeSponsorsRepository: FakeSponsorRepository;
let listSponsors: ListSponsorsService;

describe('ListSponsors', () => {
  beforeEach(() => {
    fakeSponsorsRepository = new FakeSponsorRepository();

    listSponsors = new ListSponsorsService(fakeSponsorsRepository);
  });

  it('should be able to list all sponsors', async () => {
    const sponsor1 = await fakeSponsorsRepository.create({
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

    const sponsor2 = await fakeSponsorsRepository.create({
      name: 'nome2',
      email: 'email2@gmail.com',
      password: '123',
      cpf: '1234',
      rg: '1234',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    const sponsors = await listSponsors.execute();

    expect(sponsors).toEqual([sponsor1, sponsor2]);
  });
});
