
import React from "react";
import "./ProjectDrawer.css";

import { Project } from "../../types/project";

type Props = {
  project: Project;
  onClose: () => void;
  responsibleNames: string[];
};

const ProjectDrawer: React.FC<Props> = ({
  project,
  onClose,
  responsibleNames,
}) => {
  return (
    <div
      className="project-drawer-overlay"
      onClick={onClose}
    >
      <div
        className="project-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="project-drawer-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="project-drawer-content">

          {project.imageUrl && (
            <div className="project-drawer-image-wrapper">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="project-drawer-image"
              />
            </div>
          )}

          <div className="project-drawer-info">

            <h2>{project.name}</h2>

            {project.description && (
              <p className="project-drawer-description">
                {project.description}
              </p>
            )}

            {project.state.name && (
              <div className="project-drawer-column">
                <h4>Estado</h4>

                <div
                  className={`project-status notion-color notion-${project.state.color}`}
                >
                  {project.state.name}
                </div>
              </div>
            )}

            {project.areas.length > 0 && (
              <div className="project-drawer-column">
                <h4>Áreas</h4>

                <div className="project-tags-list">
                  {project.areas.map((area) => (
                    <span
                      key={area.name}
                      className={`notion-color notion-${area.color}`}
                    >
                      {area.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {responsibleNames.length > 0 && (
              <div className="project-drawer-column">
                <h4>Responsable</h4>

                <div className="project-tags-list">
                  {responsibleNames.map((name) => (
                    <span
                        key={name}
                        className="project-responsible-tag"
                      >
                        {name}
                      </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDrawer;
