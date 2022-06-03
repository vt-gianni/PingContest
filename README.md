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
  <a href="https://github.com/github_username/repo_name">
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
        <li><a href="#app-design">App design</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#registration-and-connection">Registration and connection</a></li>
        <li><a href="#list-of-contests">List of contests</a></li>
        <li><a href="#creation-of-a-contest-and-its-series">Creation of a contest and its series</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Being quite athletic, I participated in many tournaments in different sports. Over the years, I have seen many problems with the registration process and the management of sports tournaments. The first is the accessibility of the information because many tournaments are only announced on Facebook pages to which you must be a subscriber. (often the club page) Then, the registration is only done by currency, it is currently impossible to pay by bank transfer.

So I had the idea of creating an app allowing both competitors and organizers to facilitate the management of tournaments. Not knowing all the sports and how their tournaments work, I decided to devote myself only to one sport, table tennis.



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

<p align="center"><img src ="expo_go.png" alt="Expo Go" width="150"/></p>

* [Expo](https://expo.dev/)

Expo Go is a tool and a mobile application allowing to test an application in React Native on all devices connected to the same network as the PC where the developer works. Thus, the developer can test in real time the modifications on the application on many devices at the same time, via the Internet.


### App design

I was able to work on the design thanks to some usefull tools.


#### Colors

In order to create a design with consistent and modern colors, I used the online tool <a href="https://paletton.com/">Paletton</a>. Paletton is a tool for creating color palettes. Here are the colors i picked:

- <img src ="https://img.shields.io/static/v1?label=&message=00A1E7&color=00A1E7"/>
- <img src ="https://img.shields.io/static/v1?label=&message=FF3100&color=FF3100"/>
- <img src ="https://img.shields.io/static/v1?label=&message=FFB700&color=FFB700"/>


#### Lottie files animations

In order to make loading times more user friendly, I used <a href="https://lottiefiles.com/">Lottie files</a> which allowed me to integrate very light animations in the form of a json file.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

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


<p align="right">(<a href="#top">back to top</a>)</p>


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
