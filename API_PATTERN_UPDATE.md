# API Pattern Update - Matching News API Pattern

## Overview
Đã cập nhật API calls cho document management để sử dụng pattern tương tự như News API, nhằm giải quyết vấn đề API không hoạt động.

## Changes Made

### 1. Created New DocumentApi Service (`src/services/lecturer/DocumentApi.js`)
```javascript
import instance from "../../utils/AxiosCustomize";

const getLessons = (courseId) => {
    return instance.get(`/lessons`, { 
        params: { courseId },
        skipAuth: true 
    })
    .then((response) => response.data)
    .catch((error) => {
        console.error('Error in getLessons:', error);
        throw error;
    });
}

const getLessonMaterials = (lessonId) => {
    return instance.get(`/lessons/materials`, { 
        params: { lessonId },
        skipAuth: true 
    })
    .then((response) => response.data)
    .catch((error) => {
        console.error('Error in getLessonMaterials:', error);
        throw error;
    });
}

const createLessonMaterial = (dto) => {
    return instance.post(`/lessons/create-materials`, dto, { skipAuth: true })
    .then((response) => response.data)
    .catch((error) => {
        console.error('Error in createLessonMaterial:', error);
        throw error;
    });
}

export {
    getLessons,
    getLessonMaterials,
    createLessonMaterial
}
```

### 2. Updated lessonApi.js
- Thêm `.then((response) => response.data)` để trả về data trực tiếp
- Thêm `.catch()` để handle errors
- Thêm `skipAuth: true` để test authentication

### 3. Updated Components

#### DocumentList.jsx
- Sử dụng `DocumentApi` trước, fallback về `lessonApi`
- Pattern: `getLessons(1).then().catch()`
- Tương tự như News component

#### DocumentDetail.jsx
- Sử dụng `DocumentApi` trước, fallback về `lessonApi`
- Pattern: `getLessonMaterials(lessonId).then().catch()`

#### DocumentUpload.jsx
- Sử dụng `DocumentApi` trước, fallback về `lessonApi`
- Pattern: `createLessonMaterial(dto).then().catch()`

### 4. Key Pattern Changes

#### Before (Async/Await):
```javascript
const fetchData = async () => {
  try {
    const response = await api.getData();
    setData(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

#### After (Promise Chain - News Pattern):
```javascript
const fetchData = () => {
  api.getData()
    .then((data) => {
      setData(data);
    })
    .catch((error) => {
      console.error(error);
    });
};
```

### 5. Authentication Changes
- Thêm `skipAuth: true` để test xem có phải vấn đề authentication không
- Tương tự như News API sử dụng `skipAuth: true`

## Expected Results

1. **API Calls**: Sẽ hoạt động tương tự như News API
2. **Error Handling**: Consistent error handling across all components
3. **Fallback**: Nếu DocumentApi không hoạt động, sẽ fallback về lessonApi
4. **Debug**: Console logs sẽ hiển thị chi tiết API calls và responses

## Testing

1. Mở browser console (F12)
2. Navigate to `http://localhost:5173/lecturer/documentlist`
3. Kiểm tra console logs để xem:
   - API calls được thực hiện
   - Responses từ server
   - Error messages nếu có

## Next Steps

1. **Test API Calls**: Xem console để kiểm tra API responses
2. **Verify Endpoints**: Đảm bảo backend có đúng endpoints
3. **Check Authentication**: Nếu cần, remove `skipAuth: true`
4. **Update Backend**: Nếu endpoints không tồn tại, cần tạo trong Spring Boot 