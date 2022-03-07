<?php


namespace App\Service;


use App\Repository\UserRepository;

class SecurityService
{
    private $userRepository;
    private $error;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->error = null;
    }

    /**
     * @param array $data
     * @return bool
     */
    public function checkRegistrationDate(array $data): bool
    {
        if (array_key_exists('firstname', $data) && array_key_exists('lastname', $data) &&
            array_key_exists('mailAddress', $data) && array_key_exists('password', $data) &&
            array_key_exists('birthdate', $data)) {
            if ($this->checkFirstname($data['firstname']) && $this->checkLastname($data['firstname']) &&
                $this->checkMailAddress($data['mailAddress']) && $this->checkPassword($data['password']) &&
                $this->checkBirthdate($data['birthdate'])) {
                return true;
            }
        } else {
            $this->error = 'Veuillez remplir tous les champs.';
        }
        return false;
    }

    /**
     * @param $birthdate
     * @return bool
     */
    private function checkBirthdate($birthdate): bool
    {
        if ($date = \DateTime::createFromFormat('Y-m-d', $birthdate)) {
            $now = new \DateTime('now');
            if ($date->diff($now)->y >= 6) {
                return true;
            }
            $this->error = 'L\'âge minimum est de 6 ans.';
        }
        else {
            $this->error = 'Format de date invalide.';
        }
        return false;
    }

    /**
     * @param string $password
     * @return bool
     */
    private function checkPassword(string $password): bool
    {
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number = preg_match('@[0-9]@', $password);
        $specialChars = preg_match('@[^\w]@', $password);

        if (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 6) {
            $this->error = 'Le mot de passe doit containir au moins 6 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial.';
            return false;
        }
        return true;
    }

    /**
     * @param $mailAddress
     * @return bool
     */
    private function checkMailAddress($mailAddress): bool
    {
        if (is_string($mailAddress) && filter_var($mailAddress, FILTER_VALIDATE_EMAIL)) {
            if (!$this->userRepository->findOneBy(['email' => $mailAddress])) {
                return true;
            }
            $this->error = 'Cette adresse mail est déjà utilisée.';
        } else {
            $this->error = 'Mauvais format d\'adresse mail.';
        }
        return false;
    }

    /**
     * @param $lastname
     * @return bool
     */
    private function checkLastname($lastname): bool
    {
        if (is_string($lastname) && strlen($lastname) >= 2 && strlen($lastname) <= 30 &&
            preg_match('/^[a-zA-Zéèï]+$/', $lastname)) {
            return true;
        }
        $this->error = 'Le nom doit contenir entre 2 et 30 caractères alphabétiques. (ainsi que les accents éèï)';
        return false;
    }

    /**
     * @param $firstname
     * @return bool
     */
    private function checkFirstname($firstname): bool
    {
        if (is_string($firstname) && strlen($firstname) >= 2 && strlen($firstname) <= 30 &&
            preg_match('/^[a-zA-Zéèï]+$/', $firstname)) {
            return true;
        }
        $this->error = 'Le prénom doit contenir entre 2 et 30 caractères alphabétiques. (ainsi que les accents éèï)';
        return false;
    }

    /**
     * @return string|null
     */
    public function getError(): ?string
    {
        return $this->error;
    }
}