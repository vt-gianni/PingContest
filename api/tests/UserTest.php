<?php


namespace App\Tests;


use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use App\Service\UserTestService;
use Faker\Factory;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class UserTest extends ApiTestCase
{
    /**
     * @throws TransportExceptionInterface
     */
    public function testCreateUser(): void
    {
        $faker = Factory::create('fr_FR');

        static::createClient()->request('POST', '/api/registration', ['json' => [
            'firstname' => str_replace(' ', '', $faker->firstName),
            'lastname' => str_replace(' ', '', $faker->lastName),
            'mailAddress' => $faker->email,
            'birthdate' => $faker->dateTimeBetween('-80 years', '-6 years')->format('Y-m-d'),
            'password' => 'Test12!'
        ]]);
        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $this->assertMatchesResourceItemJsonSchema(User::class);
    }

    public function testLogUser(): void
    {
        static::createClient()->request('POST', '/api/login_check', ['json' => [
            'username' => 'gg@vitalytech.com',
            'password' => 'Test12!'
        ]]);
        $this->assertResponseStatusCodeSame(200);
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $this->assertMatchesResourceItemJsonSchema(User::class);
    }

    public function testGetUser(): void
    {
        $kernel = self::bootKernel();
        $token = $kernel->getContainer()->get(UserTestService::class)->getUserToken('gg@vitalytech.com', 'Test12!');

        static::createClient()->request('GET', '/api/users/1', ['headers' => [
            'Authorization' => 'Bearer ' . $token
        ]]);
        $this->assertResponseStatusCodeSame(200);
        $this->assertMatchesResourceItemJsonSchema(User::class);
    }
}