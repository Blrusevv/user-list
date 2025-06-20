# User Management & Task Tracking Application

A React application for managing users and tasks, built with TypeScript, Redux Toolkit, and Bootstrap. The app provides a comprehensive interface for viewing, editing, and managing user data along with their associated posts and tasks.

## 🚀 Features

### User Management
- **User List**: Display all users in a collapsible accordion format
- **User Details**: Comprehensive user profile with editable information
- **Real-time Editing**: Inline editing with form validation
- **User Posts**: View and manage user posts with full CRUD operations
- **Responsive Design**: Mobile-friendly interface with Bootstrap components

### Task Management
- **Task List**: Paginated table view of all tasks
- **Advanced Filtering**: Filter by status, title, and owner
- **Status Toggle**: Quick task completion status updates
- **Persistent Changes**: Local storage persistence for task modifications
- **Reset Functionality**: Option to restore original data

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript 4.9
- **State Management**: Redux Toolkit 2.8, RTK Query
- **UI Framework**: Bootstrap 5.3, React Bootstrap 2.10
- **Forms**: React Hook Form 7.58, Yup validation
- **Routing**: React Router DOM 7.6
- **HTTP Client**: Axios 1.10
- **Styling**: SCSS with custom variables
- **Build Tool**: Create React App 5.0

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DeleteConfirmationModal.tsx
│   ├── MainNav.tsx
│   ├── PostForm.tsx
│   ├── UserDetailsGrid.tsx
│   └── UserField.tsx
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
├── pages/              # Page components
│   ├── TasksPage.tsx
│   ├── UserDetailsPage.tsx
│   └── UsersPage.tsx
├── routes/             # Routing configuration
├── services/           # API services and RTK Query
├── store/              # Redux store and slices
├── styles/             # SCSS stylesheets
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🚀 Getting Started
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-list
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env-example .env
```

4. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📱 Available Scripts
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)


## 🔧 Configuration
### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_API_BASE_URL=https://jsonplaceholder.typicode.com
```

### API Endpoints
The application uses JSONPlaceholder API for demo data:
- Users: `/users`
- Posts: `/posts`
- Tasks: `/todos`

## 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Floating Labels**: Modern form inputs with floating labels
- **Loading States**: Comprehensive loading indicators throughout the app
- **Confirmation Modals**: Safe deletion with confirmation dialogs
- **Form Validation**: Real-time validation with error messages
- **Accessibility**: Semantic HTML and ARIA attributes


## 🚀 Deployment
Build the application for production:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.

## 🙏 Acknowledgments
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the demo API
- [Create React App](https://create-react-app.dev/) for the project scaffolding
- [Bootstrap](https://getbootstrap.com/) for the UI framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
