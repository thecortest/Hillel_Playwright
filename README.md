# Hillel_Playwright

### 🧪 Framework

This project uses [Playwright](https://playwright.dev/) with [TypeScript](https://www.typescriptlang.org/).

### 🎮 Install and Run the Project

> Pre requirements:

1. Install [Git] (https://www.atlassian.com/git/tutorials/install-git)
2. Install [NodeJS] (https://nodejs.dev/en/learn/how-to-install-nodejs/)
3. Install [VS Code (IDE)](https://code.visualstudio.com/learn/get-started/basics)
4. Install [iTerm](https://iterm2.com/documentation-one-page.html)
5. Add VS Code extension (Name: Playwright Test for VSCode)

#### 📥 Clone

1. Open the terminal and access the folder where want to clone the project: `cd your_folder_name`
2. Go to https://github.com/thecortest/Hillel_Playwright and clone the project: `git clone git@github.com:thecortest/Hillel_Playwright.git`

#### 🪄 Install

1. Make sure you are in the project folder: `cd Hillel_Playwright`
2. Install the project: `npm i`
3. Create your [.env](.env) file following the [.env.example](.env.example) add your env credentials and save
4. Make sure you have installed the (playwright test for VScode ) extension
5. Ready to run tests

#### 🗝️ Run

# Run with vs code extension

-   Go to the Testing tab, expand it, and click the buttons to run tests or debug.
-   Navigate to the test file (.ts), and buttons should be next to the test method.

# Run with npm command:

Run all tests: `npm run test'
Run a single test file: `npm run registration`

Check [package.json](package.json) for more scripts.

-   Run all tests: `npm run test`
-   Run a single registration test file: `npx playwright test tests/ui/specs/registration.spec.ts`

#### General Rules

### 🔭 Commit messages

Your commit subject line must be able to complete the sentence

> If applied, this commit will ...
