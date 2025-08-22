import { useEffect, useState } from "react";
import { getNewById } from "../../services/admin/news";
import { useParams } from "react-router-dom";

const NewDetail = () => {
    const [dataNew, setDataNew] = useState({})
      const { id } = useParams();
    useEffect(() => {
        fetchDataNew(id)
    }, [])
    const fetchDataNew = async (id) => {
        let res = await getNewById(id)
        if (res.success == true) {
            setDataNew(res.data)
        }
    }
  return (
    <div className="ml-[250px] min-h-screen bg-gradient-to-br from-[#eef2fb] to-[#f6f9ff] p-10 text-[#2B3674]">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl px-8 md:px-10 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E2B6A] flex flex-wrap items-center gap-2">
              Tin tức #{dataNew.id}
            </h2>
            <p className="text-gray-500 mt-1">Chi tiết tin tức theo bảng <b>news</b></p>
          </div>
        </div>

        {/* 3 summary tiles */}
        <div className="grid md:grid-cols-1">
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Tên tin tức</p>
            <p className="text-xl font-bold break-words">{dataNew.title || "—"}</p>
          </div>
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100 mt-6">
            <p className="text-sm text-gray-500 mb-1">Ảnh tin tức</p>
            <img src={dataNew.avatarUrl} alt="" className="h-100" />
          </div>
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100 mt-6">
            <p className="text-sm text-gray-500 mb-1">Nội dung tin tức</p>
                       <textarea
                    placeholder="Nội dung tin tức..."
                    value={dataNew.content}
                    className="border p-2 w-full mb-2 h-40"
                />
          </div>
          <div className="bg-[#F6F8FF] rounded-2xl p-5 border border-gray-100 mt-6">
            <p className="text-sm text-gray-500 mb-1">Ngày đăng tin tức</p>
            <p className="text-xl font-bold">{new Date(dataNew.publishedAt).toLocaleString() || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewDetail