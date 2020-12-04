import { Connection, QueryRunner, Repository } from 'typeorm';

export abstract class BaseRepository<T = any> extends Repository<T> {
  constructor(protected readonly connection: Connection) {
    super();
  }

  public async performActionInTransaction(
    handler: (queryRunner: QueryRunner) => any,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await handler(queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
