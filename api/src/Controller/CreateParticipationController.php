<?php


namespace App\Controller;


use App\Entity\ContestCategory;
use App\Entity\User;
use App\Service\ParticipationService;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class CreateParticipationController extends AbstractController
{
    private $security;
    private $service;

    public function __construct(Security $security, ParticipationService $service)
    {
        $this->security = $security;
        $this->service = $service;
    }

    /**
     * @param Request $request
     * @return ContestCategory|JsonResponse|null
     * @throws Exception
     */
    public function __invoke(Request $request)
    {
        /** @var User $user */
        if ($user = $this->security->getUser()) {
            $data = json_decode($request->getContent(), true);

            if ($data && array_key_exists('contestCategoryId', $data) && is_string($data['contestCategoryId'])) {
                if ($contestCategory = $this->service->participate($data['contestCategoryId'])) {
                    return $contestCategory;
                }
                return $this->json(['error' => $this->service->getError()], 400);
            }
            return $this->json(['error' => 'Bad request.'], 400);
        }
        return $this->json(['error' => 'Unauthorized.'], 401);
    }
}