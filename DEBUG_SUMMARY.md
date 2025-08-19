# Debug Summary - API Integration Issue

## Problem Description
The user reported that when accessing `http://localhost:5173/lecturer/documentlist`, the page shows a blank white area instead of displaying the document list. The API is returning user data instead of lesson/course data.

## Root Cause Analysis
Based on the user's feedback that the API returns:
```json
{
    "id": 11,
    "email": "lanh@gmail.com",
    "fullName": "thuy lanh",
    "role": "instructor",
    // ... user data
}
```

This suggests that:
1. The API endpoint `/lessons` might not exist
2. There might be a redirect to a user profile endpoint
3. The authentication might be working but the wrong endpoint is being called

## Debugging Steps Taken

### 1. Fixed Import Issue
- **Problem**: `lessonApi.js` was importing `axios` instead of the custom `instance`
- **Solution**: Changed import to use `instance` from `AxiosCustomize.js`

### 2. Added Comprehensive Debugging
- Created `debugApi.js` utility to test multiple endpoints
- Added debug logging to track API calls and responses
- Added debug UI section to show API status in real-time

### 3. Tested Multiple Endpoints
- `/lessons` - Original endpoint
- `/courses` - Alternative endpoint
- `/api/lessons` - Alternative path
- `/api/courses` - Alternative path
- `/user/profile` - Authentication test

### 4. Added Fallback Data
- Created sample data to ensure UI works even if API fails
- Added proper error handling with fallback to sample data

### 5. Enhanced Error Handling
- Added detailed console logging
- Added visual debug information in UI
- Added proper try-catch blocks for each endpoint

## Current Status
The application now:
- ✅ Shows debug information in the UI
- ✅ Uses sample data as fallback
- ✅ Tests multiple API endpoints
- ✅ Provides detailed error logging
- ✅ Has proper authentication handling

## Next Steps
1. **Check Browser Console**: Open browser dev tools and check the console for debug output
2. **Verify Backend**: Ensure the Spring Boot backend has the correct endpoints
3. **Check Authentication**: Verify that the user has the correct role (`INSTRUCTOR`)
4. **Test Endpoints**: Use the debug information to see which endpoints work

## Expected API Endpoints
Based on the Spring Boot controller provided:
- `GET /lessons?courseId={courseId}` - Get lessons by course ID
- `GET /lessons/materials?lessonId={lessonId}` - Get materials for lesson
- `POST /lessons/create-materials` - Create new material

## Debug Information Display
The UI now shows:
- ✅/❌ Token presence
- ✅/❌ Connection status
- ✅/❌ Authentication status
- ✅/❌ Courses API status
- ✅/❌ Lessons API status
- 📋/🌐 Data source (Sample vs API)

## How to Use
1. Navigate to `http://localhost:5173/lecturer/documentlist`
2. Check the yellow debug section at the top
3. Open browser console (F12) to see detailed logs
4. Use the debug information to identify which API endpoints work
5. Contact backend team if all endpoints fail 