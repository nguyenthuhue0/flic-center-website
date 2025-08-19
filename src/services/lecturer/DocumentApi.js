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