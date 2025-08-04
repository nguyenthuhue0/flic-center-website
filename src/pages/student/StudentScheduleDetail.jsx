const StudentScheduleDetail = () => {
  const schedulesToday = [
    {
      id: 1,
      className: 'Lập trình Java',
      session: 'Thứ 2-4-6',
      time: '9:00 - 11:30',
      location: 'KE.103',
      teacher: 'Nguyễn Văn A',
    },
    {
      id: 2,
      className: 'Cấu trúc dữ liệu',
      session: 'Thứ 3-5',
      time: '13:00 - 15:30',
      location: 'B1.201',
      teacher: 'Trần Thị B',
    },
    {
      id: 2,
      className: 'Cấu trúc dữ liệu',
      session: 'Thứ 3-5',
      time: '13:00 - 15:30',
      location: 'B1.201',
      teacher: 'Trần Thị B',
    },
    {
      id: 2,
      className: 'Cấu trúc dữ liệu',
      session: 'Thứ 3-5',
      time: '13:00 - 15:30',
      location: 'B1.201',
      teacher: 'Trần Thị B',
    },
    // Thêm dòng khác nếu muốn kiểm tra scroll
  ];

  const upcomingSchedules = [
    {
      id: 1,
      className: 'Lập trình Java',
      session: 'Thứ 2-4-6',
      time: '9:00 - 11:30',
      location: 'KE.103',
      teacher: 'Nguyễn Văn A',
    },
    {
      id: 2,
      className: 'Cấu trúc dữ liệu',
      session: 'Thứ 3-5',
      time: '13:00 - 15:30',
      location: 'B1.201',
      teacher: 'Trần Thị B',
    },
  ];

  const renderTable = (title, color, data) => (
    <div className=" rounded mb-6">
      <div className={`text-white font-semibold px-7 py-4 ${color} text-lg mb-5`}>
        {title}
      </div>
      <div className="overflow-y-auto max-h-60">
        <table className="w-full text-md table-auto">
          <thead className="bg-red-600 text-white mb-3">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left">Tên lớp</th>
              <th className="px-4 py-2 text-left">Suất học</th>
              <th className="px-4 py-2 text-left">Thời gian</th>
              <th className="px-4 py-2 text-left">Địa điểm</th>
              <th className="px-4 py-2 text-left">Giáo viên</th>
              <th className="px-4 py-2 text-left">Lịch trình môn học</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md mt-3">
            {data.map((item, index) => (
              <tr key={item.id} className="border-yellow-200 border">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.className}</td>
                <td className="px-4 py-2">{item.session}</td>
                <td className="px-4 py-2">{item.time}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">{item.teacher}</td>
                <td className="px-4 py-2">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer">
                    Xem lịch trình
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {renderTable('Lịch học ngày hôm nay', 'bg-blue-600', schedulesToday)}
      {renderTable('Lịch học ngày sắp tới', 'bg-orange-500', upcomingSchedules)}
    </div>
  );
};
export default StudentScheduleDetail;