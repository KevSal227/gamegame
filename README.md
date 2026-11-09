# 🎮 Game Time



<img width="863" height="647" alt="GameGame SS" src="https://github.com/user-attachments/assets/c1368def-c400-4d2a-ad08-449842994554" />


A simple full-stack CRUD app for keeping track of the video games you want to play, are playing, or have finished, with a quick review for each one.

Built with **Node.js**, **Express**, **MongoDB**, and **EJS**.

---

## ✨ Features

- **Add a game** with its title and a link to a cover image
- **See all your games** in one list, each with its picture
- **Update the status** of a game: `Will Play`, `Playing`, or `Finished`
- **Leave a review**: `Must Play`, `Meh`, or `Bunz`
- **Delete** games you no longer want on your list

Status and review changes save automatically and stay put after a page refresh.

---

## 🧠 How CRUD Works Here

| Action     | What it does in the app                         |
|------------|-------------------------------------------------|
| **Create** | Add a new game with a title and image URL       |
| **Read**   | View every game saved in the database           |
| **Update** | Change a game's status or review from dropdowns |
| **Delete** | Remove a game from the list                     |

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/): JavaScript runtime
- [Express](https://expressjs.com/): web server and routing
- [MongoDB](https://www.mongodb.com/) (Atlas): database
- [EJS](https://ejs.co/): templating for the main page
- [body-parser](https://www.npmjs.com/package/body-parser): reads form and JSON data
- [nodemon](https://nodemon.io/): auto-restarts the server during development

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Connect your database

You'll need a MongoDB connection string, such as a free cluster from [MongoDB Atlas](https://www.mongodb.com/atlas).

Set it as an environment variable called `MONGO_URL`:

```bash
# macOS / Linux
export MONGO_URL="mongodb+srv://<username>:<password>@<cluster-url>/"

# Windows (PowerShell)
$env:MONGO_URL="mongodb+srv://<username>:<password>@<cluster-url>/"
```

The app uses a database named `demo` and stores games in a collection called `messages`.

### 4. Run the app

```bash
npm start
```

Or, for development with auto-restart:

```bash
npm run savage
```

Then open **http://localhost:3000** in your browser.

---

## 📡 API Routes

| Method   | Route      | Description                                      | Body                          |
|----------|------------|--------------------------------------------------|-------------------------------|
| `GET`    | `/`        | Renders the main page with all saved games       | none                          |
| `POST`   | `/messages`| Adds a new game                                  | `name`, `pic`                 |
| `PUT`    | `/status`  | Updates a game's status                          | `id`, `status`                |
| `PUT`    | `/review`  | Updates a game's review                          | `id`, `Review`                |
| `DELETE` | `/messages`| Deletes a game by its ID                         | `id`                          |

---

## 🗂️ Data Shape

Each game is saved in MongoDB like this:

```json
{
  "_id": "ObjectId",
  "name": "Hollow Knight",
  "pic": "https://example.com/hollow-knight.jpg",
  "status": "Playing",
  "Review": "Must Play"
}
```

---

## 📁 Project Structure

```
├── public/
│   ├── main.js               # Client-side JS (dropdown updates and delete)
│   ├── styles.css            # Styling
│   └── font-awesome.min.css  # Icons
├── views/
│   └── index.ejs             # Main page template
├── server.js                 # Express server and routes
├── package.json
└── README.md
```

---

## 🌱 Ideas for Later

- Upload images instead of pasting a link
- Filter games by status or review
- Add user accounts so everyone can keep their own list
