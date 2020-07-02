import { uuid } from 'uuidv4';

import IAdminRepository from '@modules/administrators/repositories/IAdminRepository';
import ICreateAdminDTO from '@modules/administrators/dtos/ICreateAdminDTO';

import Admin from '../../infra/typeorm/entities/Admin';

class FakeAdminsRepository implements IAdminRepository {
  private admins: Admin[] = [];

  public async create(adminData: ICreateAdminDTO): Promise<Admin> {
    const admin = new Admin();

    Object.assign(admin, { id: uuid() }, adminData);

    this.admins.push(admin);

    return admin;
  }

  public async save(admin: Admin): Promise<Admin> {
    const findIndex = this.admins.findIndex(
      findAdmin => findAdmin.id === admin.id,
    );

    this.admins[findIndex] = admin;

    return admin;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.admins.findIndex(admin => admin.id === id);

    this.admins.splice(findIndex, 1);
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const findAdminByEmail = this.admins.find(admin => admin.email === email);

    return findAdminByEmail;
  }

  public async findById(id: string): Promise<Admin | undefined> {
    const findAdminById = this.admins.find(admin => admin.id === id);

    return findAdminById;
  }
}

export default FakeAdminsRepository;
