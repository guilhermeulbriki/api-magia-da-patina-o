import AppError from '@shared/errors/AppError';

import FakeSponsorRepository from '@modules/sponsors/repositories/fakes/FakeSponsorRepository';
import CreateShutdownService from '../services/CreateShutdownService';
import FakeShutdownRepository from '../repositories/fakes/FakeShutdownRepository';

let fakeShutdownRepository: FakeShutdownRepository;
let fakeSponsorRepository: FakeSponsorRepository;

let createShutdown: CreateShutdownService;

describe('CreateShutdown', () => {
  beforeEach(() => {
    fakeShutdownRepository = new FakeShutdownRepository();
    fakeSponsorRepository = new FakeSponsorRepository();

    createShutdown = new CreateShutdownService(
      fakeShutdownRepository,
      fakeSponsorRepository,
    );
  });

  it('should be able to create a new shutdown', async () => {
    const sponsor = await fakeSponsorRepository.create({
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
      address: 'add',
    });

    const shutdown = await createShutdown.execute({
      reason: 'mt mao',
      sponsor_name: sponsor.name,
    });

    expect(shutdown).toHaveProperty('id');
  });

  it('should not be able to create a new shutdown if does not exist', async () => {
    await expect(
      createShutdown.execute({
        reason: 'mt mao',
        sponsor_name: 'WRONG_NAME',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
