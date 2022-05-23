<?php


namespace App\Service;


use App\Entity\Contest;
use App\Entity\User;
use Exception;
use Symfony\Component\Validator\Constraints\Date;

class ContestService
{
    private $error;

    public function __construct()
    {
        $this->error = null;
    }

    /**
     * @param array $data
     * @param User $user
     * @return bool
     * @throws Exception
     */
    public function checkPostData(array $data, User $user): bool
    {
        $now = new \DateTime("now", new \DateTimeZone('Europe/paris'));
        if (($startDate = \DateTime::createFromFormat('Y-m-d', $data['startDate'])) && $now > $startDate) {
            if (($endRegistrationDate = \DateTime::createFromFormat('Y-m-d', $data['endRegistrationDate'])) && $endRegistrationDate < $startDate) {
                if (($endDate = \DateTime::createFromFormat('Y-m-d', $data['endDate'])) && $endDate > $startDate) {
                    if ($user->getClub()) {
                        if (is_string($data['hallName']) && strlen($data['hallName']) >= 2 &&
                            is_string($data['city']) && strlen($data['city']) >= 2 &&
                            is_string($data['address']) && strlen($data['address']) >= 2) {
                            return true;
                        }
                        else {
                            $this->setError('Mauvais format de l\'adresse de la salle.');
                        }
                    }
                    else {
                        $this->setError('Vous ne pouvez pas créer de tournoi.');
                    }
                }
                else {
                    $this->setError('Vous ne pouvez pas indiquer une date de fin de tournoi ultérieure à celle du début du tournoi.');
                }
            }
            else {
                $this->setError('Vous ne pouvez pas indiquer une date de fin d\'inscription ultérieure à la date de début du tournoi.');
            }
        }
        else {
            $this->setError('Vous devez renseigner une date de début ultérieure.');
        }
        return false;
    }

    /**
     * @param array $data
     * @param User $user
     * @return Contest
     * @throws Exception
     */
    public function createPost(array $data, User $user): Contest
    {
        $contest = new Contest();

        return $contest
            ->setCreator($user)
            ->setStartDate(\DateTime::createFromFormat('Y-m-d', $data['startDate']))
            ->setHallName($data['hallName'])
            ->setEndRegistrationDate(\DateTime::createFromFormat('Y-m-d', $data['endRegistrationDate']))
            ->setCreationDate(new \DateTime('now', new \DateTimeZone('Europe/Paris')))
            ->setAddress($data['address'])
            ->setCity($data['city'])
            ->setClub($user->getClub())
            /*->setAttachPicture()*/
            ->setEndDate(\DateTime::createFromFormat('Y-m-d', $data['endDate']))
        ;
    }

    /**
     * @param string $error
     */
    private function setError(string $error): void
    {
        $this->error = $error;
    }

    /**
     * @return string|null
     */
    public function getError(): ?string
    {
        return $this->error;
    }
}