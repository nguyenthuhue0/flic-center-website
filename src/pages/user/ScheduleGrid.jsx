export default function ScheduleGrid() {
  const days = [
    "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"
  ];

  return (
    <div className="p-4">
      {/* Header: các thứ trong tuần */}
      <div className="grid grid-cols-7 border border-black text-center font-semibold w-[1016px] h-[46px]">
        {days.map((day, index) => (
          <div key={index} className="p-2 border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Khung nội dung */}
      <div className="border border-pink-200 w-[1016px] h-[500px] grid grid-cols-7 relative mt-1">
        {/* Dòng lưới ngang */}
        {Array(8).fill(0).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="absolute left-0 w-full border-t border-gray-200"
            style={{ top: `${(rowIdx + 1) * 60}px` }}
          />
        ))}

        {/* Các khối màu tương ứng với thứ học */}
        {/* Thứ 3 */}
        <div className="absolute top-[60px] left-[14.2857%] w-[14.2857%] h-[80px] bg-red-300 rounded" />

        {/* Thứ 5 */}
        <div className="absolute top-[0px] left-[57.1428%] w-[14.2857%] h-[80px] bg-yellow-200 rounded" />

        {/* Thứ 6 */}
        <div className="absolute top-[120px] left-[71.4285%] w-[14.2857%] h-[80px] bg-blue-500 rounded" />
      </div>
    </div>
  );
}
