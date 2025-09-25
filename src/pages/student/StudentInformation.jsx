import { useEffect, useState } from "react";
import Profile from "../../components/Profile";
import { getProfile } from "../../services/Student/Profie";

const StudentInformation = () => {
  const [dataProfile, setDataProfile] = useState([]);
  useEffect(() => {
    fetchStudentProfile();
  }, []);
  const fetchStudentProfile = async () => {
    let data = await getProfile();
    setDataProfile(data);
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#18181b] transition-colors duration-300 p-4">
      <Profile
        fullName={dataProfile.fullName}
        role={dataProfile.role}
        avatar_url={dataProfile.avatarUrl}
        studentId={dataProfile.studentId}
        school={dataProfile.schoolName}
        gender={dataProfile.gender}
        birthday={dataProfile.birthDate}
        ethnicity={dataProfile.ethnicity}
        idNumber={dataProfile.idNumber}
        idIssueDay={dataProfile.idIssuedDate}
        idIssuePlace={dataProfile.idIssuedPlace}
        email={dataProfile.email}
        phone={dataProfile.phone}
      />
    </div>
  );
};
export default StudentInformation;
