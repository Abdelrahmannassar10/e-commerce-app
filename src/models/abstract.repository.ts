import { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';

export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}
  public async create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }
  public getOne(
    filter: RootFilterQuery<T>,
    projection: ProjectionType<T>,
    options: QueryOptions<T>,
  ) {
    return this.model.findOne(filter, projection, options);
  }
}
