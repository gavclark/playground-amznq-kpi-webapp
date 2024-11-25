import { Auth } from 'aws-amplify';

export interface SignUpParams {
  username: string;
  password: string;
  email: string;
  phone_number?: string;
}

export interface SignInParams {
  username: string;
  password: string;
}

export async function getCurrentUser() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      username: user.username,
      attributes: user.attributes,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function signUp({ username, password, email, phone_number }: SignUpParams) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        ...(phone_number && { phone_number }),
      },
    });
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function confirmSignUp(username: string, code: string) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.error('Error confirming sign up:', error);
    throw error;
  }
}

export async function resendConfirmationCode(username: string) {
  try {
    await Auth.resendSignUp(username);
  } catch (error) {
    console.error('Error resending confirmation code:', error);
    throw error;
  }
}

export async function signIn({ username, password }: SignInParams) {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function forgotPassword(username: string) {
  try {
    await Auth.forgotPassword(username);
  } catch (error) {
    console.error('Error initiating password reset:', error);
    throw error;
  }
}

export async function forgotPasswordSubmit(username: string, code: string, newPassword: string) {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword);
  } catch (error) {
    console.error('Error completing password reset:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}