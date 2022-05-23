<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class CreateContestController extends AbstractController
{
    public function __invoke(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if (($user = $this->getUser()) && $this->isGranted('ROLE_PRO', $user)) {
            if (array_key_exists('startDate', $data) && array_key_exists('address', $data) &&
                array_key_exists('city', $data) && array_key_exists('hallName', $data) &&
                array_key_exists('endRegistrationDate', $data) && array_key_exists('endDate', $data)) {

            }
            return $this->json(['error' => 'Bad request.', 400]);
        }
        return $this->json(['error' => 'Unauthorized.'], 401);
    }
}