<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;
    private $entityManager;

    public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager)
    {
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;
    }

    public function load(ObjectManager $manager): void
    {
        $this->createUsers();
        $this->entityManager->flush();
    }

    private function createUsers()
    {
        try {
            $faker = Factory::create('fr_FR');

            for ($i = 0; $i < 30; $i++) {
                $user = new User();
                $user->setFirstname($faker->firstName)
                    ->setLastname($faker->lastName)
                    ->setBirthdate($faker->dateTimeBetween('-80 years', '-6 years'))
                    ->setEmail($faker->email)
                    ->setRegistrationDate(new \DateTime('now', new \DateTimeZone('Europe/Paris')))
                    ->setLicenseNumber(strval($faker->randomNumber('7')))
                    ->setOfficialPoints($faker->biasedNumberBetween(500, 3000))
                    ->setRoles(['ROLE_USER'])
                    ->setPassword($this->passwordHasher->hashPassword($user, 'test'))
                ;

                $this->entityManager->persist($user);

            }
        } catch (\Exception $e) {
            error_log($e->getMessage());
        }
    }
}
