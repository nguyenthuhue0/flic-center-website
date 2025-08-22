import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNew } from "../../services/admin/news";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const AddNew = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newImage, setNewImage] = useState("");
  const [datePublic, setDatePublic] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();
    setDatePublic(now.toISOString().slice(0, 19));
    let data = await postNew(title, content, datePublic, newImage);
    if (data.success == true) {
      toast.success(data.message);
      navigate("/admin/newManagement");
    }
  };
  const inputStyle =
    "w-full border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";
  const navigate = useNavigate();
  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-2 flex items-center">
          <span className="mr-2"></span> Thêm tin tức
        </h2>

        <p className="mb-4 text-gray-600">
          Nhập thông tin để thêm tin tức mới vào hệ thống.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
        >
          {/* Thông tin giảng viên */}
          <div className="grid grid-cols-1">
            <div>
              <label className="block font-medium mb-1">Tên tiêu đề</label>
              <input
                name="name"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Nhập tên tiêu đề"
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Ảnh tin tức</label>
              {/* Nút chọn tệp */}
              <label className="inline-block border rounded px-6 py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-blue-500">Thêm tệp</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    if (event.target.files.length > 0) {
                      const file = event.target.files[0];
                      const maxSize = 10 * 1024 * 1024; // 10MB

                      if (file.size > maxSize) {
                        alert("❌ File vượt quá dung lượng tối đa 10MB!");
                        event.target.value = ""; // reset input
                        return;
                      }

                      setNewImage(file);
                    }
                  }}
                  className="hidden"
                />
              </label>

              {/* Hiển thị thông tin file đã chọn */}
              {newImage && (
                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    📄 <strong>{newImage.name}</strong> (
                    {(newImage.size / 1024).toFixed(2)} KB)
                  </p>

                  {/* Nếu là ảnh thì preview */}
                  {newImage.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(newImage)}
                      alt="Preview"
                      className="mt-2 max-h-48 rounded border"
                    />
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Nội dung tin tức</label>
              <textarea
                placeholder="Nội dung tin tức..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 w-full mb-2 h-40"
              />
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("../newManagement")}
              className="btn-outline cursor-pointer"
            >
              <FaArrowLeft className="inline mr-1" /> Quay lại
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all cursor-pointer`}
            >
              <FaSave className="inline mr-1" /> {"Lưu tin tức"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddNew;
