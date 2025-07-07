# Villa 29 - Inventario y Cocina Frontend

## Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/david-rosval/villa29-inventario-y-cocina-frontend-nextjs.git
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Add `.env.local` File**:
   Create a `.env.local` file in the root directory with the following structure:
   ```env
   MODE="dev"
   NEXT_PUBLIC_MODE="dev"
   NEXT_PUBLIC_SOCKET_SERVER_URL_DEV="http://localhost:[backend-dev-port]"
   SERVER_URL_DEV="http://localhost:[backend-dev-port]/api"
   MONGODB_URI="mongodb+srv://[user]:[password]@[domain]/[database]"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## Testing

To run tests, use one of the following commands:

- Run all tests:
  ```bash
  npm run test
  ```

- Run tests in watch mode:
  ```bash
  npm run test:watch
  ```
