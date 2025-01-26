# kyc

This project is the backend for a simplified KYC (Know Your Customer) system, built with Express js, MongoDb, TypeScript . It allows users to register, submit KYC details, and view their status, while admins can manage KYC submissions and approve or reject kyc status , and view report.

## Features

-   User authentication and role-based access (Admin/User).
-   KYC submission form with file upload.
-   Admin managing user submissions and status updates.
-   admin report display ( total users, pending/ approved/rejected submissions).

## Trade off

### Simple Admin Registration :

- Approach: For demo purposes, a basic admin user create with roles to simplify the setup.
- Future Enhancement: Implement a scalable role base access contorl system, allowing the system admin to dynamically assign roles and permissions securely.
  
### Token Expiry and Logout :

-   When a user's token expires, they are logged out immediately and must log in again.
-   Future Enhancement: To improve the user experience, consider implementing a refresh token.
### 
### Document Upload

-   User can upload only one document for KYC submission.
-   Future Plan users can specify the document type (Passport, ID, Driver’s License) during upload.

## Assumptions

### Status Updates :

-   Assumption: Once an admin approves or rejects a KYC submission, the status cannot be updated.

-   Reason: To ensure accuracy and integrity, once a decision is made, the status remains final.

## Project Setup

### Clone the repository

```sh
git clone https://github.com/armia-roma/kyc-backend.git
```

```sh
cd kyc-backend
```

### Install Dependencies

```sh
npm install
```

### Create Upload Folder

```sh
mkdir uploads
```

### Run Development

```sh
npm run dev
```
