import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";
import { useState, useEffect } from "react";

const STORAGE_KEY = "lab14.Register";

export default function DashboardPage() {
  const [registrants, setRegistrants] = useState<Registrant[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setRegistrants(JSON.parse(raw));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {/* Conditional Rendering + Render Component */}
      <div className="mt-3">
        { registrants.length ===0 ?
          (<span>ยังไม่มีผู้ลงทะเบียน </span>) :
          (
            <>
            <span>ผู้ลงทะเบียนแล้ว({registrants.length} คน)</span>
            <br/>
            <div className="d-flex flex-column gap-2">
              {registrants.map((reg) => (
                <UserRegisterCard key={reg.id} {...reg}/>
              ))}
            </div>
            </>
          )
        }
      </div>
    </div>
  );
}
