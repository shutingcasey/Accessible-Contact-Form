# 🌍♿ Accessible Contact Form (with Backend)
This is an **accessible contact form** designed to meet **WCAG standards** and ensure a smooth user experience for **everyone**, including users who rely on **screen readers, keyboard navigation, or assistive technologies**.

## ✅ Features
### **Frontend (Client-Side)**
- **Keyboard Navigation**: Users can navigate using `Tab` & `Shift+Tab`.  
- **Screen Reader Support**: Uses **`aria-label`** and **`aria-live="assertive"`** to ensure accessibility.  
- **Form Validation**: Prevents empty fields and invalid email formats.  
- **Error Messages with Live Updates**: Error messages are instantly read aloud for screen reader users.  
- **Lighthouse Accessibility Score**: **100/100 🎯**  
- **Responsive Design**: Fully adaptable for all devices.  

### **Backend (Server-Side)**
- **RESTful API with Express.js & MongoDB** for handling user messages.  
- **Clear and Detailed Error Messages**: Ensures accessibility by returning **specific error details**.  
- **Spoken Message API Support**: Includes **`spokenMessage`** field for compatibility with screen readers and voice assistants.  
- **Standardized API Responses**: Uses `{ status, message, spokenMessage, data }` format for easy accessibility.  
- **Proper HTTP Status Codes**: Uses `200` for success, `400` for validation errors, and `500` for server errors.  

## 🛠️ How It Works
1. Users navigate the form using the **`Tab` key**.  
2. If a field is **empty** or the **email format is incorrect**, an **error message** appears instantly.  
3. The **error message is read aloud** for screen reader users (`aria-live="assertive"`).  
4. When all inputs are valid, clicking `"Submit"` **sends the message to the backend**.  
5. The backend stores the message in **MongoDB** and returns a **spokenMessage** for voice assistant compatibility.  

## 🏗️ Technologies Used
### **Frontend**
- **HTML5** (Semantic Markup for Accessibility)  
- **CSS3** (Responsive & Focus Styles for Keyboard Navigation)  
- **JavaScript (ES6+)** (Form Validation & Fetch API for Backend Requests)  
- **Lighthouse (Accessibility Testing)**  

### **Backend**
- **Node.js** (Server-side logic)  
- **Express.js** (RESTful API)  
- **MongoDB + Mongoose** (Database for storing messages)  
- **CORS** (Cross-Origin Resource Sharing)  
- **Dotenv** (Environment Variable Management)  

