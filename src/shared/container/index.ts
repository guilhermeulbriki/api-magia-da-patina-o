import { container } from 'tsyringe';

import '@modules/sponsors/providers';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';
import SponsorRepository from '@modules/sponsors/infra/typeorm/repositories/SponsorRepository';

container.registerSingleton<ISponsorRepository>(
  'SponsorRepository',
  SponsorRepository,
);
