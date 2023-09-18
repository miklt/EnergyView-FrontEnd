<h1>
  <img src="https://github.com/GARSoftPoli/EnergyView-FrontEnd/assets/116766653/b6eb20ea-290a-4006-ae19-3de289f4264f" height="80">
</h1>

This project was created with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4 as a product of GARSoft's ownership, do not copy or redistribute this code without granted permission.

## How to run

Note that this code requires Angular and Node.js to work.

1. Clone the repository on a local directory;
2. Inside the repository's directory open a terminal;
3. Run `npm i` to install dependencies;
4. Run `npm run start` to serve the app;
5. After compiling the app should be served on [http://localhost:4200/](http://localhost:4200/),

## Workflow

### Issue creation

Prior to initiating any development endeavors, it is imperative to create an issue that succinctly delineates the task at hand. Utilize this issue as a platform for comprehensive discussion and planning of the intended feature or fix.

### Branch naming and commit pattern

When developing, your work branch should be named following the naming pattern:

* For **features**: YYYYMMDD/feat/name-of-feature
* For **fixes**: YYYYMMDD/fix/name-of-fix

Please ensure that you replace YYYYMMDD with the current date, formatted as Year-Month-Day.

#### Adapted conventional commits pattern

Use conventional commits to maintain a consistent and informative commit history. Each commit message should follow this format:

```
#N type: message
```

Where:

* **N**: Is the number of the aforementioned created issue.
* **type**: Describes the purpose of the commit (e.g., feat, fix, chore, docs, style, refactor, test).
* **message**: Is aA brief, descriptive message of the change.

For example:

```
#123 feat: adds new button
```

The types are as follows:

* **test**: Indicates any type of creation or modification of test code. Example: Creation of unit tests.
* **feat**: Indicates the development of a new feature in the project. Example: Adding a service, functionality, endpoint, etc.
* **refactor**: Used when there is a code refactoring that has no impact on the system's logic/business rules. Example: Code changes after a code review.
* **style**: Employed when there are changes in code formatting and style that do not alter the system in any way. Example: Changing the style guide, switching lint conventions, fixing indentations, removing whitespace, removing comments, etc.
* **fix**: Used when there is a correction of errors that are causing bugs in the system. Example: Applying handling for a function that is not behaving as expected and returning an error.
* **chore**: Indicates changes in the project that do not affect the system or test files. These are development changes. Example: Changing ESLint rules, adding Prettier, adding more file extensions to .gitignore.
* **docs**: Used when there are changes in the project's documentation. Example: Adding information to the API documentation, changing the README, etc.
* **build**: Used to indicate changes that affect the project's build process or external dependencies. Example: Gulp, adding/removing npm dependencies, etc.
* **perf**: Indicates a change that improved the system's performance. Example: Changing forEach to while, improving a database query, etc.
* **ci**: Used for changes in CI (Continuous Integration) configuration files. Example: Circle, Travis, BrowserStack, etc.
* **revert**: Indicates the reversal of a previous commit.

### Pull Request (PR)

When you are ready to merge your changes, initiate a Pull Request (PR) from your feature/fix branch to the relevant target branch (e.g., main).

In the PR's description, concisely outline the nature of the changes and make reference to the associated issue through the following format:

```
Closes #N

Description
```

Replace N with the number of the issue you created earlier.

For example:

```
Closes #123

Adds new button to the daily consumption dashboard page.
```

### Example workflow

1. Create an issue on the repository's issue tracker, describing the task.
2. Create a branch for your work following the naming pattern.
3. Make your changes in the branch, following the conventional commit format for your commits.
4. When you are ready to merge your changes, create a PR from your branch to the appropriate target branch (e.g., main).
4. In the PR description, add "Closes #N" to link the PR to the issue and summarize your changes. Replace N with the issue number.
5. Review and discuss the changes in the PR.
6. Once the PR is approved, merge it into the target branch.
