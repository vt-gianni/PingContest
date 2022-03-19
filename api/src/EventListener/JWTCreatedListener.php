<?php


namespace App\EventListener;

use App\Entity\User;
use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    /**
     * @param JWTCreatedEvent $event
     * @throws Exception
     */
    public function updateJwtData(JWTCreatedEvent $event)
    {
        /** @var User $user */
        $user = $event->getUser();
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['firstname'] = $user->getFirstname();
        $data['lastname'] = $user->getLastname();
        $data['birthdate'] = $user->getBirthdate();
        $data['licenseNumber'] = $user->getLicenseNumber();
        $data['officialPoints'] = $user->getOfficialPoints();
        $data['picture'] = $user->getPicture();

        $event->setData($data);
    }
}