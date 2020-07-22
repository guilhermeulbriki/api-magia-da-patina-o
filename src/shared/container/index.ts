import { container } from 'tsyringe';

import '@modules/sponsors/providers';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';
import SponsorRepository from '@modules/sponsors/infra/typeorm/repositories/SponsorRepository';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';
import StudentRepository from '@modules/students/infra/typeorm/repositories/StudentRepository';

import IAdminRepository from '@modules/administrators/repositories/IAdminRepository';
import AdminRepository from '@modules/administrators/infra/typeorm/repositories/AdminRepository';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import GroupsRepository from '@modules/groups/infra/typeorm/repositories/GroupsRepository';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/ScheduleRepository';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';
import EnrollmentsRepository from '@modules/enrollments/infra/typeorm/repositories/EnrollmentsRepository';

import IShutdownRepository from '@modules/shutdowns/repositories/IShutdownRepository';
import ShutdownRepository from '@modules/shutdowns/infra/typeorm/repositories/ShutdownRepository';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';
import CompetitionRepository from '@modules/competitions/infra/typeorm/repositories/CompetitionRepository';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';
import SpectacleRepository from '@modules/spectacles/infra/typeorm/repositories/SpectacleRepository';

container.registerSingleton<ISponsorRepository>(
  'SponsorRepository',
  SponsorRepository,
);

container.registerSingleton<IStudentRepository>(
  'StudentRepository',
  StudentRepository,
);

container.registerSingleton<IAdminRepository>(
  'AdminRepository',
  AdminRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<ISchedulesRepository>(
  'SchedulesRepository',
  SchedulesRepository,
);

container.registerSingleton<IEnrollmentsRepository>(
  'EnrollmentsRepository',
  EnrollmentsRepository,
);

container.registerSingleton<IShutdownRepository>(
  'ShutdownRepository',
  ShutdownRepository,
);

container.registerSingleton<ICompetitionRepository>(
  'CompetitionRepository',
  CompetitionRepository,
);

container.registerSingleton<ISpectacleRepository>(
  'SpectacleRepository',
  SpectacleRepository,
);
