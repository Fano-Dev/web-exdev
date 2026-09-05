import React, {
  useState,
  useEffect,
} from "react";

import "./Projects.css";
import ProjectDrawer from "./ProjectDrawer";

import { getProjects } from "../../services/projectService";
import { Project } from "../../types/project";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const loadProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data);
    } catch (err) {
      console.error(
        "Error obteniendo proyectos:",
        err
      );
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      <section className="projects">

        <div className="projects-header">
          <h2>Proyectos</h2>
        </div>

        <div className="projects-grid">

          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() =>
                setSelectedProject(project)
              }
            >

              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.name}
                />
              )}

              <div className="project-info">

                <h3>
                  {project.name}
                </h3>

                {project.description && (
                  <p>
                    {project.description}
                  </p>
                )}

              </div>

            </div>
          ))}

        </div>

      </section>

      {selectedProject && (
        <ProjectDrawer
          project={selectedProject}
          responsibleNames={selectedProject.responsible}
          onClose={() =>
            setSelectedProject(null)
          }
        />
      )}
    </>
  );
}