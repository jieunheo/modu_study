import { useState } from "react";

const roles = ["admin", "guest", "user"];

// 가상의 컴포넌트들
const AdminView = () => <div>관리자 대시보드: 모든 정보</div>;
const GuestView = () => (
  <div>
    게스트 대시보드: 로그인이 필요합니다. 잠시 뒤 로그인 페이지로 이동합니다.
  </div>
);
const UserView = () => <div>일반사용자 대시보드: 내 프로젝트 현황</div>;

function SimpleRouter({ userRole }) {
  if (!roles.includes(userRole))
    return <div>알 수 없는 사용자입니다. 로그인 페이지로 이동합니다.</div>;

  if (userRole === roles[0]) {
    return <AdminView />;
  }
  if (userRole === roles[1]) {
    return <GuestView />;
  }
  if (userRole === roles[2]) {
    return <UserView />;
  }
}

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <>
      <ul>
        {roles.map((role) => (
          <li>
            <button id={role} onClick={() => setUserRole(role)}>
              {role}
            </button>
          </li>
        ))}
      </ul>
      <SimpleRouter userRole={userRole} />
    </>
  );
}

export default App;
