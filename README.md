
# Todotracker

This application allows users to create todos. All todos are stored in state at the moment - watch out with the page refresh! 


**ENVIRONMENT VARIABLE MUST BE SET BEFORE USE**
```
FILE: /frontend/.env.local
VITE_CLERK_PUBLISHABLE_KEY=pk_test_cG9zc2libGUtY3ViLTc2LmNsZXJrLmFjY291bnRzLmRldiQ
```
You can create your own key at [Clerk](https://www.clerk.com), I have provided my publishable key before for demo purposes.
The `docker-compose.yaml` file already has the key included.

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
  - Todo details or error response


## Payment Processing

#### Stripe
Use **Stripe Checkout** pre-built payment forms to quickly get the payment forms up and running.  Alternatively using the **Stripe.js** and **Stripe Elements** library we can build a custom payment form - similar to the custom login that was implemented using Clerk.
