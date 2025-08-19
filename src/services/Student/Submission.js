import axios from "../../utils/AxiosCustomize";

const getAssignmentDetailByAssignmentId  =  (id) => {
    return axios.get(`/assignments`, 
        {
    params: { assignmentId: id }
  });
}

const uploadFile = (id, file) => {
  const formData = new FormData();
  formData.append("assignmentId", id);
  formData.append("file", file);     

  return axios.post("/submissions/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
const postSubmit  = (id, file ) => {
    return axios.post("/submissions", {
        assignmentId: id,
        fileUrl: file
    })
}
export {
    getAssignmentDetailByAssignmentId,
    uploadFile,
    postSubmit
}