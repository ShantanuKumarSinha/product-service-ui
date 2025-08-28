# Copilot Instructions for ProductServiceUi

## Project Overview
ProductServiceUi is an Angular-based frontend application. It is designed to manage product-related operations and integrates with a backend service. The project structure follows Angular conventions, with components, services, and models organized under the `src/app` directory.

### Key Directories and Files
- **`src/app`**: Contains the main application logic, including components, services, and models.
  - **Components**:
    - `add-product`: Handles adding new products.
    - `product-list`: Displays a list of products.
    - `product-details`: Shows detailed information about a product.
  - **Services**:
    - `product.service.ts`: Manages API calls and business logic for products.
  - **Models**:
    - `product.model.ts`: Defines the structure of a product object.
    - `create-update-product.model.ts`: Defines the structure for creating or updating a product.
- **`mock-server/server.js`**: A mock server for local development and testing.
- **`proxy.conf.json`**: Proxy configuration for redirecting API calls during development.

## Developer Workflows

### Development Server
- Start the Angular development server:
  ```bash
  ng serve --proxy-config proxy.conf.json
  ```
  Navigate to `http://localhost:4200/` to view the application.

### Mock Server
- Start the mock server for local API testing:
  ```bash
  node mock-server/server.js
  ```

### Building the Project
- Build the project for production:
  ```bash
  ng build
  ```
  The build artifacts will be stored in the `dist/` directory.

### Testing
- Run unit tests:
  ```bash
  ng test
  ```
- Run end-to-end tests:
  ```bash
  ng e2e
  ```
  Note: Ensure the required end-to-end testing package is installed.

## Project-Specific Conventions
- **Component Structure**: Each component has its own HTML, SCSS, TypeScript, and spec files.
- **Service Usage**: Services are used for API calls and shared logic. For example, `product.service.ts` handles all product-related API interactions.
- **Model Definitions**: Models are used to define the structure of data objects, ensuring type safety and consistency.

## Integration Points
- **Backend API**: The application communicates with a backend API. During development, API calls are proxied via `proxy.conf.json`.
- **Mock Server**: The mock server (`mock-server/server.js`) can be used to simulate backend responses.

## Tips for AI Agents
- Follow Angular conventions for creating new components, services, or modules. Use the Angular CLI commands for scaffolding.
- Refer to existing components and services for examples of project-specific patterns.
- Ensure any new API calls are added to the appropriate service (e.g., `product.service.ts`).
- Update or create models as needed when introducing new data structures.

## Examples
### Adding a New Component
To add a new component, use the Angular CLI:
```bash
ng generate component component-name
```
This will create the necessary files and update the module automatically.

### Adding a New API Call
1. Add the API call in the appropriate service (e.g., `product.service.ts`).
2. Use the service method in the relevant component.

---
This document is a guide for AI coding agents to understand and contribute effectively to the ProductServiceUi codebase. If any section is unclear or incomplete, please provide feedback for improvement.
