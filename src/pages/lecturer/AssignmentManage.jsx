import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAssignmentByLessonId } from "../../services/Student/Course";
import { FaArrowLeft } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";

const AssignmentManage = () => {
    const { id } = useParams();
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");
  
    const [tableData, setTableData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
      fetchDataAssignment()
    }, [])
    const fetchDataAssignment = async () => {
      let data = await getAssignmentByLessonId(id);
      if(data){
        setTableData(data)
      }
    }
    return (
    <div className="rounded mb-6">
      <div className={`text-blue-600 font-semibold px-7 py-4 text-3xl mb-5 text-center`}>
        Danh sách bài tập Buổi {id}
      </div>
      <div className="overflow-y-auto max-h-60">
                <div className="flex justify-between mt-6 mb-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/lecturer/learningpathlist/${courseId}`)}
                      className="btn-outline cursor-pointer bg-gray-300 p-3 hover:bg-gray-200 rounded-lg"
                    >
                      <FaArrowLeft className="inline mr-1" /> Quay lại
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/lecturer/lesson/${id}/assign`)}
                      className="btn-outline cursor-pointer bg-blue-700 p-3 hover:bg-blue-600 rounded-lg text-white"
                    >
                      <MdAssignment className="inline mr-1" /> Tạo mới bài tập
                    </button>
                  </div>
        <table className="w-full text-md table-auto border-yellow-200 border">
          <thead className="bg-red-600 text-white mb-3">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left">Tên bài tập</th>
              <th className="px-4 py-2 text-left">Đề bài tập</th>
              <th className="px-4 py-2 text-left">Hạn nộp</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md mt-3">
            {tableData.length === 0 ? (
              <tr>
                <td
                  className="text-center text-blue-700 p-4 text-lg"
                  colSpan={7}
                >
                  Không có bài tập
                </td>
              </tr>
            ) : (
              tableData.map((item) => (
                <tr key={item.id} className="border-yellow-200 border">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2"><a href={item.fileUrl} className="underline hover:text-blue-500">Link</a></td>
                  <td className="px-4 py-2">
                    {new Date(item.dueDate).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
    )
}
export default AssignmentManage