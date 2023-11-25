import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HOW REST APIs: A Powerful Q&A Framework</title>
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    font-family: sans-serif;
                }
        
                body {
                    background-color: #f2f2f2;
                }
        
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background-color: #fff;
                    padding: 0px 10px;
                    z-index: 10;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
        
                .navbar-left {
                    display: flex;
                    align-items: center;
                }
        
                .navbar-right {
                    display: flex;
                    align-items: center;
                }
        
                .navbar img {
                    width: 3.5rem;
                    margin: 0;
                    display: none;
                }
        
                .navbar a {
                    font-family: sans-serif;
                    display: inline-block;
                    padding: 0px 15px;
                    text-decoration: none;
                    color: #6070ff;
                    border-radius: 5px;
                }
        
                .navbar a:hover {
                    box-shadow: 0 8px 16px rgba(54, 179, 127, 0.24);
                    background-color: #396df2;
                    color: #fff;
                    transition: background-color 0.3s ease-in-out;
                }
        
                .navbar-toggle {
                    display: none;
                }
        
                .navbar-toggle-label {
                    cursor: pointer;
                    display: none;
                }
        
                .navbar-toggle-label span,
                .navbar-toggle-label span:before,
                .navbar-toggle-label span:after {
                    display: block;
                    width: 100%;
                    height: 2px;
                    background-color: #6070ff;
                    position: absolute;
                    left: 0;
                    transition: transform 0.3s ease-in-out;
                }
        
                .navbar-toggle-label span:before,
                .navbar-toggle-label span:after {
                    content: "";
                }
        
                .navbar-toggle-label span:before {
                    top: -8px;
                }
        
                .navbar-toggle-label span:after {
                    top: 8px;
                }
        
                .navbar-toggle:checked+.navbar-toggle-label span {
                    background-color: transparent;
                }
        
                .navbar-toggle:checked+.navbar-toggle-label span:before {
                    transform: rotate(45deg);
                    top: 0;
                }
        
                .navbar-toggle:checked+.navbar-toggle-label span:after {
                    transform: rotate(-45deg);
                    top: 0;
                }
        
                .navbar-toggle:checked+.navbar-toggle-label {
                    transform: rotate(90deg);
                }
        
                @media (max-width: 767px) {
                    .navbar {
                        padding: 10px;
                    }
        
                    .navbar img {
                        display: none;
                    }
        
                    .navbar-left {
                        flex: 1;
                    }
        
                    .navbar-right {
                        display: none;
                    }
        
                    .navbar-toggle {
                        display: block;
                    }
        
                    .navbar-toggle-label {
                        display: block;
                        width: 30px;
                        height: 30px;
                        position: relative;
                        z-index: 11;
                        transform: rotate(0deg);
                        transition: transform 0.3s ease-in-out;
                    }
        
                    .navbar-toggle-label span {
                        background-color: #6070ff;
                    }
        
                    .navbar-toggle:checked~.navbar-right {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        width: 100%;
                        background-color: #fff;
                        padding: 15px;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
        
                    .navbar-right a {
                        display: block;
                        margin-bottom: 10px;
                    }
                }
        
                @media (min-width: 768px) {
                    .navbar img {
                        display: block;
                    }
                }
        
                h1 {
                    font-size: 32px;
                    font-weight: 700;
                }
        
                main {
                    max-width: 800px;
                    margin: 20px auto;
                    margin-top: 5rem;
                    padding: 30px;
                    background-color: #fff;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 5px;
                }
        
                img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 5px;
                }
        
                h2 {
                    font-size: 24px;
                    font-weight: 600;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
        
                ul {
                    list-style-type: disc;
                    padding-left: 20px;
                }
        
                li {
                    margin-bottom: 5px;
                }
        
                .intro img {
                    width: 100%;
                    max-width: 400px;
                    height: auto;
                    border-radius: 5px;
                    margin-bottom: 5px;
                }
        
                .image-container {
                    width: 100%;
                    max-width: none !important;
                    text-align: center;
                    margin-bottom: 2rem !important;
                }
        
                .badges {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }
        
                .badge {
                    display: inline-block;
                    margin: 0 10px;
                }
        
                .intro strong {
                    color: #396df2;
                    font-size: 1.2rem;
                    font-weight: 600;
                }
        
                .api-reference,
                .erd,
                .performance,
                .benefits,
                .features,
                .intro {
                    background-color: #f8f8f8;
                    padding: 50px;
                    border-radius: 5px;
                    margin-bottom: 3rem;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                }
        
                .api-reference h2,
                .erd h2,
                .performance h2,
                .benefits h2,
                .features h2,
                .intro h2 {
                    color: #172b4d;
                    font-size: 24px;
                    margin-bottom: 10px;
                }
        
                .api-reference p.description,
                .erd p.description,
                .feature-item .description,
                .benefits .description,
                .performance-list li,
                .intro p.description {
                    text-align: left;
                    color: #344563;
                    font-size: 16px;
                    line-height: 1.8;
                    margin-bottom: 40px;
                }
        
                .api-reference h3,
                .erd h3 {
                    color: #172b4d;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
        
                .api-reference img,
                .erd img {
                    width: 100%;
                    height: auto;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
        
                .api-reference a,
                .erd a {
                    display: inline-block;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 500;
                    text-align: center;
                    padding: 1rem;
                    color: #396df2;
                    border: 1px solid #396df2;
                    border-radius: 8px;
                    margin-top: 15px;
                    transition: 0.6s;
                    background-color: #fff;
                }
        
                .api-reference a:hover,
                .erd a:hover {
                    box-shadow: 0 8px 16px rgba(54, 179, 127, 0.24);
                    background-color: #396df2;
                    color: #fff;
                    transition: background-color 0.3s ease-in-out;
                }
        
                .benefits-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    padding-left: 20px;
                }
        
                .benefits-list li {
                    color: #344563;
                    font-size: 16px;
                    margin-bottom: 10px;
                    position: relative;
                    padding-left: 30px;
                    line-height: 1.5;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
        
                .benefits-list li:before {
                    content: "";
                    width: 10px;
                    height: 10px;
                    background-color: #396df2;
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    top: 8px;
                }
        
                .benefits-list li:hover {
                    color: #396df2;
                    transform: translateY(-5px);
                }
        
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }
        
                .feature-item {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
        
                .feature-item:hover {
                    box-shadow: 0 8px 16px rgba(54, 179, 127, 0.24);
                    transform: translateY(-5px);
                }
        
                .performance-content {
                    max-width: 800px;
                    margin: 0 auto;
                }
        
                .performance-content .description {
                    text-align: left;
                    color: #555;
                    font-size: 18px;
                    line-height: 1.8;
                    margin-bottom: 40px;
                }
        
                .performance-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
        
                .author-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #f8f8f8;
                    padding: 40px;
                    border-radius: 5px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                }
        
                .author-info {
                    flex: 1;
                    margin-right: 40px;
                }
        
                .author-info h2 {
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: #172b4d;
                    animation: bounceText 1.5s infinite;
                }
        
                .author-info p {
                    font-size: 16px;
                    color: #344563;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
        
                .connect-icons {
                    display: flex;
                }
        
                .social-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    color: #fff;
                    border-radius: 50%;
                    margin-right: 10px;
                    text-decoration: none;
                    transition: transform 0.3s ease-in-out;
                }
        
                @keyframes spin {
                    0% {
                        transform: rotate(0);
                    }
        
                    100% {
                        transform: rotate(360deg);
                    }
                }
        
                .social-icon:hover {
                    animation: spin 0.8s ease-in-out;
                    transform: scale(1.1);
                }
        
                .author-image img {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    object-fit: cover;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                }
        
                .author-image:hover img,
                .api-auth:hover,
                .api-follow:hover,
                .api-question:hover,
                .api-answer:hover,
                .erd-img:hover {
                    transform: scale(1.1);
                    transition: transform 0.3s ease-in-out;
                }
        
                @keyframes bounceText {
                    0%,
                    20%,
                    50%,
                    80%,
                    100% {
                        transform: translateY(0);
                    }
        
                    40% {
                        transform: translateY(-20px);
                        animation-timing-function: ease-out;
                    }
        
                    60% {
                        transform: translateY(-10px);
                        animation-timing-function: ease-in;
                    }
                }
        
                @media (max-width: 767px) {
                    .author-section {
                        flex-direction: column;
                        padding: 20px;
                    }
        
                    .author-info {
                        margin-right: 0;
                        margin-bottom: 20px;
                    }
        
                    .author-image img {
                        width: 150px;
                        height: 150px;
                    }
        
                    .api-reference,
                    .erd,
                    .performance,
                    .benefits,
                    .features,
                    .intro {
                        padding: 50px 20px;
                    }
                }
            </style>
        </head>
        
        <body>
            <header>
                <nav class="navbar">
                    <div class="navbar-left">
                        <img src="https://github.com/ahmedeid6842/How/assets/57197702/754529bf-a888-499f-afd2-8d910f498f93"
                            alt="Favicon">
                    </div>
                    <input type="checkbox" id="navbar-toggle" class="navbar-toggle">
                    <label for="navbar-toggle" class="navbar-toggle-label">
                        <span></span>
                    </label>
                    <div class="navbar-right">
                        <a href="#intro" class="active">Intro</a>
                        <a href="#api-reference">API Reference</a>
                        <a href="#erd">Entity Relationship Diagram</a>
                        <a href="#benefits">Benefits</a>
                        <a href="#features">Features</a>
                        <a href="#performance">Performance Optimization</a>
                        <a href="#author-section">About the Author</a>
                    </div>
                </nav>
            </header>
        
            <main>
                <section class="intro" id="intro">
                    <img class="image-container"
                        src="https://github.com/ahmedeid6842/How/assets/57197702/ece33093-9dc2-4b87-bfb0-cca817860a72"
                        alt="HOW Logo">
                    <div class="badges">
                        <a href="https://github.com/ahmedeid6842/HOW" target="_blank" class="badge">
                            <img src="https://img.shields.io/badge/Source%20Code-GitHub%20How-flat?style=flat&color=lightgrey&logo=github"
                                alt="GitHub Badge">
                        </a>
                        <a href="https://www.linkedin.com/in/ameid/" target="_blank" class="linkedin-badge">
                            <img src="https://img.shields.io/badge/Author%20LinkedIn-ameid-minimal?style=minimal&color=blue&logo=linkedin"
                                alt="LinkedIn Badge">
                        </a>
                        <a href="https://github.com/ahmedeid6842" target="_blank" class="badge">
                            <img src="https://img.shields.io/badge/Author%20Github-ahmedeid6842-flat?style=flat&color=brightgreen&logo=github"
                                alt="Author Badge">
                        </a>
                        <a href="https://ahmedeid6842.github.io/Portfolio/" target="_blank" class="badge">
                            <img src="https://img.shields.io/badge/Portfolio-ahmedeid6842-lightgrey?style=flat&logo=fontawesome&logoColor=#6070ff&color=#398378"
                                alt="Portfolio Badge">
                        </a>
                    </div>
                    <h2>Introduction</h2>
                    <p class="description">
                        &nbsp;&nbsp;&nbsp;&nbsp;<b>HOW</b> How Backend project! Built with NestJS, a progressive Node.js
                        framework, How is a robust and efficient Q&A application designed to empower users with knowledge and
                        facilitate seamless communication. The How provides a SOLID foundation for building a feature-rich Q&A
                        platform, where users can share knowledge, engage in discussions, and expand their understanding. This
                        project consists of five modules, each serving a specific purpose to deliver a comprehensive user
                        experience.
                    </p>
        
                    <p class="description">
                        <i><strong>Note:</strong> This page is just an intro documentation page for HOW REST APIs. To use the APIs and sending
                            requests and receiving responses at the same domain, please refer to the API Reference section below.</i>
                    </p>
                </section>
                <section class="api-reference" id="api-reference">
                    <h2>API Reference</h2>
                    <p class="description">
                        To get started using the HOW REST APIs, please refer to the comprehensive REST API reference
                        documentation.
                    </p>
                    <h3>1. Authentication </h3>
                    <img class="api-auth"
                        src="https://github.com/ahmedeid6842/How/assets/57197702/2269e670-2129-41bb-b85d-6405daaa24d7"
                        alt="authenticaitons apis" />
                    <h3> 2. Follow </h3>
                    <img class="api-follow"
                        src="https://github.com/ahmedeid6842/How/assets/57197702/b834ed6f-6a38-4673-bc8c-4232be53e76a"
                        alt="follow apis" />
                    <h3> 3. Question </h3>
                    <img class="api-question"
                        src="https://github.com/ahmedeid6842/How/assets/57197702/870ef0d1-ac32-43c7-8561-62fe57f9f8e2"
                        alt="question apis">
                    <h3> 4. Answer </h3>
                    <img class="api-answer"
                        src="https://github.com/ahmedeid6842/How/assets/57197702/9cf9b4d9-9ae8-4fb6-bc63-4426b84e82b3"
                        alt="answer apis">
                    <a href="https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&page-id=pBkF-awqWtSFPUcyi1-K&title=Routes.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1D-TuhzpAZRQlZboRrvKCF1oMvUy1BSBy%26export%3Ddownload"
                        target="_blank">API Reference</a>
                </section>
        
                <section class="erd" id="erd">
                    <h2>Entity Relationship Diagram</h2>
                    <p class="description">
                        Here's the ERD of HOW, showcasing the interconnected entities and their relationships, that form the
                        foundation of the Database's architecture.
                    </p>
                    <img class="erd-img"
                        src="https://github.com/ahmedeid6842/How/assets/57197702/ccbccdff-c9ee-45fa-b174-ec697de62000"
                        alt="HOW ERD">
                    <a href="https://drawsql.app/teams/microverse-114/diagrams/how" target="_blank">ERD</a>
                </section>
        
                <section class="benefits" id="benefits">
                    <h2>Benefits of using HOW REST APIs</h2>
        
                    <ul class="benefits-list">
                        <li>Easy to use</li>
                        <li>Powerful and flexible</li>
                        <li>Well-structured and easy to maintain</li>
                        <li>Scalable</li>
                        <li>Can be used to power a wide variety of applications</li>
                        <li>Can be used to integrate with existing systems and data sources</li>
                    </ul>
                </section>
        
                <section class="features" id="features">
                    <h2>Key Features</h2>
                    <div class="features-grid">
                        <div class="feature-item">
                            <h3>Secure User Authentication 🛡️</h3>
        
                            <p class="description">
                                Employing guards and decorators, the authentication module ensures secure user registration,
                                login, and password reset functionality.
                            </p>
                        </div>
        
                        <div class="feature-item">
                            <h3>Reliable Email Communication 📧</h3>
        
                            <p class="description">
                                Leveraging Nodemailer, the email module enables seamless and reliable email communication
                                between users and the system.
                            </p>
                        </div>
        
                        <div class="feature-item">
                            <h3>Vibrant Community Engagement 🌐</h3>
        
                            <p class="description">
                                The follow module fosters a vibrant community by enabling users to connect with and follow
                                others, expanding their network and access to valuable insights.
                            </p>
                        </div>
        
                        <div class="feature-item">
                            <h3>Comprehensive Question Management ❓</h3>
        
                            <p class="description">
                                The question module empowers users to create, update, and delete questions, while the answer
                                module facilitates answering and managing questions effectively.
                            </p>
                        </div>
        
                        <div class="feature-item">
                            <h3>Efficient Data Management 💾</h3>
        
                            <p class="description">
                                TypeORM is utilized to define entities and establish relationships between them, simplifying
                                database operations and ensuring data integrity.
                            </p>
                        </div>
        
                        <div class="feature-item">
                            <h3>Data Privacy Protection 🔒</h3>
        
                            <p class="description">
                                Powered by the SerializeInterceptor, serialization and interception automatically exclude
                                sensitive information from outgoing responses, safeguarding user privacy.
                            </p>
                        </div>
                </section>
                </section>
        
                <section class="performance" id="performance">
                    <h2>Performance Optimization</h2>
        
                    <div class="performance-content">
                        <p class="description">
                            HOW REST APIs is designed with performance in mind. It utilizes caching techniques to reduce
                            database load and improve response times.
                        </p>
        
                        <ul class="performance-list">
                            <li>
                                <strong>Enhanced Response Times:</strong> Utilizing Redis caching, the Cache-Aside Pattern, and
                                TTL (Time to Live) strategy, response times are significantly improved, reducing database load
                                and enhancing user experience.
                            </li>
                        </ul>
                    </div>
                </section>
        
                <section class="author-section" id="author-section">
                    <div class="author-info">
                        <h2>Brief about me</h2>
                        <h2>I’m Ahmed Eid.
                            Glad to see you!
                        </h2>
                        <p>I'm graduated from the Faculty of Computer and Informatics at Suez Canal University, where I majored
                            in Computer Science. My primary area of interest is web development, with a particular focus on the
                            Backend track.</p>
                        <div class="connect-icons">
                            <a href="https://www.linkedin.com/in/ameid/" target="_blank" class="social-icon">
                                <img src="https://github.com/ahmedeid6842/How/assets/57197702/85f60950-d168-4e81-86f9-b8c6a96c0613"
                                    alt="twitter-logo">
                            </a>
                            <a href="https://github.com/ahmedeid6842" target="_blank" class="social-icon">
                                <img src="https://github.com/ahmedeid6842/How/assets/57197702/a686cb35-0f74-423a-85a2-63a14802def9"
                                    alt="twitter-logo">
                            </a>
                            <a href="https://twitter.com/ahmedeid2684" target="_blank" class="social-icon">
                                <img src="https://github.com/ahmedeid6842/How/assets/57197702/ef57b75b-33cf-4863-97ec-7f46b1d5a250"
                                    alt="twitter-logo">
                            </a>
                        </div>
                    </div>
                    <div class="author-image">
                        <a href="https://ahmedeid6842.github.io/Portfolio/" target="_blank">
                            <img src="https://github.com/ahmedeid6842/How/assets/57197702/fee4759b-e00d-4055-9a4f-7583b7803a29"
                                alt="Author Image">
                        </a>
                    </div>
                </section>
        
            </main>
        </body>
        
        </html>  
    `;
  }
}
