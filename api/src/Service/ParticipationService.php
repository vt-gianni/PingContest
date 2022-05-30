<?php


namespace App\Service;


use App\Entity\ContestCategory;
use App\Entity\Participation;
use App\Entity\User;
use App\Repository\ContestCategoryRepository;
use App\Repository\ParticipationRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Security\Core\Security;

class ParticipationService
{
    private $error;

    private $repository;
    private $contestCategoryRepository;
    private $security;
    private $entityManager;

    public function __construct(ParticipationRepository $repository,
                                ContestCategoryRepository $contestCategoryRepository, Security $security,
                                EntityManagerInterface $entityManager)
    {
        $this->error = null;

        $this->repository = $repository;
        $this->contestCategoryRepository = $contestCategoryRepository;
        $this->security = $security;
        $this->entityManager = $entityManager;
    }

    /**
     * @param string $contestCategoryId
     * @return ContestCategory|null
     * @throws Exception
     */
    public function participate(string $contestCategoryId): ?ContestCategory
    {
        /** @var User $user */
        $user = $this->security->getUser();
        if ($category = $this->contestCategoryRepository->find($contestCategoryId)) {
            if (!$this->repository->findOneBy(['contestCategory' => $category, 'user' => $user])) {
                // S'il y a encore de la place
                if (($category->getParticipations() && count($category->getParticipations()) < $category->getMaxParticipants()) || !$category->getParticipations()) {
                    // Vérification limite d'âge
                    if ($category->getMaxAge() && $category->getMaxAge() >= $this->calculateAge($user->getBirthdate())) {
                        $this->createParticipation($category, $user);

                        return $category;
                    }
                    else {
                        $this->setError('Votre catégorie d\'âge ne correspond pas à cette série.');
                    }
                }
                else {
                    $this->setError('Il n\'y a plus de place dans cette série.');
                }
            }
            else {
                $this->setError('Vous participez déjà à cette série.');
            }
        }
        else {
            $this->setError('Cette série n\'existe pas ou plus.');
        }
        return null;
    }

    /**
     * @param DateTimeInterface $birthDate
     * @return int
     */
    private function calculateAge(DateTimeInterface $birthDate): int
    {
        $today = date("Y-m-d");
        $diff = date_diff(date_create($birthDate), date_create($today));
        return intval($diff->format('%y'));
    }

    /**
     * @param ContestCategory $category
     * @param User $user
     * @throws Exception
     */
    private function createParticipation(ContestCategory $category, User $user): void
    {
        $participation = new Participation();

        $participation
            ->setContestCategory($category)
            ->setUser($user)
            ->setValidated(true)
            ->setJoinDate(new DateTime('now', new \DateTimeZone('Europe/Paris')))
        ;

        $this->entityManager->persist($participation);
        $this->entityManager->flush();
    }

    /**
     * @return string|null
     */
    public function getError(): ?string
    {
        return $this->error;
    }

    /**
     * @param string $error
     */
    public function setError(string $error): void
    {
        $this->error = $error;
    }
}