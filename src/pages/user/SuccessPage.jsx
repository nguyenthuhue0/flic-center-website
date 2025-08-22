import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate()
    useEffect(() => {
        // Tạo canvas pháo bông
        const canvas = document.createElement("canvas");
        canvas.id = "fireworks";
        canvas.style.position = "fixed";
        canvas.style.top = 0;
        canvas.style.left = 0;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = 9999;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        function createFirework(x, y) {
            const colors = ["#ff0043", "#ffea00", "#00ffea", "#ff9900", "#00ff55"];
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x,
                    y,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    radius: Math.random() * 3 + 2,
                    angle: Math.random() * 2 * Math.PI,
                    speed: Math.random() * 5 + 2,
                    life: 100,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, index) => {
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed + 0.5;
                p.life -= 1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                if (p.life <= 0) particles.splice(index, 1);
            });
        }

        function loop() {
            draw();
            requestAnimationFrame(loop);
        }
        loop();

        // Bắn pháo bông mỗi 500ms
        const interval = setInterval(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5
            );
        }, 500);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", resizeCanvas);
            document.body.removeChild(canvas);
        };
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="p-10 bg-white rounded-2xl shadow-xl text-center">
                <h1 className="text-red-600 text-4xl font-bold mb-6">
                    Đăng ký thành công
                </h1>
                <button className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition"
                onClick={() => navigate("/login")}
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    );
}
