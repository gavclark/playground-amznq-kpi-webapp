# AWS Cognito Integration Guide

This documentation explains how to use the authentication utilities provided for AWS Cognito integration.

## Available Functions

### Sign Up
```typescript
signUp({ username, password, email, phone_number? }: SignUpParams)
```
Creates a new user account. Phone number is optional.

### Confirm Sign Up
```typescript
confirmSignUp(username: string, code: string)
```
Confirms a new user account using the verification code sent to their email.

### Resend Confirmation Code
```typescript
resendConfirmationCode(username: string)
```
Resends the verification code if the original expires or is lost.

### Sign In
```typescript
signIn({ username, password }: SignInParams)
```
Authenticates an existing user and creates a session.

### Password Reset
```typescript
forgotPassword(username: string)
```
Initiates the password reset process by sending a reset code.

```typescript
forgotPasswordSubmit(username: string, code: string, newPassword: string)
```
Completes the password reset process using the reset code.

### Current User
```typescript
getCurrentUser()
```
Retrieves the currently authenticated user's information.

### Sign Out
```typescript
signOut()
```
Ends the current user session.

## Error Handling
All functions include error handling and will throw errors with appropriate messages that can be caught and handled by the calling code.