<?php


namespace App\Service;


use App\Entity\ContestCategory;
use App\Entity\Participation;
use App\Entity\User;
use App\Repository\ContestCategoryRepository;
use App\Repository\ParticipationRepository;
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
                $this->createParticipation($category, $user);

                return $category;
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
            ->setJoinDate(new \DateTime('now', new \DateTimeZone('Europe/Paris')))
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