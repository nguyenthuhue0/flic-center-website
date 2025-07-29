# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


#MaterialsForm.jsx
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MaterialsForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    subCategory: '',
    topic: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Sidebar - Same as MaterialsDashboard */}
        <aside className="w-80 bg-slate-800 text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-white overflow-hidden">
                <img 
                  src="/instructor-avatar.jpg" 
                  alt="Instructor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
                  <span>👤 GIẢNG VIÊN</span>
                </div>
                <h2 className="text-lg font-semibold">NGUYỄN VĂN B</h2>
              </div>
            </div>
            {/* Navigation menu same as MaterialsDashboard */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
              LẬP TRÌNH C++ - TS. HUỲNH NGỌC THỌ
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-6">Thông tin tài liệu</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiêu đề
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="title"
                          placeholder="You course title"
                          value={formData.title}
                          onChange={handleInputChange}
                          maxLength={80}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-400">
                          {formData.title.length}/80
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtitle
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="subtitle"
                          placeholder="You course subtitle"
                          value={formData.subtitle}
                          onChange={handleInputChange}
                          maxLength={120}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-2 text-sm text-gray-400">
                          {formData.subtitle.length}/120
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Course Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="programming">Lập trình</option>
                          <option value="toeic">TOEIC</option>
                          <option value="computer">Tin học</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Course Sub-category
                        </label>
                        <select
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select...</option>
                          <option value="cpp">C++</option>
                          <option value="java">Java</option>
                          <option value="python">Python</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Topic
                      </label>
                      <textarea
                        name="topic"
                        placeholder="What is primarily taught in your course?"
                        value={formData.topic}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Content Management Panel */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-red-600">Contents</h3>
                    <button className="text-gray-400 hover:text-gray-600">∧</button>
                  </div>
                  
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2">
                      <span>🎥</span>
                      <span>Video</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2">
                      <span>📎</span>
                      <span>Attach File</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2">
                      <span>📝</span>
                      <span>Captions</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2">
                      <span>📖</span>
                      <span>Description</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2">
                      <span>📋</span>
                      <span>Lecture Notes</span>
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                >
                  Lưu
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="text-gray-600 hover:text-gray-800">Hủy</button>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MaterialsForm;


#MaterialsDetail.jsx
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MaterialsDetail = () => {
  const materials = [
    {
      id: 1,
      type: 'online-class',
      title: 'Google meet',
      icon: '📄',
      hasLink: true
    },
    {
      id: 2,
      type: 'curriculum',
      title: 'Create account on webflow.pdf',
      size: '17 MB',
      icon: '📄',
      downloadable: true
    },
    {
      id: 3,
      type: 'slides',
      title: 'Slides.ppt',
      size: '12.6 MB',
      icon: '📄',
      downloadable: true
    }
  ];

  const handleDownload = (materialId) => {
    console.log('Downloading material:', materialId);
    // Implement download logic here
  };

  const handleOpenLink = (materialId) => {
    console.log('Opening link for:', materialId);
    // Implement link opening logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Sidebar - Same as other components */}
        <aside className="w-80 bg-slate-800 text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-white overflow-hidden">
                <img 
                  src="/instructor-avatar.jpg" 
                  alt="Instructor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
                  <span>👤 GIẢNG VIÊN</span>
                </div>
                <h2 className="text-lg font-semibold">NGUYỄN VĂN B</h2>
              </div>
            </div>
            {/* Navigation menu same as other components */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-red-600 text-center">
              LẬP TRÌNH C++ - TS. HUỲNH NGỌC THỌ
            </h1>

            {/* Online Class Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center space-x-2">
                <span>📅</span>
                <span>Lớp học online</span>
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📄</span>
                  <span className="font-medium">Google meet</span>
                </div>
                <button 
                  onClick={() => handleOpenLink(1)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
                >
                  Link
                </button>
              </div>
            </div>

            {/* Curriculum Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center space-x-2">
                <span>📚</span>
                <span>Giáo trình</span>
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <div className="font-medium">Create account on webflow.pdf</div>
                    <div className="text-sm text-gray-500">17 MB</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownload(2)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium flex items-center space-x-2"
                >
                  <span>⬇</span>
                  <span>Download File</span>
                </button>
              </div>
            </div>

            {/* Outline Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center space-x-2">
                <span>📋</span>
                <span>Đề cương</span>
              </h2>
              <div className="text-center py-8 text-gray-500">
                Chưa có nội dung
              </div>
            </div>

            {/* Slides Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center space-x-2">
                <span>🎯</span>
                <span>Slide</span>
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <div className="font-medium">Slides.ppt</div>
                    <div className="text-sm text-gray-500">12.6 MB</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownload(3)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium flex items-center space-x-2"
                >
                  <span>⬇</span>
                  <span>Download File</span>
                </button>
              </div>
            </div>

            {/* Exercises Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center space-x-2">
                <span>📝</span>
                <span>Bài tập</span>
              </h2>
              <div className="text-center py-8 text-gray-500">
                Chưa có nội dung
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-16">
        <p>Trung tâm tin học ngoại ngữ</p>
      </footer>
    </div>
  );
};

export default MaterialsDetail;