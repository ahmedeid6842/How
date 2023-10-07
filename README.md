<a name="readme-top"></a>

![logo-no-background](https://github.com/ahmedeid6842/how/assets/57197702/8d2185de-4903-4f2c-8cda-0ca569c0dafb)
<br>
<br>

---
### 📑 Table of Contents
- [📘 Introduction](#introduction)
- [🚀 Getting Started](#getting-started)
  - [Prerequisites ❗](#prerequisites)
  - [Environment Variables :key:](#environment-variables)
  - [Setup ⬇️](#setup)
  - [Install :heavy_check_mark: ](#install)
  - [Usage 🤿 🏃‍♂️](#usage)
- [🔍 APIs Reference](#api-reference)
- [🏗️🔨 Database ERD](#erd)
- [🔄 Sequence Diagrams](#sequence-diagram)
- [👥 Author](#author)
- [🤝 Contributing](#contribution)
- [⭐️ Show Your Support](#support)
- [🔭 Up Next](#up-next)
- [💎 Lessons Learned](#lessons-learned)
- [📜 License ](#license)

## 📘 Introduction <a name="introduction"></a>
<p align="center">
Welcome to the How Backend project! Built with NestJS, a progressive Node.js framework, How is a robust and efficient Q&A application designed to empower users with knowledge and facilitate seamless communication. The How provides a SOLID foundation for building a feature-rich Q&A platform, where users can share knowledge, engage in discussions, and expand their understanding. This project consists of five modules, each serving a specific purpose to deliver a comprehensive user experience.
</p>

<p align="center">
The authentication module provides secure user registration, login, and password reset functionality. With guards ensuring authentication and convenient decorators like @currentUser, accessing user information is a breeze. The email module integrates Nodemailer for reliable email communication, allowing users to stay connected effortlessly. The follow module enables users to connect with others, fostering a vibrant community. The question module empowers users to create, update, and delete questions, while the answer module facilitates answering and managing questions effectively. With a focus on data management, TypeORM is utilized to define entities and establish relationships between them, simplifying database operations.
</p>

<p align="center"> With serialization and interception powered by the SerializeInterceptor, sensitive information is automatically excluded from outgoing responses, ensuring data privacy. </p> 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites ❗<a name="prerequisites"></a>

In order to run this project you need:
<p>
 
<a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=ts,nodejs,postgres&theme=dark"/>
    </a>
    <a href="https://www.npmjs.com/"><img src="https://authy.com/wp-content/uploads/npm-logo.png" width="50px" height="50"/></a>

 </p>

### Environment Variables :key: <a name="environment-variables"></a>
To run this project, you will need to add the following environment variables to a new file at the root directory named `.env`:

- `HOST`: the host of your project (e.g. localhost)
- `PORT`: the port of which your project work on (e.g. 3000)
- `DB_HOST`: the postgres host (e.g. localhost)
- `DB_PORT`: the port on which postgres are working on (e.g. 5432)
- `DB_USERNAME`: your postgres username (e.g. postgres) 
- `DB_PASSWORD`: your postgres password (e.g. root)
- `DB_DATABASE`: the database name on which the project will use (e.g. How) 
- `JWT_SECRET`: the json web token signature to create or validate token (e.g. jwtsecret)
- `NODEMAILER_EMAIL`: the gmail account you will use to forward email (e.g. your-email@gmail.com)
- `NODEMAILER_PASSWORD`: you should SMTP server password form you gmail and enable you 2-step verficaiotn (watch this [video](https://www.youtube.com/watch?v=-MqVdG9w_lY) to get your password)
- `COOKIE_SESSION_SECRET`: your cookie session secret (e.g sessionsecret)

### Setup ⬇️ <a name="setup"></a>
1. Clone the repository:
```shell
   git clone https://github.com/ahmedeid6842/How
```
2. Change to the project directory:
```shell
cd ./How
```

### Install :heavy_check_mark: <a name="install"></a>
Install the project dependencies using NPM:

```shell
npm install
```

### Usage 🤿 🏃‍♂️ <a name="usage"></a>

To start the application in development mode, run the following command:

```shell
npm run start:dev
```

The application will be accessible at http://localhost:3000.

- Alright, it's showtime! 🔥 Hit `http://localhost:3000` and BOOM! 💥  You should see the "Hello world" message and the Car APIs working flawlessly. ✨🧙‍♂️

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔍 [APIs Reference](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&page-id=BcYSwGQVorOAWQsO1LIz&title=Routes.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1rYo7LO-z3DNOGVwCRl8imrcIe3nDMNLH%26export%3Ddownload) <a name="api-reference"></a>

<div align="center">
  <h3> Authentication </h3> 
   <img src="https://github.com/ahmedeid6842/how/assets/57197702/006c7edf-a781-4ed7-94c2-56538f6c11f1"/>

  <h3> Follow </h3> 
   <img src="https://github.com/ahmedeid6842/how/assets/57197702/59769717-0aa0-4005-afe9-6a8e6b4eb9a1"/>


  <h3> Question </h3> 
   <img src="https://github.com/ahmedeid6842/how/assets/57197702/2a91efba-779d-4980-8cc8-382c47d1c139"/>

  <h3> Answer </h3> 
   <img src="https://github.com/ahmedeid6842/How/assets/57197702/9949862b-9b3e-4e68-8536-f1a28e20a9e9"/>
</div>

## 🏗️🔨 [Database ERD](https://drawsql.app/teams/microverse-114/diagrams/how) <a name="erd"></a>

![ERD-Diagram](https://github.com/ahmedeid6842/how/assets/57197702/b4c0a57c-2318-408a-98c6-dc2a3932d465) 

## Sequence Diagrams <a name="sequence-diagram"></a>

<div align="center"> <h3> Auth Module </h3> </div>

```mermaid
   sequenceDiagram
      participant User
      participant AuthController
      participant AuthService
      participant UsersService
      participant EmailService
      participant JwtService

      User->>+AuthController: register()
      AuthController->>+AuthService: register(userCredentials)
      AuthService->>+UsersService: createUser(userCredentials)
      UsersService-->>-AuthService: user
      AuthService->>+EmailService: sendRegistrationEmail(user)
      EmailService-->>-AuthService: emailSent
      AuthService-->>-AuthController: registrationSuccess

      User->>+AuthController: login(credentials)
      AuthController->>+AuthService: login(credentials)
      AuthService->>+UsersService: getUserByEmail(email)
      UsersService-->>-AuthService: user
      AuthService->>+AuthService: comparePasswords(password, user.password)
      AuthService->>+JwtService: generateToken(user)
      JwtService-->>-AuthService: token
      AuthService-->>-AuthController: loginSuccess(token)

      User->>+AuthController: requestPasswordReset(email)
      AuthController->>+AuthService: requestPasswordReset(email)
      AuthService->>+UsersService: getUserByEmail(email)
      UsersService-->>-AuthService: user
      AuthService->>+AuthService: generatePasswordResetToken(user)
      AuthService->>+EmailService: sendPasswordResetEmail(user, resetToken)
      EmailService-->>-AuthService: emailSent
      AuthService-->>-AuthController: passwordResetEmailSent()

      User->>+AuthController: resetPassword(resetToken, newPassword)
      AuthController->>+AuthService: resetPassword(resetToken, newPassword)
      AuthService->>+AuthService: verifyPasswordResetToken(resetToken)
      AuthService->>+UsersService: getUserById(userId)
      UsersService-->>-AuthService: user
      AuthService->>+AuthService: hashPassword(newPassword)
      AuthService->>+UsersService: updatePassword(user, hashedPassword)
      UsersService-->>-AuthService: updatedUser
      AuthService-->>-AuthController: passwordResetSuccess()

      User->>+AuthController: logout()
      AuthController->>+AuthService: logout()
      AuthService-->>-AuthController: logoutSuccess()
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div align="center"> <h3> Follow Module </h3> </div>

```mermaid
sequenceDiagram
    participant Client
    participant FollowController
    participant FollowService
    participant UserRepository
    participant UserService

Client->FollowController: POST /follow
FollowController->FollowService: followUser(following_id, follower)
FollowService->UserService: findOne(followingId)
UserService-->FollowService: following
alt Invalid user id
    FollowService-->FollowController: Throw BadRequestException("Invalid user id")
else
    FollowService->FollowService: followExist(followingId, follower.id)
    FollowService->UserService: findOne(follower.id)
    UserService-->FollowService: follower
    alt You can't follow yourself
        FollowService-->FollowController: Throw BadRequestException("you can't follow yourself")
    else
        alt You already a follower
            FollowService-->FollowController: Throw BadRequestException("you already a follower")
        else
            FollowService->UserRepository: create(following, follower)
            UserRepository-->FollowService: follow
            FollowService->UserRepository: save(follow)
            UserRepository-->FollowService: savedFollow
            FollowService-->FollowController: savedFollow
        end
    end
end

Client->FollowController: GET /follow/followers/:id
FollowController->FollowService: getUserFollowers(userId)
FollowService->UserRepository: find({ user: { id: userId } })
UserRepository-->FollowService: follows
FollowService-->FollowController: follows

Client->FollowController: GET /follow/following/:id
FollowController->FollowService: getUserFollowing(userId)
FollowService->UserRepository: find({ follower: { id: userId } })
UserRepository-->FollowService: follows
FollowService-->FollowController: follows

Client->FollowController: PATCH /follow/unfollow
FollowController->FollowService: unFollowUser(following_id, follower)
FollowService->UserService: findOne(followingId)
UserService-->FollowService: following
alt Invalid user id
    FollowService-->FollowController: Throw BadRequestException("Invalid user id")
else
    FollowService->FollowService: followExist(followingId, follower.id)
    alt You are not following this user
        FollowService-->FollowController: Throw BadRequestException("You are not following this user")
    else
        FollowService->UserRepository: remove(follow)
        UserRepository-->FollowService: removedFollow
        FollowService-->FollowController: removedFollow
    end
end
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div align="center"> <h3> Question Module </h3> </div>

```mermaid
sequenceDiagram
  participant Client
  participant Controller
  participant Service
  participant Repository
  participant QuestionLikesService

  Client->>Controller: POST /question
  Controller->>Service: createQuestion()
  alt Unique question check
    Service->>Service: getQuestion({ title })
    Service->>Repository: queryBuilder.getMany()
    Repository->>Service: questions
    alt Question not unique
      Service->>Controller: BadRequestException
    else
      Service->>Repository: create()
      Repository->>Service: savedQuestion
    end
  else
    Service->>Repository: create()
    Repository->>Service: savedQuestion
  end

  Service->>Service: addQuestion()

  Client->>Controller: GET /question
  Controller->>Service: getQuestion()
  Service->>Repository: queryBuilder.getMany()
  Repository->>Service: questions
  alt No questions found
    Service->>Controller: NotFoundException
  else
    Service->>Controller: questions
  end

  Client->>Controller: PATCH /question/:questionId
  Controller->>Service: updateQuestion()
  Service->>Repository: save()
  Repository->>Service: updatedQuestion

  Client->>Controller: DELETE /question/:questionId
  Controller->>Service: deleteQuestion()
  Service->>Repository: remove()

  Client->>Controller: PATCH /question/like/:questionId
  Controller->>Service: likeQuestion()
  Service->>Service: getQuestion()
  Service->>Repository: queryBuilder.getMany()
  Repository->>Service: questions
  alt Question not found
    Service->>Controller: NotFoundException
  else
    Service->>QuestionLikesService: getLike()
    QuestionLikesService->>Repository: findOne()
    Repository->>QuestionLikesService: like
    alt Like exists
      Service->>Controller: BadRequestException
    else
      QuestionLikesService->>Repository: create()
      Repository->>QuestionLikesService: like
      QuestionLikesService->>Repository: save()
    end
    Service->>Repository: save()
    Repository->>Service: question
  end
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div align="center"> <h3> Answer Module </h3> </div>

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant Service
    participant Repository
    participant QuestionService
    participant AnswerLikesService

    Client->>Controller: POST /answer/:questionId
    Controller->>Service: createAnswer(questionId, body, user)
    Service->>QuestionService: getQuestion({ questionId })
    QuestionService-->>Service: questionExist
    alt questionExist is null
        Service->>Controller: throw NotFoundException
    else questionExist is not null
        Service->>Repository: create(answer, questionExist, user)
        Repository-->>Service: savedAnswer
    end

    Client->>Controller: GET /answer/?query
    Controller->>Service: getAnswer(query)
    Service->>Repository: queryBuilder.getMany()
    Repository-->>Service: answers
    alt answers is empty
        Service->>Controller: throw NotFoundException
    else answers is not empty
        Service-->>Controller: answers
    end

    Client->>Controller: PATCH /answer/:answerId
    Controller->>Service: updateAnswer(answer, body)
    Service->>Repository: save(answer)
    Repository-->>Service: updatedAnswer
    Service-->>Controller: updatedAnswer

    Client->>Controller: DELETE /answer/:questionId/:answerId
    Controller->>Service: deleteAnswer(answer)
    Service->>Repository: remove(answer)

    Client->>Controller: PATCH /answer/like/:answerId
    Controller->>Service: likeAnswer(answerId, user)
    Service->>Service: getAnswer({ answerId })
    Service->>AnswerLikesService: getLike(answerId, user.id)
    AnswerLikesService-->>Service: likeExists
    alt likeExists is not null
        Service->>Controller: throw BadRequestException
    else likeExists is null
        Service->>AnswerLikesService: addLike(answer, user)
        Service->>Repository: save(answer)
    end

```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div align="center"> <h3> Email Module </h3> </div>

```mermaid
sequenceDiagram
    participant Client
    participant EmailService
    participant nodemailer

    Client->>EmailService: sendResetPasswordEmail(email, resetPasswordUrl)
    EmailService->>nodemailer: createTransport(options)
    nodemailer-->>EmailService: transporter
    EmailService->>nodemailer: sendMail(message)
    nodemailer-->>EmailService: result
    EmailService-->>Client: result
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 👤 Author <a name="author"></a>
**Ahmed Eid 🙋‍♂️**
- Github: [@ahmedeid6842](https://github.com/ahmedeid6842/)
- LinkedIn : [Ahmed Eid](https://www.linkedin.com/in/ahmed-eid-0018571b1/)
- Twitter: [@ahmedeid2684](https://twitter.com/ahmedeid2684)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contribution"></a>

We're always looking to improve this project! 🔍 If you notice any issues or have ideas for new features, please don't hesitate to submit a [pull request](https://github.com/ahmedeid6842/How/pulls) 🙌 or create a [new issue](https://github.com/ahmedeid6842/How/issues/new) 💡. Your contribution will help make this project even better! ❤️ 💪

## ⭐️ Show your support <a name="support"></a>

If you find this project helpful, I would greatly appreciate it if you could leave a star! 🌟 💟 

## 🔭 Up next <a name="up-next"></a>

- [ ] Implement Search engine for different question searches 
- [ ] Support pagination for getting questions
- [ ] Enhance the DataBase queries time by using redis LRU caching
- [ ] Move from monolithic to microservices architecture.
- [ ] Apply Background jobs and task scheduling Use a job queue system like Bull or Agenda to handle time-consuming tasks.


## 💎 Lessons Learned <a name="lessons-learned"></a> 

1. Secure user access with effective authentication and authorization.
2. Use a well-structured architecture, such as Nest.js, for code organization, scalability, and maintainability.
3. Take advantage of different NestJS components and decorators.
4. There is something new to learn.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📜 License <a name="license"></a>

This project is licensed under the MIT License - you can click here to have more details [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>