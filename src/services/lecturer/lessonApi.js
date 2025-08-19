import instance from "../../utils/AxiosCustomize";

// Test API call to check backend connectivity
const testApi = () => {
    return instance.get(`/test`);
};

// Lấy danh sách courses (thử nghiệm)
const getCourses = () => {
    return instance.get(`/courses`, { skipAuth: true })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error in getCourses:', error);
            throw error;
        });
};

// Lấy danh sách courses với path khác (thử nghiệm)
const getCoursesAlt = () => {
    return instance.get(`/api/courses`, { skipAuth: true })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error in getCoursesAlt:', error);
            throw error;
        });
};

// Lấy danh sách bài học theo courseId
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
};

// Lấy danh sách bài học với path khác (thử nghiệm)
const getLessonsAlt = (courseId) => {
    return instance.get(`/api/lessons`, {
        params: { courseId },
        skipAuth: true
    })
    .then((response) => response.data)
    .catch((error) => {
        console.error('Error in getLessonsAlt:', error);
        throw error;
    });
};

// Lấy danh sách tài liệu của một lesson
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
};

// Tạo tài liệu mới cho lesson
const createLessonMaterial = (dto) => {
    return instance.post(`/lessons/create-materials`, dto)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error in createLessonMaterial:', error);
            throw error;
        });
};

const lessonApi = {
    testApi,
    getCourses,
    getCoursesAlt,
    getLessons,
    getLessonsAlt,
    getLessonMaterials,
    createLessonMaterial
};

export default lessonApi;
