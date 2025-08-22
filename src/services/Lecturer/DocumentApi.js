import api from "../../utils/AxiosCustomize";

const getLessonMaterials = (courseId) => {
    return api.get(`/lesson/material?courseId=${courseId}`)
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
    console.log('uploadMaterial - Starting upload with formData:', {
        title: formData.get("title"),
        type: formData.get("type"),
        courseId: formData.get("courseId"),
        file: formData.get("file")?.name
    });

    // Kiểm tra token trước khi gửi request
    const token = sessionStorage.getItem("access_token");
    console.log("uploadMaterial - Token check:", {
        hasToken: !!token,
        tokenLength: token?.length,
        tokenStart: token?.substring(0, 20) + "..."
    });

    if (!token) {
        console.error("uploadMaterial - No token found!");
        return Promise.reject(new Error("No access token found"));
    }

    // Kiểm tra JWT format và role
    try {
        const parts = token.split('.');
        if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            const now = Math.floor(Date.now() / 1000);
            console.log("uploadMaterial - JWT info:", {
                role: payload.role,
                userId: payload.sub || payload.userId,
                issuedAt: new Date(payload.iat * 1000),
                expiresAt: new Date(payload.exp * 1000),
                isExpired: payload.exp < now,
                timeLeft: Math.floor((payload.exp - now) / 60) + " minutes"
            });
            
            if (payload.exp < now) {
                console.error("uploadMaterial - Token expired!");
                return Promise.reject(new Error("Access token expired"));
            }

            if (payload.role !== "INSTRUCTOR" && payload.role !== "ADMIN") {
                console.error("uploadMaterial - Insufficient role:", payload.role);
                return Promise.reject(new Error("Insufficient role. Only INSTRUCTOR can upload materials."));
            }
        }
    } catch (e) {
        console.error("uploadMaterial - Token decode error:", e);
    }

    // Backend yêu cầu: data (JSON string) và file (MultipartFile)
    return api.post('/lesson/create-materials', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        console.log('uploadMaterial - Upload successful:', response);
        return response;
    })
    .catch((error) => {
        console.error('uploadMaterial - Upload failed:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message,
            headers: error.response?.headers,
            config: {
                url: error.config?.url,
                method: error.config?.method,
                headers: error.config?.headers
            }
        });
        throw error;
    });
};

const deleteMaterial = (materialId) => {
    return api.delete(`/lesson/materials/${materialId}`)
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
    return api.get(`/lesson/materials/${materialId}/download`, {
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
