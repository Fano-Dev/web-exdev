import { Member } from "../../types/member";
import React from "react";
import "./css/MemberDrawer.css";


type Props = {
  member: Member;
  onClose: () => void;
};

const MemberDrawer: React.FC<Props> = ({
  member,
  onClose,
}) => {
  return (
    <div
      className="member-modal-overlay"
      onClick={onClose}
    >
      <div
        className="member-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="modal-content-horizontal">

          <div className="avatar-wrapper">
            <img
              src={member.photoUrl}
              alt={member.name}
              className="modal-avatar"
            />
          </div>

          <div className="modal-info">

            <h2>{member.name}</h2>

            <div className="modal-roles">
              {member.roles.map((role) => (
                <p
                  key={role}
                  className={`modal-role ${role.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {role}
                </p>
              ))}
            </div>

            <p className="modal-career">
              {member.career}
            </p>

            <div className="modal-columns">

              <div className="modal-column">
                <h4>Proyectos</h4>

                <div className="tags project-tags">
                  {(member.projects ?? []).map((p, i) => (
                    <span key={i}>{p}</span>
                  ))}
                </div>
              </div>

              <div className="modal-column">
                <h4>Habilidades</h4>

                <div className="tags">
                  {(member.skills ?? []).map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="modal-column">
                <h4>Áreas de interés</h4>

                <div className="tags interest-tags">
                  {(member.interests ?? []).map((a, i) => (
                    <span key={i}>{a}</span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MemberDrawer;