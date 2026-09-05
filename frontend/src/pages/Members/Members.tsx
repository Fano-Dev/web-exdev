import MemberCard from "./MemberCard";
import "../Members/css/Members.css";
import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { components } from "react-select";
import MemberDrawer from "./MemberDrawer";
import { Member } from "../../types/member";
import MemberFilters from "./components/MemberFilters";
import { MemberOption } from "../../types/memberOption";
import { useMemberFilters } from "./hooks/useMemberFilters";
import {
  getMembers,
} from "../../services/memberService";

const CustomOption = (props: any) => (
  <components.Option {...props}>
    <img
  src={props.data.member.photoUrl}
  alt={props.data.label}
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
      }}
    />

    <div>
      <div>
        {props.data.label}
      </div>

      <small style={{ opacity: 0.6 }}>
        {props.data.member.roles.join(" · ")} · {props.data.career}
      </small>
    </div>
  </components.Option>
);

const Members: React.FC = () => {

  const [selectedMembers, setSelectedMembers] =
    useState<MemberOption[]>([]);

  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  const [selectedRoles, setSelectedRoles] =
    useState<string[]>([]);

  const [selectedCareers, setSelectedCareers] =
    useState<string[]>([]);

  const [membersData, setMembersData] =
    useState<Member[]>([]);

  const [message, setMessage] =
    useState("");

  const messageTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  // ===========================
  // MOSTRAR MENSAJE
  // ===========================

  const showMessage = (newMessage: string) => {

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    setMessage(newMessage);

    messageTimeoutRef.current = setTimeout(() => {
      setMessage("");
      messageTimeoutRef.current = null;
    }, 3000);
  };

  // ===========================
  // LIMPIAR TIMEOUT
  // ===========================

  useEffect(() => {

    return () => {

      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }

    };

  }, []);

  // ===========================
  // FILTROS
  // ===========================

  const {
    memberOptions,
    roleOptions,
    careerOptions,
    filteredMembers,
  } = useMemberFilters({
    members: membersData,
    selectedMembers,
    selectedRoles,
    selectedCareers,
  });

  // ===========================
  // CARGAR MIEMBROS
  // ===========================
useEffect(() => {
  const loadMembers = async () => {
    try {
      const data = await getMembers();

      setMembersData(data);
    } catch (err) {
      console.error(
        "Error cargando miembros:",
        err
      );

      showMessage(
        "No se pudieron cargar los miembros"
      );
    }
  };

  loadMembers();
}, []);

  return (
    <>
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      <section className="members2">

        <div className="members-header">

          <h6>
            Miembros
          </h6>

          <p className="section-members2">
            Acá podrás encontrarte a ti, a tus compañeros y otras caras relevantes dentro del club.
          </p>

          {/* ========================= */}
          {/* FILTROS                   */}
          {/* ========================= */}

          <MemberFilters
            memberOptions={memberOptions}
            roleOptions={roleOptions}
            careerOptions={careerOptions}

            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}

            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}

            selectedCareers={selectedCareers}
            setSelectedCareers={setSelectedCareers}

            CustomOption={CustomOption}
          />

          {selectedMembers.length === 0 && (
            <p className="members-hint">
              Selecciona miembros para mostrarlos
            </p>
          )}

        </div>

        {/* ========================= */}
        {/* TARJETAS                  */}
        {/* ========================= */}

        <main className="members-main">

          {filteredMembers.map((m) => (

            
              <MemberCard
                key={m.id}
                name={m.name}
                roles={m.roles}
                career={m.career}
                photoUrl={m.photoUrl}
                icon={m.icon}
                onClick={() =>
                  setSelectedMember(m)
                }
              />



          ))}

        </main>

        {/* ========================= */}
        {/* DRAWER                    */}
        {/* ========================= */}

        {selectedMember && (

          <MemberDrawer
            member={selectedMember}

            onClose={() =>
              setSelectedMember(null)
            }
          />

        )}

      </section>
    </>
  );
};

export default Members;