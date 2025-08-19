# API Integration Summary for Document Management Components

## Overview
This document describes the API integration for three React components that handle document management in the FLIC Center website:
- `DocumentList.jsx` - Displays list of lessons/courses
- `DocumentDetail.jsx` - Shows materials for a specific lesson
- `DocumentUpload.jsx` - Uploads new materials to a lesson

## Backend API Endpoints

Based on the Spring Boot controller provided, the following endpoints are used:

### 1. Get Lessons by Course ID
```java
@GetMapping()
public ResponseEntity<?> getLessonByCourseId(@RequestParam Long courseId)
```
- **URL**: `GET /lessons?courseId={courseId}`
- **Purpose**: Retrieves all lessons for a specific course
- **Response**: `List<LessonViewDTO>`

### 2. Get Lesson Materials
```java
@GetMapping("/materials")
public ResponseEntity<?> getLessonMaterials(@RequestParam Long lessonId)
```
- **URL**: `GET /lessons/materials?lessonId={lessonId}`
- **Purpose**: Retrieves all materials for a specific lesson
- **Response**: `List<LessonMaterialViewDTO>`

### 3. Create Lesson Material
```java
@PostMapping("/create-materials")
public ResponseEntity<?> createMaterial(@RequestBody LessonMaterialCreateDTO dto)
```
- **URL**: `POST /lessons/create-materials`
- **Purpose**: Creates a new material for a lesson
- **Request Body**: `LessonMaterialCreateDTO`
- **Response**: `LessonMaterial`

## Frontend API Service (`src/services/lecturer/lessonApi.js`)

```javascript
import axios from "../../utils/AxiosCustomize";

// Get lessons by course ID
const getLessons = (courseId) => {
    return axios.get(`/lessons`, {
        params: { courseId }
    });
};

// Get materials for a specific lesson
const getLessonMaterials = (lessonId) => {
    return axios.get(`/lessons/materials`, {
        params: { lessonId }
    });
};

// Create new lesson material
const createLessonMaterial = (dto) => {
    return axios.post(`/lessons/create-materials`, dto);
};

const lessonApi = {
    getLessons,
    getLessonMaterials,
    createLessonMaterial
};

export default lessonApi;
```

## Component Integration

### 1. DocumentList.jsx

**Purpose**: Displays a paginated list of lessons/courses

**API Usage**:
```javascript
useEffect(() => {
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await lessonApi.getLessons(); // or lessonApi.getLessons(courseId)
      setCourses(response.data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setCourses([]);
    }
    setLoading(false);
  };
  fetchCourses();
}, []);
```

**Data Flow**:
1. Component mounts → calls `getLessons()` API
2. API returns `List<LessonViewDTO>` → stored in `courses` state
3. Data is paginated and displayed in grid layout
4. Clicking "Chi tiết" navigates to DocumentDetail with `lessonId`

### 2. DocumentDetail.jsx

**Purpose**: Shows materials for a specific lesson with filtering and sorting

**API Usage**:
```javascript
useEffect(() => {
  if (!lessonId) return;
  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await lessonApi.getLessonMaterials(lessonId);
      setMaterials(response.data || []);
    } catch (e) {
      console.error("Error fetching materials:", e);
      setMaterials([]);
    }
    setLoading(false);
  };
  fetchMaterials();
}, [lessonId]);
```

**Data Flow**:
1. Receives `lessonId` from navigation state
2. Calls `getLessonMaterials(lessonId)` API
3. API returns `List<LessonMaterialViewDTO>` → stored in `materials` state
4. Materials are filtered by semester and sorted by various fields
5. Each material shows type, title, update date, size, status, and action buttons

### 3. DocumentUpload.jsx

**Purpose**: Uploads new materials to a lesson

**API Usage**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!lessonId) {
    setMessage("Thiếu lessonId");
    return;
  }

  const dto = {
    lessonId: lessonId,
    title: title,
    description: subtitle,
    type: category,
    subType: subCategory,
    topic: topic,
  };

  try {
    const response = await lessonApi.createLessonMaterial(dto);
    setMessage("Tải lên thành công!");
    // Reset form fields
    if (onUploadSuccess) onUploadSuccess();
  } catch (e) {
    console.error("Error creating material:", e);
    setMessage("Tải lên thất bại!");
  }
};
```

**Data Flow**:
1. User fills form with material details
2. Form submission creates `LessonMaterialCreateDTO` object
3. Calls `createLessonMaterial(dto)` API
4. On success: shows success message, resets form, calls `onUploadSuccess` callback
5. On error: shows error message

## Data Structures

### Expected API Response Formats

**LessonViewDTO** (for DocumentList):
```javascript
{
  id: number,
  title: string,
  name: string,
  instructor: string,
  teacherName: string,
  image: string,
  // ... other fields
}
```

**LessonMaterialViewDTO** (for DocumentDetail):
```javascript
{
  id: number,
  title: string,
  type: string, // "Giáo trình", "Slide", "Đề cương", etc.
  status: string, // "Có sẵn", "Đang cập nhật"
  updateDate: string,
  size: string,
  semester: string, // "01", "02", "03", "04"
  link: string, // for Google Meet materials
  // ... other fields
}
```

**LessonMaterialCreateDTO** (for DocumentUpload):
```javascript
{
  lessonId: number,
  title: string,
  description: string,
  type: string,
  subType: string,
  topic: string,
  // ... other fields as needed
}
```

## Error Handling

All components include proper error handling:
- API errors are caught and logged to console
- User-friendly error messages are displayed
- Loading states are managed appropriately
- Fallback data (empty arrays) are provided when APIs fail

## Authentication

The API calls use the custom axios instance (`AxiosCustomize.js`) which:
- Automatically includes Bearer token from sessionStorage
- Handles authentication headers
- Provides consistent error handling
- Uses base URL: `http://localhost:8080/api`

## Security

All endpoints require `INSTRUCTOR` role as specified by `@PreAuthorize("hasRole('INSTRUCTOR')")` annotations in the Spring Boot controller. 