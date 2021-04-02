import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class UserAddDobColumn1617343285305 implements MigrationInterface {

    private readonly NEW_COLUMN = new TableColumn({
        name: "dob",
        type: "VARCHAR(64)",
        isNullable: true,
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!(await queryRunner.hasColumn("user", this.NEW_COLUMN.name))) {
            await queryRunner.addColumn("user", this.NEW_COLUMN);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", this.NEW_COLUMN);
    }

}
