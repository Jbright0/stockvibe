# Frontend-Backend Integration Guide

This document explains how the StockVibe frontend (React Native/Expo) is integrated with the StockVibe backend (NestJS).

## Configuration

### API Base URL

The API base URL is configured in `src/config/api.ts`. By default, it uses:
- Development: `http://localhost:3000`
- Production: Update with your production URL

**Important Notes:**
- For iOS Simulator: Use `http://localhost:3000`
- For Android Emulator: Use `http://10.0.2.2:3000` (Android emulator maps localhost differently)
- For Physical Devices: Use your computer's IP address (e.g., `http://192.168.1.100:3000`)

To find your IP address:
- Windows: Run `ipconfig` and look for IPv4 Address
- Mac/Linux: Run `ifconfig` or `ip addr`

Update the `API_BASE_URL` in `src/config/api.ts` accordingly.

## Authentication

### Endpoints
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login with email and password

### Flow
1. User enters credentials in LoginScreen or RegisterScreen
2. Frontend calls `authService.login()` or `authService.register()`
3. Backend validates credentials and returns JWT token
4. Token is stored in AsyncStorage
5. Token is automatically included in all subsequent API requests via axios interceptor

### Token Storage
- Token is stored in AsyncStorage with key `auth_token`
- User data is stored with key `user_data`
- Token is automatically added to Authorization header for all API requests

## API Services

The frontend includes service modules for different API endpoints:

### Auth Service (`src/services/auth.service.ts`)
- `login(credentials)` - Login user
- `register(credentials)` - Register new user
- `logout()` - Clear token and user data
- `getToken()` - Get stored token
- `getUser()` - Get stored user data
- `isAuthenticated()` - Check if user is authenticated

### Articles Service (`src/services/articles.service.ts`)
- `getArticles(params)` - Get paginated articles
- `getLatest()` - Get latest articles
- `getByStock(symbol)` - Get articles for a stock
- `getBySector(sector)` - Get articles for a sector

### Insights Service (`src/services/insights.service.ts`)
- `getInsights(params)` - Get paginated insights
- `getArticleInsights(params)` - Get article insights
- `getAggregateInsights(params)` - Get aggregate insights

## Usage Example

```typescript
import { authService } from '../services/auth.service';
import { articlesService } from '../services/articles.service';

// Login
try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  console.log('Logged in:', response.user);
} catch (error) {
  console.error('Login failed:', error.message);
}

// Get articles
try {
  const data = await articlesService.getArticles({
    limit: 20,
    offset: 0
  });
  console.log('Articles:', data.articles);
} catch (error) {
  console.error('Failed to fetch articles:', error);
}
```

## Backend Setup

1. Make sure the backend is running on port 3000 (or update API_BASE_URL)
2. Backend CORS is enabled to allow requests from the frontend
3. JWT tokens expire after 7 days (configured in backend)

## Environment Variables

For production, consider using environment variables for the API URL. You can use libraries like `react-native-config` or `expo-constants` with `app.config.js`.

