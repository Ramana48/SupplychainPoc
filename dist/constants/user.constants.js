"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
}
exports.default = User;
User.MESSAGES = {
    REQUEST_LOGIN_TYPE: 'login',
    REQUEST_REGISTER_TYPE: 'register',
    REQUEST_REFRESH_TOKEN_TYPE: 'refreshtoken',
    AUTH_TYPE: 'DSILO-APPREGISTER',
    STATUS: 'active',
    REQUEST_USER_DETAILS: 'userdetails',
    REQUEST_USER_DETAIL_BY_EMAIL: 'userdetailbyemail',
    UPDATE_USER_DETAILS: 'update',
    REQUEST_FORGOT_PWD_TYPE: 'forgotpwd',
    REQUEST_LOGOUT_TYPE: 'logout',
    REQUEST_RESEND_VERIFICATION_TYPE: 'resendverificationemail',
    APP_ID_MISSING: 'App ID value is missing.',
    UNAUTHORIZED: 'Unauthorized',
    FULL_NAME_MISSING: 'Please enter full name',
    FULL_NAME_LENGTH: 'Full name should be between min of 3 and max of 20 chars',
    EMAIL_MISSING: 'Please enter email',
    EMAIL_CHECK: 'Please enter valid email',
    PASSWORD_MISSING: 'Please enter password',
    PASSWORD_LENGTH: 'Password should be between min of 8 and max of 30',
    PASSWORD_COMPLEXITY: 'Password should include a combination of the  following: Uppercase characters (A through Z), Lowercase characters (a through  z), 10 digits (0 through 9), Non-alphanumeric characters (e.g. $, #, %)',
    DISPLAYTITLE_MISSING: 'Display title value is missing.',
    NAVBARPOSITION_MISSING: 'Navbar position value is missing.',
    ORG_MISSING: 'Organization value missing',
    REQUEST_RESET_PWD_TYPE: 'resetpwd',
    PASSWORD_MISSING_RESET: 'Password value missing',
    CONFIRM_PASSWORD_MISSING: 'Confirm password value missing',
    ADMIN_EMAIL: 'support@dsilo.io',
    VERIFY_EMAIL_SUBJECT: 'Verify Email',
    RESET_PASSWORD_SUBJECT: 'Reset Password',
    ACCOUNT_ACTIVATION_SUBJECT: 'Account Activation',
    EVENT_USER_REGISTRATION: 'User Registration',
    EVENT_USER_LOGIN: 'User Login',
    EVENT_USER_LOGOUT: 'User Logout'
};
