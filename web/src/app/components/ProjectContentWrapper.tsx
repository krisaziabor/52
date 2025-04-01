'use client';

import { useState, useEffect, ReactNode } from 'react';
import PasswordProtection from './PasswordProtection';
import { Project } from '../data/projects';

interface ProjectContentWrapperProps {
  project: Project;
  children: ReactNode;
}

const ProjectContentWrapper: React.FC<ProjectContentWrapperProps> = ({ project, children }) => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  
  // Check if the project is password protected
  useEffect(() => {
    if (project.passwordProtected) {
      const authStatus = localStorage.getItem(`project_auth_${project.id}`);
      setIsAuthorized(authStatus === 'true');
    }
  }, [project]);
  
  // If the project is not password protected, or user is authorized, show the content
  if (!project.passwordProtected || isAuthorized) {
    return <>{children}</>;
  }
  
  // Otherwise, show the password protection screen
  return <PasswordProtection projectId={project.id} projectName={project.name} />;
};

export default ProjectContentWrapper;