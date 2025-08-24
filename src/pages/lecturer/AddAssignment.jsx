import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAssignment from "../../services/Lecturer/assignment";
import { toast } from "react-toastify";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const AddAssignment = () => {
const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [dateDue, setDateDue] = useState("");
    const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = await createAssignment(id, title, description, dateDue, fileUrl);    
    if (data) {
      toast.success("Tạo mới bài tập thành công");
      navigate("/lecturer");
    }
  };
  const inputStyle =
    "w-full border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none mb-3";
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-2 flex items-center">
          <span className="mr-2"></span> Thêm bài tập vào Buổi {id}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
        >
          {/* Thông tin giảng viên */}
          <div className="grid grid-cols-1">
            <div>
              <label className="block font-medium mb-2">Tên bài tập</label>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Tên bài tập"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Mô tả nội dung bài tập</label>
                  <textarea
                placeholder="Nội dung tin tức..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full mb-2 h-40"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Hạn nộp bài tập</label>
              <input
                type="datetime-local"
                name="dateDue"
                onChange={(e) => setDateDue(e.target.value)}
                value={dateDue}
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Link nội dung bài tập</label>
              <input
                type="text"
                name="fileUrl"
                onChange={(e) => setFileUrl(e.target.value)}
                value={fileUrl}
                placeholder="Link url google drive"
                className={inputStyle}
                required
              />
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate(`/lecturer/lesson/${id}`)}
              className="btn-outline cursor-pointer"
            >
              <FaArrowLeft className="inline mr-1" /> Quay lại
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all cursor-pointer`}
            >
              <FaSave className="inline mr-1" /> {"Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddAssignment;