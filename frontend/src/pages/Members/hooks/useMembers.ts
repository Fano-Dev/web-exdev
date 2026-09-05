import { useEffect, useState } from "react";
import { Member } from "../../../types/member";
import { getMembers } from "../../../services/memberService";

export function useMembers() {
  const [members, setMembers] =
    useState<Member[]>([]);

  const loadMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (error) {
      console.error(
        "Error cargando miembros:",
        error
      );
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return {
    members,
    setMembers,
    loadMembers,
  };
}