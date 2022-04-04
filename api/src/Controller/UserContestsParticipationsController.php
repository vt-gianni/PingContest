<?php


namespace App\Controller;


use App\Entity\User;
use App\Repository\ContestRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UserContestsParticipationsController extends AbstractController
{
    private $repository;

    public function __construct(ContestRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(Request $request)
    {
        try {
            /** @var User $user */
            $user = $this->getUser();
            return $this->repository->getUserParticipations($request->query->get('page', 1), $user);
        } catch (\Exception $e) {
            error_log($e->getMessage());
        }
    }
}