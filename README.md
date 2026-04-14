# Homework Tasks

In this homework you need to prepare a Node.js project with basic tooling and complete several small file system tasks.

## Project Setup

Add the following to the project:

- package.json
- .gitignore
- ESLint
- Prettier
- Nodemon
- folder src - all logic files should be placed here

### Requirements

1. Configure the project to use ES Modules by adding the following to package.json:

```json
"type": "module"
```

2. Create one file that uses CommonJS syntax and import it into `app.js` (or any other file).

3. Add useful scripts to `package.json`.

---

# Task 1 — Count Characters in a File

Create a file called:

```
article.txt
```

Add a few sentences to the file.
Write a program that:

1. Reads the file
2. Counts the number of characters in the file
3. Prints the result to the console

### Example output

```
The file contains 120 characters
```

---

# Task 2 — Create a Log File

Write a program that:

1. Creates a file called log.txt

2. Every time the script runs, it appends a new line to the file.

3. The line should contain the time when the script started.

Use the `appendFile` method from the Node.js file system module.

### Example

```
Script started at 2026-03-15 14:22
```

Each time the script runs, a new line should be added to the file.

---

# Task 3 — Replace Text in a File

Create a function that takes three arguments:

1. file name
2. text that should be replaced
3. new text that will replace it

### Function behavior

The function should:

1. Read the file
2. Replace all occurrences of the specified text with the new text
3. Save the updated content back to the file
