<?php


namespace App\Controller;


use App\Repository\ContestRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UserContestsParticipationsController extends AbstractController
{
    private $contestRepository;

    public function __construct(ContestRepository $contestRepository)
    {
        $this->contestRepository = $contestRepository;
    }

    public function __invoke(Request $request): JsonResponse
    {

    }
}