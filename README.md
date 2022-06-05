*NB: Link to previous readme:* <a href="https://github.com/vt-gianni/PingContest/blob/main/MASTERPROJECT.md">https://github.com/vt-gianni/PingContest/blob/main/MASTERPROJECT.md</a>

<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Twitter][twitter-shield]][twitter-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://ping-contest.herokuapp.com">
    <img src="front/assets/logo.png" alt="Logo" width="200">
  </a>

<h3 align="center">Ping Contest</h3>

  <p align="center">
    Application for creating and managing contests for table tennis.
    <br />
    <br />
    <a href="https://github.com/vt-gianni/PingContest">View Demo</a>
    ·
    <a href="https://github.com/vt-gianni/PingContest/issues">Report Bug</a>
    ·
    <a href="https://github.com/vt-gianni/PingContest/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#database-schema">Database schema</a></li>
        <li><a href="#securing-endpoints">Securing endpoints</a></li>
        <li><a href="#app-design">App design</a></li>
        <li><a href="#unit-tests">Unit Tests</a></li>
        <li><a href="#continuous-integration">Continuous Integration</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#launch">Launch</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#registration-and-connection">Registration and connection</a></li>
        <li><a href="#list-of-contests">List of contests</a></li>
        <li><a href="#creation-of-a-contest-and-its-series">Creation of a contest and its series</a></li>
        <li><a href="#contest-information">Contest information</a></li>
        <li><a href="#club-information">Club information</a></li>
        <li><a href="#subscribe-to-a-series">Subscribe to a series</a></li>
        <li><a href="#profile-information">Profile information</a></li>
        <li><a href="#avatar-uploading">Avatar uploading</a></li>
        <li><a href="#change-of-information-and-logout">Change of information and logout</a></li>
      </ul>
    </li>
    <li><a href="#demonstration">Demonstration</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Being quite athletic, I participated in many tournaments in different sports. Over the years, I have seen many problems with the registration process and the management of sports tournaments. The first is the accessibility of the information because many tournaments are only announced on Facebook pages to which you must be a subscriber. (often the club page) Then, the registration is only done by currency, it is currently impossible to pay by bank transfer.

So I had the idea of creating an app allowing both competitors and organizers to facilitate the management of tournaments. Not knowing all the sports and how their tournaments work, I decided to devote myself only to one sport, table tennis.


**INFO:** The api sources are located in this git repository in the api folder. The sources of the mobile application are located in this git repository in the front folder.


### Built With


<p align="center"><img src ="symfony.png" alt="Symfony" width="100"/></p>

* [Symfony](https://symfony.com/)

A « framework » is a toolkit in the form of code files. It allows developers to focus on the main features of their project by providing an architecture, security rules, useful components, etc..

There are many frameworks, so why do I use Symfony?

Symfony is a french PHP framework, with a huge community. It benefits from regular updates and new annual versions that are always more efficient. It is therefore a very lively framework and it is easy to find help when a problem arises.

In addition, unlike many other frameworks, Symfony incorporates important security measures, making it possible to avoir most common flaws. It also integrates many modules of all kinds, such as API Platform.

<p align="center"><img src ="api_platform.png" alt="API Platform" width="100"/></p>

* [API Platform](https://api-platform.com/)

API Platform is a module that can be easily installed via a Symfony API. It greatly simplifies development by providing for example, basic actions around entities. The developer does not need to develop the routes himself to fetch the articles, create one, delete one, etc.. It is nevertheless of course possible to create custom routes and modify the basic behavior of the classic routes. The creation of routes can be done only via annotations and makes development very fast.

<p align="center"><img src ="react_native.png" alt="React Native" width="150"/></p>

* [React Native](https://reactnative.dev/)

React Native is a framework for creating cross-platform mobile applications very simply using only the JavaScript langage. This framework is based on the React framework, itself designed to simplify the development of web platforms by providing reusable component development. React Native is a very reliable framework, developed by Facebook, with a huge community and many community plugins. Its choice over other mobile frameworks is primarily based on its cross-platform character. In addition, its simplicity of development, coupled with the use of Expo Go made me prefer React Native to Flutter for example.

<p align="center"><img src="expo_go.png" alt="Expo Go" width="150"/></p>

* [Expo](https://expo.dev/)

Expo Go is a tool and a mobile application allowing to test an application in React Native on all devices connected to the same network as the PC where the developer works. Thus, the developer can test in real time the modifications on the application on many devices at the same time, via the Internet.

### Database schema

<p align="center"><img src="schema_bdd.png" alt="Database schema"/></p>

### Securing endpoints

The API is secure thanks to the management of <a href="https://jwt.io/">JWT</a> Token and the secure configuration of endpoints.

#### Using a JWT Token

The endpoint allowing the connection will return a jwt token which will then allow the user to be authenticated when calling private endpoints.

This is what the return of the login endpoint looks like:

```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQyNDcxNTgsImV4cCI6MTY1NDMzMzU1OCwicm9sZXMiOlsiUk9MRV9QUk8iLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJnaWFubmlnaXV4LmdpdWRpY2VAZ21haWwuY29tIiwiaWQiOjEsImZpcnN0bmFtZSI6IkdpYW5uaSIsImxhc3RuYW1lIjoiR2l1ZGljZSIsImJpcnRoZGF0ZSI6eyJkYXRlIjoiMTk5Ni0wNi0xOCAxMzoyNDoxNS4wMDAwMDAiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IlVUQyJ9LCJsaWNlbnNlTnVtYmVyIjoiNTcyNTMxIiwib2ZmaWNpYWxQb2ludHMiOjk3NSwicGljdHVyZSI6IjYyOTExYTkyZTQ2OWIuanBnIn0.bdqJq17aqQYsi6IpWdA2UO6tykqKf7W9NpcC0p443btDedCNk5SUkCFS3NOTjApg3dGNxpLLhYsCMqpSZUfMn7aYW1iMfLQLtCXbKgymEGCRsrMemHuTrBcloUan8bWGRjlM4w2afFnA_GPqfV8o5RzLrQh_dX8d9f8bGNs6xhNs1YN6RBK-9JS-TwVcNTULtXsYaz5sgWVz9I6TqZY2B25iHyQ52WHZtdMljqSeFExg_yF7BSiDsVSSNJnFgl9UGR-D8osHFUCtZauJjS4nZkGVLus87JjH_zfD5nmPvleeueLf-HulTu0-Ubr-MaW_CEoSKctF-pVrV953OQF2kg",
    "refresh_token": "11d9c04814620af22b7da2d9d6af0e73a973a6ae23a5025761226d215f218dd5fddca01a8a70ccc3d9aa134d0479a09a2edf754f9206912d71d955342f8b2265"
}
```

The refresh token, on the other hand, makes it possible to automatically generate a new token on the front side once the old token has expired. This allows the user not to be disconnected once his token expires.

Here is the example of a method in javascript allowing to call the creation of a contest endpoint, using a JWT token:

```js
export const createContest = (token, data) => {
    return fetch(API_ADDRESS + '/contests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            startDate: data.startDate,
            address: data.address,
            city: data.city,
            hallName: data.hallName,
            endDate: data.endDate,
            endRegistrationDate: data.endRegistrationDate
        })
    })
}
```


#### Configuration of endpoints

The endpoints have been secured to allow only strictly necessary operations accessible via the application. Thus, it is impossible, for example, to modify certain fields or delete certain data via the API. For example, it is not possible to delete a user from an API endpoint. In addition, endpoints do not allow you to modify the information of a club that you do not own or the information of another user, for example. This is thanks to the authentication and roles system.

Let's see an example configuration on Symfony using API Platform annotations:

```php
 /** @ApiResource(
 *     normalizationContext={"groups"={"read_user"}},
 *     itemOperations={
 *          "get",
            "put"={
 *              "access_control"="object == user",
 *              "denormalization_context"={"groups"={"put_user"}}
 *          }
 *     },
 *     collectionOperations={
            "get",
 *          "update_picture"={
 *              "method"="put",
 *              "path"="/users/update-picture",
 *              "controller"="App\Controller\UpdateUserPictureController",
 *              "openapi_context"={
 *                  "summary"="Modifie l'image de l'utilisateur."
 *              }
 *          }
 *     }
 */
```

As you can see, a "read_user" group is defined to determine what data is returned to data normalization.

Next, the operations available for "item" type data are defined. We can see that only get and put operations are allowed here.

It is possible to determine rules on each operation as here with the put operation. It is specified that only the user owning the account can modify his information and that he can only modify the fields belonging to the "put_user" group.

In collection type operations, we can see an example of a custom operation with the redirection of a route to a method of a controller. This makes it possible to create more complex behaviors where the data is managed directly by hand.

Here is an example of the fields of our User entity and the groups of operations related to it:

```php
    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_registrated", "put_user", "read_user"})
     */
    private $firstname;
```
We can see here that the password field is not assigned to any group. It is therefore not recoverable via a GET operation and cannot be modified with a direct PUT.

Regarding the firstname field, it is subscribed to the put_user group, indicating that it is one of the fields that can be modified via the PUT operation, but also to the read_user group, indicating that it can be retrieved via the GET operation.

#### Config file

A configuration file finally allows me to manage which user role has the right to access the endpoints.

```yml
access_control:
        - { path: ^/api/login, roles: PUBLIC_ACCESS }
        - { path: ^/api/registration, roles: PUBLIC_ACCESS }
        - { path: ^/api/contests, roles: PUBLIC_ACCESS }
        - { path: ^/api/token/refresh, roles: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/api, roles: IS_AUTHENTICATED_FULLY }
```

#### Roles

There are currently two different roles for a user. The **["ROLE_USER"]** defines a normal user of the application. The **["ROLE_PRO"]** defines a user who can create a tournament, often represented by a club manager.


### App design

I was able to work on the design thanks to some usefull tools.


#### Colors

In order to create a design with consistent and modern colors, I used the online tool <a href="https://paletton.com/">Paletton</a>. Paletton is a tool for creating color palettes. Here are the colors i picked:

- <img src ="https://img.shields.io/static/v1?label=&message=00A1E7&color=00A1E7"/>
- <img src ="https://img.shields.io/static/v1?label=&message=FF3100&color=FF3100"/>
- <img src ="https://img.shields.io/static/v1?label=&message=FFB700&color=FFB700"/>


#### Lottie files animations

In order to make loading times more user friendly, I used <a href="https://lottiefiles.com/">Lottie files</a> which allowed me to integrate very light animations in the form of a json file.

### Unit Tests

I have some unit tests in place that allow me to test the behavior and return of my API endpoints. I use <a href="https://phpunit.de/">PHPUnit</a>.

You can access it here: <a href="https://github.com/vt-gianni/PingContest/tree/main/api/tests">api/tests</a> 

This is what a unit test looks like with PHPUnit:

```php
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
```

### Continuous Integration

<p align="center"><img src ="circle-ci.png" alt="Circle CI"/></p>

I use <a href="https://circleci.com/">Circle CI</a> for continuous integration of my API. I integrate the installation of my API project as well as the launch of my unit tests.

Here you can see a <a href="https://app.circleci.com/pipelines/github/vt-gianni/PingContest/21/workflows/051b75fe-4ee7-4196-b7be-4813164e28c8/jobs/21">Successful Circle CI build</a>.

### Deployment

I currently use <a href="https://dashboard.heroku.com/">Heroku</a> git to deploy Ping Contest API. Thanks to Heroku, the project is built and deployed automatically after a git heroku command.

```bash
git push heroku main
```

Thanks to this tool, the project API is currently accessible at this address: <a href="https://ping-contest.herokuapp.com/">https://ping-contest.herokuapp.com</a>

<p align="right">(<a href="#top">back to top</a>)</p>



## Getting Started

For this installation, you will need a Fedora workstation 36 machine as well as the Expo Go application on your smartphone. You will also need to be connected to the same wifi network on your machine as well as on your smartphone.

If you are using a Virtual Machine, you will have to change the network access mode from NAT to Bridged Adapter.

### Installation

Open the terminal and run the following commands.

```bash
sudo dnf install nodejs

sudo dnf install curl

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash   

source ~/.bashrc

nvm install 16.13.0

git clone https://github.com/vt-gianni/PingContest.git

cd PingContest/front

sudo npm install --global expo-cli

npm i

````

### Launch

```bash
npm start
```

A QR code should appear in the terminal. All you have to do is scan this QR Code via the Expo Go application to launch the project on your smartphone.

<p align="right">(<a href="#top">back to top</a>)</p>


## Features

<p align="center">
<img src ="contests_list.jpg" alt="Logo" width="250"/> <img src ="connection.jpg" alt="Logo" width="250"/> <img src ="user_profile.jpg" alt="Logo" width="250"/>
</p>

### Registration and connection

The application allows access to the list of upcoming tournaments without having to log in. The user can thus get an idea of ​​the appearance of the application and the functionalities it offers before registering.

Ping Contest currently allows to create an account manually and will allow, in a future version, to create an account via the Facebook service. The user can then log in and access more options.

### List of contests

On the home page, a list of tournaments is available to the user. It also has the possibility to sort these tournaments in order to obtain those past, in progress or to come. A pagination system is performed when scrolling the screen.

### Creation of a contest and its series

The + button that can be seen on the screen above on the home page is only visible for a "pro" user, corresponding to an account managed by the leader of a club. The user is then brought to a form allowing him to create a tournament as well as its different series.

### Contest information

By clicking on one of the contests in the list, the application redirects to a screen displaying the information of a contest.

### Club information

On the screen of a contest, by clicking on the button "See the club", it is possible to display the information on the club organizing the contest.

### Subscribe to a series

By clicking on "See the series" on the screen of a tournament, the user is redirected to a page displaying the different series of the contest. He can then see if he is already registered or not for each series and register for a series by clicking on an icon directly.

### Profile information

The profile icon on the navigation bar provides access to the user profile. On it, the user can see his main information as well as the upcoming tournaments in which he is registered.

### Avatar Uploading

By clicking on his avatar, the user can upload an image from his personal files.

### Change of information and logout

By clicking on the icon at the top right of the user profile screen, a menu is displayed and offers two links. A first to disconnect and a second leading to a screen for editing personal information. On it, the user can modify the value of his license number as well as the value of his official points.

<p align="right">(<a href="#top">back to top</a>)</p>


## Demonstration

A short video presenting the main features of the application is available on Youtube at the following address:

<a target="_blank" href="https://www.youtube.com/watch?v=e2qkt72qvrU">https://www.youtube.com/watch?v=e2qkt72qvrU</a>


<!-- CONTACT -->
## Contact

Gianni GIUDICE - [@GGianniDev](https://twitter.com/GGianniDev) - gg@vitalytech.com

Project Link: [https://github.com/vt-gianni/PingContest/](https://github.com/vt-gianni/PingContest/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/vt-gianni/PingContest.svg?style=for-the-badge
[contributors-url]: https://github.com/vt-gianni/PingContest/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/vt-gianni/PingContest.svg?style=for-the-badge
[forks-url]: https://github.com/vt-gianni/PingContest/network/members
[stars-shield]: https://img.shields.io/github/stars/vt-gianni/PingContest.svg?style=for-the-badge
[stars-url]: https://github.com/vt-gianni/PingContest/stargazers
[issues-shield]: https://img.shields.io/github/issues/vt-gianni/PingContest.svg?style=for-the-badge
[issues-url]: https://github.com/vt-gianni/PingContest/issues
[license-shield]: https://img.shields.io/github/license/vt-gianni/PingContest.svg?style=for-the-badge
[license-url]: https://github.com/vt-gianni/PingContest/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://fr.linkedin.com/in/gianni-giudice-388b56157
[twitter-shield]: https://img.shields.io/badge/-Twitter-black.svg?style=for-the-badge&logo=Twitter&colorB=555
[twitter-url]: https://twitter.com/GGianniDev
[product-screenshot]: images/screenshot.png
