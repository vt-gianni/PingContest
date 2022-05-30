<?php


namespace App\Controller;


use App\Entity\Participation;
use App\Entity\User;
use App\Repository\ContestCategoryRepository;
use App\Repository\ParticipationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CheckMyParticipationOnCategoryController extends AbstractController
{
    private $repository;
    private $categoryRepository;

    public function __construct(ParticipationRepository $repository, ContestCategoryRepository $categoryRepository)
    {
        $this->repository = $repository;
        $this->categoryRepository = $categoryRepository;

    }

    /**
     * @param Request $request
     * @param int $contestCategoryId
     * @return Participation|JsonResponse|null
     */
    public function __invoke(Request $request, int $contestCategoryId)
    {
        /** @var User $user */
        $user = $this->getUser();

        if ($contestCategory = $this->categoryRepository->find($contestCategoryId)) {
            return $this->repository->findOneBy(['contestCategory' => $contestCategory, 'user' => $user]);
        }
        return $this->json(['error' => 'Cette série n\'existe pas ou plus.']);
    }
}