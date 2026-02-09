import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

export class BaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async update(where: FindOptionsWhere<T>, data: any): Promise<void> {
    await this.repository.update(where, data);
  }

  async remove(entity: T | T[]): Promise<void> {
    if (Array.isArray(entity)) {
      await this.repository.remove(entity);
    } else {
      await this.repository.remove(entity);
    }
  }

  createQueryBuilder(alias: string) {
    return this.repository.createQueryBuilder(alias);
  }
}
