const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Hàm này chặn sự kiện click nổi lên lớp nền
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 w-full"
    >
      <div
        onClick={stopPropagation}
        className="bg-white rounded-3xl shadow-lg p-6 relative"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-500 hover:text-red-500 text-3xl font-bold cursor-pointer"
        >
          &times;
        </button>

        {/* Nội dung truyền vào */}
        {children}
      </div>
    </div>
  );
};
export default Modal;
