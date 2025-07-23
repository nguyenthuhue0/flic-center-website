"use client"

import { useState } from "react"

export default function Schedule() {
    const [activeTab, setActiveTab] = useState("TOEIC Listening & Reading")
    const [filters, setFilters] = useState({
        examType: "",
        time: "",
        format: "",
        location: "",
    })

    const tabs = ["TOEIC Listening & Reading", "TOEIC Speaking & Writing", "MOS", "VSTEP"]

    const examData = {
        "TOEIC Listening & Reading": [
            {
                id: 1,
                time: "8:00",
                date: "27-7-2025",
                format: "Thi máy",
                location: "IIG",
                fee: "1.500.000 VND",
                deadline: "16-7-2025",
            },
            {
                id: 2,
                time: "8:00",
                date: "29-7-2025",
                format: "Thi giấy",
                location: "IIG",
                fee: "1.500.000 VND",
                deadline: "16-7-2025",
            },
        ],
        "TOEIC Speaking & Writing": [],
        MOS: [],
        VSTEP: [],
    }

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }))
    }

    const handleSearch = () => {
        console.log("Searching with filters:", filters)
    }

    const handleRegister = (examId) => {
        console.log("Registering for exam:", examId)
        let url = ""

        if (activeTab === "TOEIC Listening & Reading") {
            url = "https://docs.google.com/forms/d/e/1FAIpQLSfdV5JUQC6GIte15B7xEt3gsEUeZ6Bc917qVnvETBYcNP02oA/viewform"
        } else if (activeTab === "MOS") {
            url = "https://forms.gle/mos_link"
        } else {
            url = "https://forms.gle/default_form"
        }

        window.open(url, "_blank")
    }
    const handleRegisterReview = () => {
        const mosFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfdV5JUQC6GIte15B7xEt3gsEUeZ6Bc917qVnvETBYcNP02oA/viewform";
        window.open(mosFormUrl, "_blank");
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-blue-600">Lịch thi</h1>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    {/* Filter components (giữ nguyên) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bài thi</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.examType}
                            onChange={(e) => handleFilterChange("examType", e.target.value)}
                        >
                            <option value="">Chọn bài thi</option>
                            <option value="toeic">TOEIC</option>
                            <option value="mos">MOS</option>
                            <option value="vstep">VSTEP</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.time}
                            onChange={(e) => handleFilterChange("time", e.target.value)}
                        >
                            <option value="">Chọn thời gian</option>
                            <option value="july">Tháng 7</option>
                            <option value="august">Tháng 8</option>
                            <option value="september">Tháng 9</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hình thức thi</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.format}
                            onChange={(e) => handleFilterChange("format", e.target.value)}
                        >
                            <option value="">Chọn hình thức</option>
                            <option value="computer">Thi máy</option>
                            <option value="paper">Thi giấy</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={filters.location}
                            onChange={(e) => handleFilterChange("location", e.target.value)}
                        >
                            <option value="">Chọn địa điểm</option>
                            <option value="iig">IIG</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-md transition-colors flex items-center justify-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Tabs */}
                    <div className="mb-6">
                        <div className="flex flex-wrap border-b border-gray-200">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                                            ? "border-blue-600 text-blue-600 bg-blue-50"
                                            : "border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Exam Schedule */}
                    <div className="bg-white rounded-lg shadow-sm">
                        {examData[activeTab].length > 0 ? (
                            <div className="space-y-2 p-4">
                                {/* Header */}
                                <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-t-lg">
                                    <div className="text-center">Thời gian</div>
                                    <div className="text-center">Hình thức thi</div>
                                    <div className="text-center">Địa điểm</div>
                                    <div className="text-center">Lệ phí</div>
                                    {/* <div className="text-center">Đăng ký thi</div> */}
                                </div>

                                {/* Exam Items */}
                                {examData[activeTab].map((exam) => (
                                    <div
                                        key={exam.id}
                                        className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-sm md:text-base"
                                    >
                                        {/* Thời gian */}
                                        <div className="text-center">
                                            <p className="font-semibold">{exam.time}</p>
                                            <p className="font-semibold">{exam.date}</p>
                                        </div>
                                        {/* Hình thức thi */}
                                        <div className="text-center font-medium">{exam.format}</div>
                                        {/* Địa điểm */}
                                        <div className="text-center font-medium">{exam.location}</div>
                                        {/* Lệ phí */}
                                        <div className="text-center text-red-600 font-semibold">{exam.fee}</div>
                                        {/* Đăng ký */}
                                        <div className="flex flex-col items-center justify-center">
                                            <button
                                                onClick={() => handleRegister(exam.id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium mb-1"
                                            >
                                                Đăng ký thi
                                            </button>
                                            <p className="text-xs text-gray-500">Hạn: {exam.deadline}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <p>Không có lịch thi {activeTab} trong thời gian này</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-80">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Ôn thi MOS cơ bản</h2>
                        <p className="text-blue-600 font-medium mb-4">Cấp tốc 1 tuần</p>
                        <div className="space-y-2 text-sm mb-4">
                            <p>
                                <span className="font-medium">Thời gian:</span> 11-8-2025
                            </p>
                            <p>
                                <span className="font-medium">Địa điểm:</span> K.A101
                            </p>
                        </div>
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                            Ôn luyện Word, Excel, PowerPoint theo chuẩn quốc tế, bám sát đề thi, mẹo làm bài nhanh, tự tin đạt chứng chỉ ngay lần thi đầu.
                        </p>
                        <button
                            onClick={handleRegisterReview}
                            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors font-medium mb-2">
                            Đăng ký ôn ngay
                        </button>
                        <p className="text-xs text-gray-600 text-center">Hạn đăng ký: 05-08-2025</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
