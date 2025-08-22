import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNewById, putNewById } from "../../services/admin/news";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const EditNew = () => {
  const { id } = useParams();
  const inputStyle =
    "w-full border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 text-[16px] p-3 rounded-xl shadow-sm transition-all duration-200 outline-none";
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newImage, setNewImage] = useState("");
  const [dataNew, setDataNew] = useState({});
  const [publishedAt, setPublishedAt] = useState("");

  useEffect(() => {
    fetchDataNew(id);
  }, [id]);

  const fetchDataNew = async (id) => {
    let res = await getNewById(id);
    setDataNew(res.data);
  };

  useEffect(() => {
    if (dataNew) {
      setTitle(dataNew.title || "");
      setContent(dataNew.content || "");
      setNewImage(dataNew.avatarUrl || "");
      if (dataNew.publishedAt) {
        const iso = new Date(dataNew.publishedAt).toISOString().slice(0, 19);
        setPublishedAt(iso);
      }
    }
  }, [dataNew]);

  const handleSave = async (e) => {
    e.preventDefault();

    let data = await putNewById(id, title, content, publishedAt);
    if (data.success == true) {
      toast.success(data.message);
      navigate("/admin/newManagement");
    }
  };

  return (
    <div className="p-6 flex justify-center ml-[250px]">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-2 flex items-center">
          <span className="mr-2"></span> Chỉnh sửa tin tức
        </h2>

        <p className="mb-4 text-gray-600">
          Nhập thông tin để chỉnh sửa tin tức trong hệ thống.
        </p>

        <form
          onSubmit={handleSave}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
        >
          <div className="grid grid-cols-1">
            {/* Tiêu đề */}
            <div>
              <label className="block font-medium mb-1">Tên tiêu đề</label>
              <input
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Nhập tên tiêu đề"
                className={inputStyle}
                required
              />
            </div>

            {/* Ảnh */}
            <div>
              <label className="block font-medium mb-1">Ảnh tin tức</label>

              {/* Hiển thị ảnh */}
              {newImage &&
                (typeof newImage === "string" ? (
                  <div className="mt-2">
                    <img
                      src={newImage}
                      alt="Ảnh tin tức"
                      className="max-h-48 rounded border"
                    />
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-gray-700">
                    <p>
                      📄 <strong>{newImage.name}</strong> (
                      {(newImage.size / 1024).toFixed(2)} KB)
                    </p>
                    {newImage.type.startsWith("image/") && (
                      <img
                        src={URL.createObjectURL(newImage)}
                        alt="Preview"
                        className="mt-2 max-h-48 rounded border"
                      />
                    )}
                  </div>
                ))}
            </div>

            {/* Nội dung */}
            <div>
              <label className="block font-medium mb-1">Nội dung tin tức</label>
              <textarea
                placeholder="Nội dung tin tức..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 w-full mb-2 h-40"
              />
            </div>

            {/* Ngày xuất bản */}
            <div>
              <label className="block font-medium mb-1">Ngày xuất bản</label>
              <input
                type="datetime-local"
                value={publishedAt}
                readOnly
                onChange={(e) => setPublishedAt(e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>

          {/* Nút */}
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <FaSave className="inline mr-1" /> Lưu tin tức
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNew;
