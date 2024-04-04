
# Todotracker

This application allows users to create todos. All todos are stored in state at the moment - watch out with the page refresh! 


**ENVIRONMENT VARIABLE MUST BE SET BEFORE USE**
```
FILE: /docker-compose.yaml
VITE_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_KEY_HERE

FILE: /frontend/.env.local
VITE_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_KEY_HERE
```

## Expected API Endpoints

### 1. Create a Todo
- **Endpoint:** `/api/todo`
- **Method:** POST
- **Input:**
	- Request JSON body with the todo details
- **Output:**
	- Success or error response 
### 3. Delete a Todo
- **Endpoint:** `/api/todo/:todoId`
- **Method:** DELETE
- **Input:**
	- Todo ID
- **Output:**
	- Success or error response
### 2. Edit a Todo
- **Endpoint:** `/api/todo/:todoId`
- **Method:** PUT
- **Input:**
	- Todo ID
	- Request JSON body with the updated todo details
- **Output:**
	- Success or error response
### 4. Get All Todos
- **Endpoint:** `/api/todos`
- **Method:** GET
- **Input:** None
- **Output:**
  - List of all todos or error response

### 5. Get Todo by ID
- **Endpoint:** `/api/todo/:todoId`
- **Method:** GET
- **Input:**
  - Todo ID
- **Output:**
  - todo details or error response


## Payment Processing

#### Stripe
Use **Stripe Checkout** pre-built payment forms to quickly get the payment forms up and running.  Alternatively using the **Stripe.js** and **Stripe Elements** library we can build a custom payment form - similar to the custom login that was implemented using Clerk.
