<?php


namespace App\Tests;


use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class UserTest extends ApiTestCase
{
    public function testCreateUser(): void
    {
        $response = static::createClient()->request('POST', '/api/registration', ['json' => [
            'firstname' => 'Cr',
            'lastname' => 'Br',
            'mailAddress' => 'cr.br@gmail.com',
            'birthdate' => '1999-07-31',
            'password' => 'Test12!'
        ]]);
        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $this->assertMatchesResourceItemJsonSchema(User::class);
    }
}