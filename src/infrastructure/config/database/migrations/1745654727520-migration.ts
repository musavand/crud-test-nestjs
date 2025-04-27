import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745654727520 implements MigrationInterface {
    name = 'Migration1745654727520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`FirstName\` varchar(50) NOT NULL, \`LastName\` varchar(50) NOT NULL, \`DateOfBirth\` datetime NOT NULL, \`PhoneNumber\` varchar(50) NOT NULL, \`Email\` varchar(150) NOT NULL, \`BankAccountNumber\` varchar(150) NOT NULL, \`create_time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_a184afcff462aa58bab350f488\` (\`FirstName\`), UNIQUE INDEX \`IDX_a9caa16f61be15f6176cbfa4c5\` (\`LastName\`), UNIQUE INDEX \`IDX_04c07cd1c9e0be8b8e6dfe2af6\` (\`PhoneNumber\`), UNIQUE INDEX \`IDX_36c6f77997f272076417d80de8\` (\`Email\`), UNIQUE INDEX \`IDX_ff86b4294aa966532797bff949\` (\`BankAccountNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ff86b4294aa966532797bff949\` ON \`Customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_36c6f77997f272076417d80de8\` ON \`Customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_04c07cd1c9e0be8b8e6dfe2af6\` ON \`Customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_a9caa16f61be15f6176cbfa4c5\` ON \`Customer\``);
        await queryRunner.query(`DROP INDEX \`IDX_a184afcff462aa58bab350f488\` ON \`Customer\``);
        await queryRunner.query(`DROP TABLE \`Customer\``);
    }

}
