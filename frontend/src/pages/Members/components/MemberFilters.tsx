import React from "react";
import Select from "react-select";
import { MemberOption } from "../../../types/memberOption";
import "./MemberFilters.css";


type Props = {
  memberOptions: MemberOption[];
  roleOptions: { value: string; label: string }[];
  careerOptions: {value: string; label: string; }[];

  selectedMembers: MemberOption[];
  setSelectedMembers: React.Dispatch<
    React.SetStateAction<MemberOption[]>
  >;

  selectedRoles: string[];
  setSelectedRoles: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  selectedCareers: string[];

  setSelectedCareers:
    React.Dispatch<
      React.SetStateAction<string[]>
    >;
  CustomOption: any;
};

const MemberFilters: React.FC<Props> = ({
  memberOptions,
  roleOptions,
  careerOptions,
  selectedMembers,
  setSelectedMembers,
  selectedRoles,
  setSelectedRoles,
  selectedCareers,
  setSelectedCareers,
  CustomOption,
}) => {
  return (
    <div className="member-filters">

      <Select
        isMulti
        options={memberOptions}
        components={{
          Option: CustomOption
        }}
        className="member-select"
        classNamePrefix="member-select"
        placeholder="Buscar por nombre..."
        value={selectedMembers}
        onChange={(selected) =>
          setSelectedMembers(
            selected ? [...selected] : []
          )
        }
      />

      <Select
        isMulti
        options={roleOptions}
        className="member-select"
        classNamePrefix="member-select"
        placeholder="Filtrar por rol..."
        value={roleOptions.filter(option =>
          selectedRoles.includes(option.value)
        )}
        onChange={(selected) =>
          setSelectedRoles(
            selected
              ? selected.map(option => option.value)
              : []
          )
        }
      />

      <Select
            isMulti
            options={careerOptions}
            className="member-select"
            classNamePrefix="member-select"
            placeholder="Filtrar por carrera..."

            value={
                careerOptions.filter(option =>
                selectedCareers.includes(option.value)
                )
            }

            onChange={(selected) =>
                setSelectedCareers(
                selected
                    ? selected.map(option => option.value)
                    : []
                )
            }
            />

    </div>
  );
};

export default MemberFilters;