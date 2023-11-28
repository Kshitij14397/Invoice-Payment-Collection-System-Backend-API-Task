# Invoice-Payment-Collection-System-Backend-API-Task

## Schema
### 1) User Schema(name, email, phone_no, password, passwordConfirm, photo, role, passwordChangedAt)
### 2) Invoice Schema(description, amount, status, dueDate, timestamp, receiverID, payerID). 
### 3) Transaction Schema(invoiceID, payerID, receiverID, amount, status, paymentMethod, timestamp). 
### Here in all the schemas "_id" will be implicitely added as a primary key by MongoDB.

## Schema Relationship
### 1) Here receiverID and payerID refers the User Schema.
### 2) Here invoiceID refers the Invoice Schema and receiverID and payerID refers the User Schema.
  
## Setup Instructions
### 1) Open the repository in Visual Studio Code.
### 2) Open the terminal and run the command: "npm i" to install the required packages from package.json and also to create the node_modules folder.
### 3) Now go to MongoDB Atlas with this link "https://account.mongodb.com/account/login?_ga=2.122516747.1274893244.1700993014-113699383.1675715487" and login with my account.
### 4) After this on VS Code terminal, run the command: "npm run start" to start the server for listening requests.

## Tech Stack Used
### 1) Language: Node JS (Javascript)
### 2) Framework: Express
### 3) Database: MongoDB
### 4) ORM: Mongoose
### 5) Authentication & Authorization Algorithm: JWT(JSON Web Token)

## Note
### 1) I have hosted my database on the MongoDB Atlas which is a cloud service provided by the developers of MongoDB.
### 2) Host: http://127.0.0.1:8000/
