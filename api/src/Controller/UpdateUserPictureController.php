<?php


namespace App\Controller;


use App\Entity\User;
use App\Repository\ContestRepository;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class UpdateUserPictureController extends AbstractController
{
    private $security;
    private $service;

    public function __construct(Security $security, UserService $service)
    {
        $this->security = $security;
        $this->service = $service;
    }

    public function __invoke(Request $request)
    {
        /** @var User $user */
        if ($user = $this->security->getUser()) {
            $data = json_decode($request->getContent(), true);

            if ($data && array_key_exists('picture', $data) && is_string($data['picture'])) {
                if ($url = $this->service->updatePicture($data['picture'])) {
                    return $user;
                }
            }
            return $this->json(['error' => 'Bad request.'], 400);
        }
        return $this->json(['error' => 'Unauthorized.'], 401);
    }
}