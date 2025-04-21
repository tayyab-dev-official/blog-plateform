/**
 * Authentication module for Keshf LMS
 * Handles Google and Facebook authentication integration
 */

// Configuration
const AUTH_CONFIG = {
    google: {
        client_id: '123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com', // Replace with your actual Google client ID
        callback: 'handleGoogleSignIn'
    },
    facebook: {
        appId: '1234567890123456', // Replace with your actual Facebook App ID
        version: 'v16.0',
        permissions: 'email,public_profile'
    }
};

// Initialize both authentication providers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Sign-In if on the signup or login page
    if (document.getElementById('google-signin-container')) {
        initializeGoogleSignIn();
    }
    
    // Initialize Facebook Sign-In if on the signup or login page
    if (document.getElementById('facebook-signin-btn')) {
        initializeFacebookSignIn();
    }
});

/**
 * Initialize Google Sign-In
 */
function initializeGoogleSignIn() {
    // Create Google Sign-In button
    google.accounts.id.initialize({
        client_id: AUTH_CONFIG.google.client_id,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true,
    });
    
    // Render the Google Sign-In button
    google.accounts.id.renderButton(
        document.getElementById('google-signin-container'), {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'center',
            width: document.getElementById('google-signin-container').offsetWidth,
        }
    );
    
    // Show the One Tap UI if enabled
    // google.accounts.id.prompt();
}

/**
 * Handle Google Sign-In response
 */
function handleGoogleSignIn(response) {
    // Get JWT token from response
    const token = response.credential;
    
    // Parse JWT token to get user information
    const payload = parseJwt(token);
    
    // Extract user data
    const userData = {
        provider: 'google',
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        firstName: payload.given_name,
        lastName: payload.family_name,
        profilePicture: payload.picture,
        token: token
    };
    
    // Save user data to localStorage or session
    saveUserData(userData);
    
    // Redirect to dashboard or show success message
    showAuthSuccess(userData);
}

/**
 * Initialize Facebook Sign-In
 */
function initializeFacebookSignIn() {
    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
        FB.init({
            appId: AUTH_CONFIG.facebook.appId,
            cookie: true,
            xfbml: true,
            version: AUTH_CONFIG.facebook.version
        });
        
        // Add click event to the Facebook sign-in button
        document.getElementById('facebook-signin-btn').addEventListener('click', function(event) {
            event.preventDefault();
            facebookLogin();
        });
    };
}

/**
 * Handle Facebook Login
 */
function facebookLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            // Get user data from Facebook
            FB.api('/me', {fields: 'id,name,email,first_name,last_name,picture'}, function(userData) {
                const authData = {
                    provider: 'facebook',
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    profilePicture: userData.picture?.data?.url,
                    token: response.authResponse.accessToken
                };
                
                // Save user data
                saveUserData(authData);
                
                // Redirect or show success
                showAuthSuccess(authData);
            });
        } else {
            // User cancelled login or did not fully authorize
            showError('Facebook login was cancelled or failed.');
        }
    }, {scope: AUTH_CONFIG.facebook.permissions});
}

/**
 * Helper function to parse JWT token
 */
function parseJwt(token) {
    try {
        // Get the payload part of the JWT
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT token:', error);
        return {};
    }
}

/**
 * Save user data to localStorage
 */
function saveUserData(userData) {
    localStorage.setItem('keshfUser', JSON.stringify(userData));
}

/**
 * Show authentication success message or redirect
 */
function showAuthSuccess(userData) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'alert alert-success auth-success-alert';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="me-3">
                <img src="${userData.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name)}" 
                     alt="Profile" class="rounded-circle" width="40" height="40">
            </div>
            <div>
                <h5 class="mb-0">Welcome, ${userData.firstName}!</h5>
                <p class="mb-0">Successfully signed in with ${userData.provider}.</p>
            </div>
        </div>
    `;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Redirect after a short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

/**
 * Show error message
 */
function showError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'alert alert-danger auth-error-alert';
    errorContainer.textContent = message;
    
    // Add to page
    document.body.appendChild(errorContainer);
    
    // Animate
    setTimeout(() => {
        errorContainer.style.transform = 'translateY(0)';
        errorContainer.style.opacity = '1';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        errorContainer.style.transform = 'translateY(20px)';
        errorContainer.style.opacity = '0';
        setTimeout(() => {
            errorContainer.remove();
        }, 300);
    }, 5000);
}

// Add CSS styles for the alerts
document.addEventListener('DOMContentLoaded', function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .auth-success-alert,
        .auth-error-alert {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .auth-success-alert {
            background-color: #d4edda;
            border-color: #c3e6cb;
        }
    `;
    document.head.appendChild(styleElement);
});