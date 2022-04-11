<?php


namespace App\Service;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class UserService
{
    private $security;
    private $entityManager;
    private $pictureService;

    public function __construct(Security $security, EntityManagerInterface $entityManager, PictureService $pictureService)
    {
        $this->security = $security;
        $this->entityManager = $entityManager;
        $this->pictureService = $pictureService;
    }

    /**
     * @param string $picture
     * @return string|null
     */
    public function updatePicture(string $picture): ?string
    {
        /** @var User $user */
        $user = $this->security->getUser();
        $picture_url = uniqid() . '.jpg';

        if ($this->pictureService->base64_to_jpeg($picture, $picture_url)) {
            $user->setPicture($picture_url);
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return $picture_url;
        }
        return null;
    }
}