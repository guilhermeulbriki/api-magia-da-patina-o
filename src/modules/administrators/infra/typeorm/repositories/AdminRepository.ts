import { getRepository, Repository } from 'typeorm';

import IAdminRepository from '@modules/administrators/repositories/IAdminRepository';
import ICreateAdminDTO from '@modules/administrators/dtos/ICreateAdminDTO';

import Admin from '../entities/Admin';

class AdminRepository implements IAdminRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async listAll(): Promise<Admin[]> {
    return this.ormRepository.find();
  }

  public async create(adminData: ICreateAdminDTO): Promise<Admin> {
    const admin = await this.ormRepository.create(adminData);

    await this.ormRepository.save(admin);

    return admin;
  }

  public async save(admin: Admin): Promise<Admin> {
    return this.ormRepository.save(admin);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  public async findById(id: string): Promise<Admin | undefined> {
    return this.ormRepository.findOne(id);
  }
}

export default AdminRepository;
