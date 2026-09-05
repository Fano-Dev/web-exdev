
import React from "react";
import "./css/MemberCard.css";

type Props = {
  name: string;
  career: string;
  roles: string[];
  photoUrl: string;
  icon: string;
  onClick: () => void;
};

const MemberCard: React.FC<Props> = ({
  name,
  career,
  roles,
  photoUrl,
  icon,
  onClick,
}) => {
  return (
    <div className="member-card" onClick={onClick}>
      <div className="member-info">
        <div className="member-header">
          <h2 className="member-name">{name}</h2>

          <div className="member-roles">
            {roles.map((role) => (
              <p
                key={role}
                className={`member-role ${role
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {role}
              </p>
            ))}
          </div>

          <p className="member-career">{career}</p>
        </div>
      </div>

      <div className="member-photo">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
          />
        ) : icon ? (
          <div className="member-avatar">
            {icon}
          </div>
        ) : (
          <div className="member-avatar">
            👤
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;

