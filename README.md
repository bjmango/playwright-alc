# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact


# Notes
## User the base.fixture.ts to define all the functionalities test options that all the test specs have to follow. This uses playwright architecture to extend the playwright functionality.

## There are three places config the test. 
1. The playwright configuration in playwright.config.ts.  ```use:{user:{email: 'general@email.com, password:'abcde'}}```
2. The projects configuration in playwright.config.ts ```projects:[{name:'chromium', use: {...devices['Desktop Chrome'], user:{email: 'project@email.com', password:'abcd'}}}]```
3. The test spec file. ```test.use({user: email: 'spec@email.com', password: 'abcd'}) ```