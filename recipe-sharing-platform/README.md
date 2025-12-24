# 🍽️ Recipe Sharing Platform

A responsive web application built with **React** and **Tailwind CSS** that allows users to browse, view, and submit recipes.  

---

## 🛠️ Features

- **Home Page**  
  - Displays recipes in a responsive grid with images, titles, and summaries  
  - Cards have hover effects  
  - Clicking a card navigates to the Recipe Detail Page  
  - “Add New Recipe” button links to the Add Recipe Form  

- **Recipe Detail Page**  
  - Shows detailed information for a selected recipe: image, title, summary, ingredients, and instructions  
  - Responsive layout  
  - Navigation back to Home Page  

- **Add Recipe Form**  
  - Fields: Title, Ingredients, Preparation Steps, Image URL  
  - Front-end validation ensures all fields are filled  
  - Form submission currently logs the recipe to the console  

---

## 📂 Project Structure

src/
├── components/
│ ├── HomePage.jsx
│ ├── RecipeDetail.jsx
│ └── AddRecipeForm.jsx
├── data.json
├── App.jsx
├── main.jsx
└── index.css


---

## ⚙️ Installation
   ```bash
   git clone https://github.com/<your-username>/alx-fe-reactjs.git
   cd recipe-sharing-platform
   npm install
   npm run dev

```
Open in browser: http://localhost:5173


---

## 💻 Technologies

- React
- Tailwind CSS
- React Router DOM
- JavaScript (ES6+)

## 🎯 Learning Outcomes

- Set up React project with Tailwind CSS
- Implement responsive UI and grid layout
- Use React Router for page navigation
- Build forms with validation
- Practice component-based architecture

## 📝 Future Enhancements

- Make form update Home Page dynamically
- Persist recipes using localStorage or backend API
- Add search and filter functionality
- Include user authentication
- Improve animations and UX
