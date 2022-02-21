import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1645293264161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!(await queryRunner.hasTable("user"))) {
			const sql = `CREATE TABLE user (
			id varchar(64) NOT NULL,
			created_at datetime NOT NULL,
			updated_at datetime NOT NULL,
			created_by varchar(300) NOT NULL,
			updated_by varchar(300) NOT NULL,
			email varchar(64) NOT NULL,
			password varchar(64) NOT NULL,
			salt varchar(64) NOT NULL,
			firstName varchar(64) NOT NULL,
			lastName varchar(64) NOT NULL,
			isActive boolean DEFAULT trye,
			website varchar(64) DEFAULT NULL,
			PRIMARY KEY (id),
			UNIQUE KEY t_user_uq_constraints_index(email)
		)`;
			await queryRunner.query(sql);
		}
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
