# **My Personal Portfolio**
---

This is a personal portfolio website built using React with Vite for fast development, and a backend powered by Node.js and Express. The portfolio features 3D models and animations created with Blender and rendered using Three.js.

## Technologies Used

- **React** — Frontend UI library  
- **Vite** — Fast build tool and development server for React  
- **Node.js & Express** — Backend server and API  
- **Blender** — 3D modeling and animation software  
- **Three.js** — 3D rendering in the browser  
- **Animations** — typewriter effect, fluid cursor, iframes for websites

while deploying, I have made it serverless using netlify functions.
---

## To Run Locally

To run the project locally, follow these commands one by one:

```bash
git clone https://github.com/HithaHarish/My-Personal-Portfolio.git

cd My-Personal-Portfolio

```
In VSCode or Terminal
1. Delete the folders netlify, dist and files .DS_Store and netlify.toml.
2. Update the path in frontent Contact.jsx component at fetch() to '/backend/index.js'

### Installation 

```bash
cd backend
npm install
```
Install node modules for Node-Express App in backend folder.

```bash
cd ../frontend
npm install
```
Install node modules for frontend at root directory 

### Running locally 

Run the backend first 

```bash
cd ../backend
npm start
```

Open another tab in the terminal 
Run the frontend while backend is running

```bash
cd My-Personal-Portfolio
npm run dev
```

Launch the localhost


