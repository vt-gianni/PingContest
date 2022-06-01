<?php


namespace App\Service;


use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class UserTestService
{
    const SUCCESS_CODE = 200;
    const BASE_URL = 'https://127.0.0.1:8000';

    private $client;
    private $requestStack;

    public function __construct(HttpClientInterface $client, RequestStack $requestStack)
    {
        $this->client = $client;
        $this->requestStack = $requestStack;
    }

    /**
     * @param string $mailAddress
     * @param string $password
     * @return string|null
     * @throws ClientExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    public function getUserToken(string $mailAddress, string $password): ?string
    {
        $response = $this->client->request(
            'POST',
            self::BASE_URL . '/api/login_check',
            [
                'json' => [
                    'username' => $mailAddress,
                    'password' => $password
                ]
            ]
        );
        if ($response->getStatusCode() === self::SUCCESS_CODE) {
            $content = $response->toArray();

            if (array_key_exists('token', $content)) {
                return $content['token'];
            }
        }
        return null;
    }
}