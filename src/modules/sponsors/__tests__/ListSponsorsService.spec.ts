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
    const addressAsJson = {
      street: 'Maurício cardoso',
      neighborhood: 'centro',
      complement: '',
      number: 761,
      cep: 98400000,
      city: 'Frederico Westphalen',
    };

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
      address: JSON.stringify(addressAsJson),
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
      address: JSON.stringify(addressAsJson),
    });

    const formattedSponsor1 = {
      id: sponsor1.id,
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
      address: {
        street: 'Maurício cardoso',
        neighborhood: 'centro',
        complement: '',
        number: 761,
        cep: 98400000,
        city: 'Frederico Westphalen',
      },
    };

    const formattedSponsor2 = {
      id: sponsor2.id,
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
      address: {
        street: 'Maurício cardoso',
        neighborhood: 'centro',
        complement: '',
        number: 761,
        cep: 98400000,
        city: 'Frederico Westphalen',
      },
    };

    const sponsors = await listSponsors.execute();

    expect(sponsors).toEqual([formattedSponsor1, formattedSponsor2]);
  });
});
