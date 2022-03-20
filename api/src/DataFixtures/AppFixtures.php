<?php

namespace App\DataFixtures;

use App\Entity\Club;
use App\Entity\Contest;
use App\Entity\ContestCategory;
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

    private $faker;

    public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager)
    {
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;

        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {
        $this->createUsers();
        $clubs = $this->createClubs();
        $contests = $this->createContests($clubs);
        $this->createContestCategories($contests);
        $this->entityManager->flush();
    }

    /**
     * @param array $contests
     */
    private function createContestCategories(array $contests): void
    {
        try {
            foreach ($contests as $contest) {
                $startDate = $contest->getStartDate();
                $boolStart = rand(0, 10);
                if ($boolStart > 5) {
                    date_add($startDate, date_interval_create_from_date_string('1 days'));
                }

                // Série handicap possible
                $boolDis = rand(0, 10);
                if ($boolDis > 5) {
                    $contestCategory = new ContestCategory();

                    $contestCategory->setContest($contest)
                        ->setStartDate($startDate)
                        ->setDisability(true)
                        ->setMinParticipants(16)
                        ->setMaxParticipants(32)
                        ->setPrice($this->faker->biasedNumberBetween(5, 10))
                        ->setWinPrice(80, 200)
                    ;

                    $this->entityManager->persist($contestCategory);
                }


            }
        } catch (\Exception $e) {
            error_log($e->getMessage());
        }
    }

    /**
     * @param array $clubs
     * @return array
     */
    private function createContests(array $clubs): array
    {
        try {
            $contests = [];
            foreach ($clubs as $club) {
                $contest = new Contest();

                $startDate = $this->faker->dateTimeBetween('+2 months', '+2 years');
                $endDate = $startDate;
                date_sub($endDate, date_interval_create_from_date_string('2 days'));

                $contest->setClub($club)
                    ->setCity($this->faker->city)
                    ->setAddress($this->faker->address)
                    ->setCreationDate(new \DateTime('now', new \DateTimeZone('Europe/Paris')))
                    ->setStartDate($startDate)
                    ->setEndRegistrationDate($endDate)
                    ->setHallName($this->faker->name)
                ;

                $this->entityManager->persist($club);
                $contests[] = $contest;
            }
            return $contests;
        } catch (\Exception $e) {
            error_log($e->getMessage());
        }
        return [];
    }

    /**
     * @return array
     */
    private function createClubs(): array
    {
        try {
            $clubs = [];
            for ($i = 0; $i < 30; $i++) {
                $club = new Club();
                $club->setCreationDate(new \DateTime('now', new \DateTimeZone('Europe/Paris')))
                    ->setName($this->faker->company . ' TT')
                    ->setAddress($this->faker->address)
                    ->setCity($this->faker->city)
                    ->setWebsite('https://' . $this->faker->domainName . '.fr')
                    ->setSpid(strval($this->faker->randomNumber('8')))
                    ->setContactFirstname($this->faker->firstName)
                    ->setContactLastname($this->faker->lastName)
                    ->setContactMailAddress($this->faker->companyEmail)
                    ->setContactPhone($this->faker->phoneNumber)
                ;

                $this->entityManager->persist($club);
                $clubs[] = $club;
            }

            return $clubs;
        } catch (\Exception $e) {
            error_log($e->getMessage());
        }
        return [];
    }

    private function createUsers()
    {
        try {
            for ($i = 0; $i < 100; $i++) {
                $user = new User();
                $user->setFirstname($this->faker->firstName)
                    ->setLastname($this->faker->lastName)
                    ->setBirthdate($this->faker->dateTimeBetween('-80 years', '-6 years'))
                    ->setEmail($this->faker->email)
                    ->setRegistrationDate(new \DateTime('now', new \DateTimeZone('Europe/Paris')))
                    ->setLicenseNumber(strval($this->faker->randomNumber('7')))
                    ->setOfficialPoints($this->faker->biasedNumberBetween(500, 3000))
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
