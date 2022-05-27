<?php


namespace App\Service;


use App\Entity\Contest;
use App\Entity\ContestCategory;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Exception;

class ContestCategoryService
{
    private $entityManager;
    private $error;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->error = null;
    }

    /**
     * @param array $data
     * @param Contest $contest
     * @return bool
     * @throws Exception
     */
    public function checkPostData(array $data, Contest $contest): bool
    {
        foreach ($data['elements'] as $element) {
            // Champs obligatoires
            if (array_key_exists('startDate', $element) && array_key_exists('winPrice', $element) &&
            array_key_exists('price', $element) && array_key_exists('minParticipants', $element) &&
            array_key_exists('maxParticipants', $element)) {
                // Format et valeur des champs
                if (($startDate = \DateTime::createFromFormat('Y-m-d', $element['startDate'])) &&
                    $contest->getStartDate()->setTime(0, 0, 0) <= $startDate) {
                    // Format et valeur des champs
                    if ($this->validatesAsInt($element['price']) && $this->validatesAsInt($element['winPrice']) &&
                    $this->validatesAsInt($element['minParticipants']) && $this->validatesAsInt($element['maxParticipants'])) {

                        // Série Open
                        if (array_key_exists('open', $element) && $element['open']) {
                            $this->createOpen($element, $contest);
                        } // Série Handicap
                        elseif (array_key_exists('disability', $element) && $element['disability']) {
                            $this->createDisability($element, $contest);
                        } // Série Femmes
                        elseif (array_key_exists('onlyWomen', $element) && $element['onlyWomen']) {
                            $this->createOnlyWomen($element, $contest);
                        } // Série Hommes
                        elseif (array_key_exists('onlyMen', $element) && $element['onlyMen']) {
                            $this->createOnlyMen($element, $contest);
                        } // Série Limite d'âge
                        elseif (array_key_exists('maxAge', $element) && $this->validatesAsInt($element['maxAge'])) {
                            $this->createMaxAge($element, $contest);
                        } // Série Limite de points
                        elseif (array_key_exists('maxPoints', $element) && $this->validatesAsInt($element['maxPoints'])) {
                            $this->createMaxPoints($element, $contest);
                        } // Série Minimum de points
                        elseif (array_key_exists('minPoints', $element) && $this->validatesAsInt($element['minPoints'])) {
                            $this->createMinPoints($element, $contest);
                        } else {
                            $this->setError('Bad request.');
                            return false;
                        }
                    }
                    else {
                        $this->setError('Bad request.');
                        return false;
                    }
                }
                else {
                    $this->setError('La date de début de la série ne peut pas être antérieure à la date de début du tournoi.');
                    return false;
                }
            }
            else {
                $this->setError('Bad request.');
                return false;
            }
        }
        $this->entityManager->flush();
        return true;
    }

    /**
     * @param string $number
     * @return bool
     */
    private function validatesAsInt(string $number): bool
    {
        $number = filter_var($number, FILTER_VALIDATE_INT);
        return ($number !== FALSE);
    }

    /**
     * @param array $element
     * @param Contest $contest
     */
    private function createOpen(array $element, Contest $contest): void
    {
        $category = new ContestCategory();

        $category
            ->setContest($contest)
            ->setStartDate(\DateTime::createFromFormat('Y-m-d', $element['startDate']))
            ->setOpen(true)
            ->setMaxParticipants(intval($element['maxParticipants']))
            ->setMinParticipants(intval($element['minParticipants']))
            ->setPrice(intval($element['price']))
            ->setWinPrice(intval($element['winPrice']))
        ;

        $this->entityManager->persist($category);
    }

    /**
     * @param array $element
     * @param Contest $contest
     */
    private function createDisability(array $element, Contest $contest): void
    {
        $category = new ContestCategory();

        $category
            ->setContest($contest)
            ->setStartDate(\DateTime::createFromFormat('Y-m-d', $element['startDate']))
            ->setDisability(true)
            ->setMaxParticipants(intval($element['maxParticipants']))
            ->setMinParticipants(intval($element['minParticipants']))
            ->setPrice(intval($element['price']))
            ->setWinPrice(intval($element['winPrice']))
        ;

        $this->entityManager->persist($category);
    }

    /**
     * @param array $element
     * @param Contest $contest
     */
    private function createOnlyWomen(array $element, Contest $contest): void
    {
        $category = new ContestCategory();

        $category
            ->setContest($contest)
            ->setStartDate(\DateTime::createFromFormat('Y-m-d', $element['startDate']))
            ->setOnlyWomen(true)
            ->setMaxParticipants(intval($element['maxParticipants']))
            ->setMinParticipants(intval($element['minParticipants']))
            ->setPrice(intval($element['price']))
            ->setWinPrice(intval($element['winPrice']))
        ;

        $this->entityManager->persist($category);
    }

    /**
     * @param array $element
     * @param Contest $contest
     */
    private function createOnlyMen(array $element, Contest $contest): void
    {
        $category = new ContestCategory();

        $category
            ->setContest($contest)
            ->setStartDate(\DateTime::createFromFormat('Y-m-d', $element['startDate']))
            ->setOnlyMen(true)
            ->setMaxParticipants(intval($element['maxParticipants']))
            ->setMinParticipants(intval($element['minParticipants']))
            ->setPrice(intval($element['price']))
            ->setWinPrice(intval($element['winPrice']))
        ;

        $this->entityManager->persist($category);
    }

    /**
     * @param array $element
     * @param Contest $contest
     */
    private function createMaxAge(array $element, Contest $contest): void
    {
        $category = new ContestCategory();

        $category
            ->setContest($contest)
            ->setStartDate(\DateTime::createFromFormat('Y-m-d', $element['startDate']))
            ->setMaxAge(intval($element['maxAge']))
            ->setMaxParticipants(intval($element['maxParticipants']))
            ->setMinParticipants(intval($element['minParticipants']))
            ->setPrice(intval($element['price']))
            ->setWinPrice(intval($element['winPrice']))
        ;

        $this->entityManager->persist($category);
    }

    /**
     * @param array $element
     * @param Contest $contest
     */
    private function createMaxPoints(array $element, Contest $contest): void
    {
        $category = new ContestCategory();

        $category
            ->setContest($contest)
            ->setStartDate(\DateTime::createFromFormat('Y-m-d', $element['startDate']))
            ->setMaxPoints(intval($element['maxPoints']))
            ->setMaxParticipants(intval($element['maxParticipants']))
            ->setMinParticipants(intval($element['minParticipants']))
            ->setPrice(intval($element['price']))
            ->setWinPrice(intval($element['winPrice']))
        ;

        $this->entityManager->persist($category);
    }

    /**
     * @param array $element
     * @param Contest $contest
     */
    private function createMinPoints(array $element, Contest $contest): void
    {
        $category = new ContestCategory();

        $category
            ->setContest($contest)
            ->setStartDate(\DateTime::createFromFormat('Y-m-d', $element['startDate']))
            ->setMinPoints(intval($element['minPoints']))
            ->setMaxParticipants(intval($element['maxParticipants']))
            ->setMinParticipants(intval($element['minParticipants']))
            ->setPrice(intval($element['price']))
            ->setWinPrice(intval($element['winPrice']))
        ;

        $this->entityManager->persist($category);
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

        $contest
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

            $this->entityManager->persist($contest);
            $this->entityManager->flush();

            return $contest;
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