<?php


namespace App\Controller;


use App\Entity\User;
use App\Service\SecurityService;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class SecurityController extends AbstractController
{
    private $entityManager;
    private $serializer;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/api/registration", name="app_registration")
     * @param Request $request
     * @param SecurityService $service
     * @param UserPasswordHasherInterface $passwordHasher
     * @return JsonResponse
     * @throws Exception
     */
    public function registration(Request $request, SecurityService $service, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if ($service->checkRegistrationDate($data)) {
            $user = new User();
            $user->setFirstname($data['firstname']);
            $user->setLastname($data['lastname']);
            $user->setBirthdate(\DateTime::createFromFormat('Y-m-d', $data['birthdate']));
            $user->setEmail($data['mailAddress']);
            $user->setRegistrationDate(new \DateTime('now', new \DateTimeZone('Europe/Paris')));
            $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
            $user->setRoles(['ROLE_USER']);

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return $this->json($user, 201, [], ['groups' => 'user_registrated']);
        }
        return $this->json([
            'error' => $service->getError()
        ], 400);
    }
}