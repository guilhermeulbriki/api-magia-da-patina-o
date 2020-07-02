import Admin from '../infra/typeorm/entities/Admin';
import ICreateAdminDTO from '../dtos/ICreateAdminDTO';

export default interface IAdminRepository {
  create(data: ICreateAdminDTO): Promise<Admin>;
  save(admin: Admin): Promise<Admin>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<Admin | undefined>;
  findById(id: string): Promise<Admin | undefined>;
}
