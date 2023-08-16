# Sherlock Homes
## Property Management System

## Overview

Sherlock Homes is a property management application designed to help property managers and residents efficiently manage various aspects of their property, such as maintenance requests, payments, event RSVPs, etc. This README provides an overview of the project's structure, features, and how to set it up.

## Features

- User Authentication and Login
- Analytical dashboard
- Event Management
- Maintenance Request Management
- Payment System
- Live Chat
- Event RSVP System

## Technologies Used

- Frontend: React
- Backend: Python (Flask)
- Database: SQLite (for development)

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.x
- Git

### Frontend Setup

1. Clone the repository: `git clone https://github.com/your-username/property-management-app.git`
2. Navigate to the `frontend` directory: `cd property-management-app/frontend`
3. Install dependencies: `npm install`
4. Start the frontend server: `npm start`
5. Open a web browser and go to `http://localhost:3000` to see the app.

### Backend Setup

1. Navigate to the `backend` directory: `cd property-management-app/backend`
2. Create a virtual environment: `python3 -m venv venv`
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Set up the database:
   - Initialize the database: `python manage.py db init`
   - Create the initial migration: `python manage.py db migrate`
   - Apply the migration: `python manage.py db upgrade`
6. Start the backend server: `python manage.py run`

## API Endpoints

- Authentication:
  - `/api/auth/register` - User registration
  - `/api/auth/login` - User login
  - `/api/auth/logout` - User logout

- Maintenance Requests:
  - `/api/maintenance` - List all maintenance requests
  - `/api/maintenance/create` - Create a new maintenance request
  - `/api/maintenance/update/<int:id>` - Update a maintenance request

- Payments:
  - `/api/payments` - List all payments
  - `/api/payments/create` - Create a new payment

- Live Chat:
  - `/api/chat` - Send and receive chat messages

- Events:
  - `/api/events` - List all events
  - `/api/events/rsvp/<int:id>` - RSVP for an event

## Contributing

If you'd like to contribute to this project, you can follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix: `git checkout -b feature/your-feature`
3. Make your changes and commit them.
4. Push your changes to your fork: `git push origin feature/your-feature`
5. Create a pull request on the original repository.

## License

This project is licensed under the MIT License.

