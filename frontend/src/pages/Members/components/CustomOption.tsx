import { components } from "react-select";

const CustomOption = (props: any) => (
  <components.Option {...props}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src={props.data.member.photoUrl}
        alt={props.data.label}
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <div>
        <div>
          {props.data.label}
        </div>

        <small style={{ opacity: 0.6 }}>
          {props.data.member.roles.join(" · ")}
        </small>
      </div>
    </div>
  </components.Option>
);

export default CustomOption;