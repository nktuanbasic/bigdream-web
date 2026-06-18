import fs from 'fs';
import path from 'path';

export interface ProjectRoom {
  name: string;
  images: string[];
}

export interface ProjectData {
  id: string; // url slug (e.g. can-ho-binh-duong)
  title: string; // original name (e.g. Căn Hộ Bình Dương)
  thumbnail: string; // path to the thumbnail image
  rooms: ProjectRoom[];
}

// Simple slug generator for Vietnamese
function generateSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllProjects(): ProjectData[] {
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const projectFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const projects: ProjectData[] = [];

  for (const folderName of projectFolders) {
    const projectPath = path.join(projectsDir, folderName);
    const projectFiles = fs.readdirSync(projectPath, { withFileTypes: true });
    
    // Find thumbnail (a file in the root of the project folder)
    let thumbnail = '';
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const thumbnailFile = projectFiles.find(file => 
      file.isFile() && imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );
    
    if (thumbnailFile) {
      // Need to encode the URI components to handle spaces and accents in URLs
      thumbnail = `/projects/${encodeURIComponent(folderName)}/${encodeURIComponent(thumbnailFile.name)}`;
    } else {
      thumbnail = '/assets/placeholder.jpg'; // fallback
    }

    // Find rooms (subdirectories)
    const roomFolders = projectFiles.filter(file => file.isDirectory());
    const rooms: ProjectRoom[] = [];

    for (const roomFolder of roomFolders) {
      const roomPath = path.join(projectPath, roomFolder.name);
      const roomFiles = fs.readdirSync(roomPath, { withFileTypes: true });
      const images = roomFiles
        .filter(file => file.isFile() && imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext)))
        .map(file => `/projects/${encodeURIComponent(folderName)}/${encodeURIComponent(roomFolder.name)}/${encodeURIComponent(file.name)}`);
      
      if (images.length > 0) {
        rooms.push({
          name: roomFolder.name,
          images
        });
      }
    }

    projects.push({
      id: generateSlug(folderName),
      title: folderName,
      thumbnail,
      rooms
    });
  }

  return projects;
}

export function getProjectById(id: string): ProjectData | null {
  const all = getAllProjects();
  return all.find(p => p.id === id) || null;
}
