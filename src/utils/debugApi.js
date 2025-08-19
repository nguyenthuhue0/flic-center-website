import instance from "./AxiosCustomize";

export const debugApi = {
  // Test basic connectivity
  testConnection: async () => {
    try {
      console.log("Testing API connection...");
      const response = await instance.get("/");
      console.log("Root endpoint response:", response);
      return response;
    } catch (error) {
      console.error("Connection test failed:", error);
      return null;
    }
  },

  // Test authentication
  testAuth: async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      console.log("Current token:", token);
      
      if (!token) {
        console.log("No token found");
        return null;
      }

      // Test with a simple endpoint
      const response = await instance.get("/user/profile");
      console.log("Auth test response:", response);
      return response;
    } catch (error) {
      console.error("Auth test failed:", error);
      return null;
    }
  },

  // Test courses endpoint
  testCourses: async () => {
    try {
      console.log("Testing courses endpoint");
      const response = await instance.get("/courses", { skipAuth: true });
      console.log("Courses response:", response);
      return response;
    } catch (error) {
      console.error("Courses test failed:", error);
      return null;
    }
  },

  // Test alternative courses endpoint
  testCoursesAlt: async () => {
    try {
      console.log("Testing alternative courses endpoint");
      const response = await instance.get("/api/courses", { skipAuth: true });
      console.log("Alternative courses response:", response);
      return response;
    } catch (error) {
      console.error("Alternative courses test failed:", error);
      return null;
    }
  },

  // Test lessons endpoint
  testLessons: async (courseId = 1) => {
    try {
      console.log("Testing lessons endpoint with courseId:", courseId);
      const response = await instance.get("/lessons", {
        params: { courseId },
        skipAuth: true
      });
      console.log("Lessons response:", response);
      return response;
    } catch (error) {
      console.error("Lessons test failed:", error);
      return null;
    }
  },

  // Test alternative lessons endpoint
  testLessonsAlt: async (courseId = 1) => {
    try {
      console.log("Testing alternative lessons endpoint with courseId:", courseId);
      const response = await instance.get("/api/lessons", {
        params: { courseId },
        skipAuth: true
      });
      console.log("Alternative lessons response:", response);
      return response;
    } catch (error) {
      console.error("Alternative lessons test failed:", error);
      return null;
    }
  }
}; 