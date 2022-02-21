<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220221163004 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE contest_category (id INT AUTO_INCREMENT NOT NULL, contest_id INT NOT NULL, min_points DOUBLE PRECISION DEFAULT NULL, max_points DOUBLE PRECISION DEFAULT NULL, min_age INT DEFAULT NULL, max_age INT DEFAULT NULL, only_men TINYINT(1) DEFAULT NULL, only_women TINYINT(1) DEFAULT NULL, disability TINYINT(1) DEFAULT NULL, open TINYINT(1) DEFAULT NULL, min_participants INT NOT NULL, max_participants INT NOT NULL, price INT DEFAULT NULL, win_price INT DEFAULT NULL, start_date DATETIME NOT NULL, INDEX IDX_31997AE21CD0F0DE (contest_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contest_category ADD CONSTRAINT FK_31997AE21CD0F0DE FOREIGN KEY (contest_id) REFERENCES contest (id)');
        $this->addSql('ALTER TABLE participation ADD contest_category_id INT NOT NULL, ADD validated TINYINT(1) NOT NULL, ADD join_date DATETIME NOT NULL');
        $this->addSql('ALTER TABLE participation ADD CONSTRAINT FK_AB55E24F90247B53 FOREIGN KEY (contest_category_id) REFERENCES contest_category (id)');
        $this->addSql('CREATE INDEX IDX_AB55E24F90247B53 ON participation (contest_category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE participation DROP FOREIGN KEY FK_AB55E24F90247B53');
        $this->addSql('DROP TABLE contest_category');
        $this->addSql('ALTER TABLE contest CHANGE address address VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE city city VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE hall_name hall_name VARCHAR(255) DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE attach_picture attach_picture VARCHAR(255) DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('DROP INDEX IDX_AB55E24F90247B53 ON participation');
        $this->addSql('ALTER TABLE participation DROP contest_category_id, DROP validated, DROP join_date');
        $this->addSql('ALTER TABLE `user` CHANGE email email VARCHAR(180) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE password password VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE firstname firstname VARCHAR(255) DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE lastname lastname VARCHAR(255) DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE license_number license_number VARCHAR(255) DEFAULT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
