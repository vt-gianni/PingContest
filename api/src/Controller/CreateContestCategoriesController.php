<?php


namespace App\Controller;


use App\Entity\User;
use App\Repository\ContestRepository;
use App\Service\ContestCategoryService;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CreateContestCategoriesController extends AbstractController
{
    private $service;
    private $contestRepository;

    public function __construct(ContestCategoryService $service, ContestRepository $contestRepository)
    {
        $this->service = $service;
        $this->contestRepository = $contestRepository;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        /** @var User $user */
        if (($user = $this->getUser()) && $this->isGranted('ROLE_PRO', $user)) {
            if (array_key_exists('contestId', $data) &&
                ($contest = $this->contestRepository->find($data['contestId'])) &&
                array_key_exists('elements', $data) && is_array($data['elements']) &&
                $user->getClub() === $contest->getClub()) {
                if ($this->service->checkPostData($data, $contest)) {
                    return $this->json(
                        $this->contestRepository->find($contest->getId()), 201
                    );
                }
                return $this->json(['error' => $this->service->getError()], 400);
            }
            return $this->json(['error' => 'Bad request.'], 400);
        }
        return $this->json(['error' => 'Unauthorized.'], 401);
    }
}