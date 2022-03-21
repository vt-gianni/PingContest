<?php


namespace App\Controller;


use App\Repository\ContestRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class DoneContestsController extends AbstractController
{
    private $repository;

    public function __construct(ContestRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(Request $request)
    {
        try {
            return $this->repository->getDoneContests($request->query->get('page', 1));
        } catch (\Exception $e) {
            error_log($e->getMessage());
        }
    }
}