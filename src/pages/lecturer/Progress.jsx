import React from 'react';

const Progress = () => {
    const students = [
        { id: 1, name: 'Nguyễn Văn A', progress: 90, color: 'green' },
        { id: 2, name: 'Nguyễn Văn A', progress: 30, color: 'red' },
        { id: 3, name: 'Nguyễn Văn A', progress: 60, color: 'blue' }
    ];

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial' }}>
            {/* Header */}
            <div style={{
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '20px'
            }}>
                <h3 style={{ margin: '0 0 5px' }}>
                    Danh sách học viên khóa lập trình java - Giảng viên Nguyễn Văn A
                </h3>
                <span>Học viên: 83</span>
            </div>

            {/* Table */}
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                boxShadow: '0 0 4px rgba(0,0,0,0.1)'
            }}>
                <thead>
                    <tr style={{ backgroundColor: 'red', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px', width: '10%' }}>STT</th>
                        <th style={{ padding: '12px', width: '30%' }}>Họ và tên</th>
                        <th style={{ padding: '12px 0 12px 12px', width: '60%' }}>Tiến độ</th> {/* XÍCH TRÁI */}
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={styles.td}>{index + 1}</td>
                            <td style={{ ...styles.td, fontWeight: 'bold' }}>{student.name}</td>
                            <td style={styles.td}>
                                <div style={{ position: 'relative', width: '100%', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '8px' }}>
                                    <div
                                        style={{
                                            ...styles.progressBar,
                                            width: `${student.progress}%`,
                                            backgroundColor: student.color,
                                            height: '100%',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <span
                                        style={{
                                            position: 'absolute',
                                            left: `${student.progress}%`,
                                            top: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: '#000'
                                        }}
                                    >
                                        {student.progress}%
                                    </span>
                                </div>

                            </td>
                        </tr>
                    ))}


                </tbody>

            </table>
        </div>
    );
};

const styles = {
    th: {
        padding: '10px'
    },
    td: {
        padding: '20px',
        verticalAlign: 'middle'
    },
    progressBarWrapper: {
        position: 'relative',
        height: '6px',
        backgroundColor: '#ddd',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    progressBar: {
        position: 'absolute',
        height: '6px',
        borderRadius: '4px',
        left: 0,
        top: 0
    },
    progressBarBg: {
        height: '6px',
        backgroundColor: '#ddd'
    }
};

export default Progress;
