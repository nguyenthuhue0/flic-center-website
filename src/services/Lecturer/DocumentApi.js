import axios from "../../utils/AxiosCustomize";

const getLessonMaterials = (courseId) => {
    return axios.get(`/lesson/material?courseId=${courseId}`)
        .then((response) => {
            console.log('getLessonMaterials - Raw response:', response);
            return response;
        })
        .catch((error) => {
            console.error('Error in getLessonMaterials:', error);
            throw error;
        });
};

const uploadMaterial = (formData) => {
    return axios.post('/lesson/materials/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            console.log('uploadMaterial - Raw response:', response);
            return response;
        })
        .catch((error) => {
            console.error('Error in uploadMaterial:', error);
            throw error;
        });
};

const deleteMaterial = (materialId) => {
    return axios.delete(`/lesson/materials/${materialId}`)
        .then((response) => {
            console.log('deleteMaterial - Raw response:', response);
            return response;
        })
        .catch((error) => {
            console.error('Error in deleteMaterial:', error);
            throw error;
        });
};

const downloadMaterial = (materialId) => {
    return axios.get(`/lesson/materials/${materialId}/download`, {
        responseType: 'blob'
    })
        .then((response) => {
            console.log('downloadMaterial - Raw response:', response);
            return response;
        })
        .catch((error) => {
            console.error('Error in downloadMaterial:', error);
            throw error;
        });
};

export {
    getLessonMaterials,
    uploadMaterial,
    deleteMaterial,
    downloadMaterial
};
