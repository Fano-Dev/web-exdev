import { useMemo } from "react";
import { Member } from "../../../types/member";
import { MemberOption } from "../../../types/memberOption";

type Params = {
  members: Member[];
  selectedMembers: MemberOption[];
  selectedRoles: string[];
  selectedCareers: string[];
};

export function useMemberFilters({
  members,
  selectedMembers,
  selectedRoles,
  selectedCareers,
}: Params) {

  // Opciones de miembros
  const memberOptions = useMemo(() => {

  let result = members;

  // Filtrar por rol
  if (selectedRoles.length > 0) {

    result = result.filter(member =>
      member.roles.some(role => selectedRoles.includes(role))
    );

  }

  // Filtrar por carrera
  if (selectedCareers.length > 0) {

    result = result.filter(member =>
      selectedCareers.includes(member.career ?? "")
    );

  }

  return result.map(member => ({

    value: member.id,
    label: member.name,
    member

  }));

}, [
  members,
  selectedRoles,
  selectedCareers
]);

  // Opciones de roles
const roleOptions = useMemo(() => {

  let result = members;

  // Filtrar por carrera
  if (selectedCareers.length > 0) {

    result = result.filter(member =>
      selectedCareers.includes(member.career ?? "")
    );

  }

  // Filtrar por miembro
  if (selectedMembers.length > 0) {

    const selectedIds =
      selectedMembers.map(option => option.value);

    result = result.filter(member =>
      selectedIds.includes(member.id)
    );

  }

 const allRoles = result.flatMap(member => member.roles);

return [
  ...new Set(allRoles)
].map(role => ({
  value: role,
  label: role,
}));

}, [
  members,
  selectedCareers,
  selectedMembers,
]);

  // Opciones de carreras
 const careerOptions = useMemo(() => {

  let result = members;

  // Filtrar por rol
  if (selectedRoles.length > 0) {

    result = result.filter(member =>
      member.roles.some(role => selectedRoles.includes(role))
    );

  }

  // Filtrar por miembro
  if (selectedMembers.length > 0) {

    const selectedIds =
      selectedMembers.map(option => option.value);

    result = result.filter(member =>
      selectedIds.includes(member.id)
    );

  }

  return [
    ...new Set(
      result
        .map(member => member.career)
        .filter(Boolean)
    )
  ].map(career => ({
    value: career!,
    label: career!,
  }));

}, [
  members,
  selectedRoles,
  selectedMembers,
]);

  // Cards filtradas
  const filteredMembers = useMemo(() => {

    return members.filter(member => {

      const byMember =
        selectedMembers.length === 0 ||
        selectedMembers.some(
          option => option.value === member.id
        );

      const byRole =
  selectedRoles.length === 0 ||
  member.roles.some(role => selectedRoles.includes(role));

      const byCareer =
        selectedCareers.length === 0 ||
        selectedCareers.includes(member.career ?? "");

      return byMember && byRole && byCareer;

    });

  }, [
    members,
    selectedMembers,
    selectedRoles,
    selectedCareers,
  ]);

  return {
    memberOptions,
    roleOptions,
    careerOptions,
    filteredMembers,
  };
}