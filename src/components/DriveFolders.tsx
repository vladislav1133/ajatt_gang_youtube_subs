import React, { useEffect, useState } from 'react';

export const DriveFolders = () => {
  const [folders, setFolders] = useState([]);
  const [folderContents, setFolderContents] = useState([]);

  const API_KEY = 'AIzaSyDJUy3BNIYC0YJzQE8YeWbOq5yyYZCKXvQ'; // Replace with your API key
  const FOLDER_ID = '1rLzXv56a1DzlxKH228ANnUM37hI5KIXr'; // Replace with your folder ID


  useEffect(() => {
    const fetchFoldersAndFiles = async () => {
      try {
        // Step 1: Get subfolders inside main folder
        const folderRes = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`
        );
        const folderData = await folderRes.json();

        if (!folderData.files) {
          console.error('No folders found');
          return;
        }

        // Step 2: For each subfolder, fetch its files
        const foldersWithFiles = await Promise.all(
          folderData.files.map(async (folder: any) => {
            const filesRes = await fetch(
              `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents+and+trashed=false&key=${API_KEY}`
            );
            const filesData = await filesRes.json();

            return {
              id: folder.id,
              name: folder.name,
              files: filesData.files || [],
            };
          })
        );

        setFolderContents(foldersWithFiles as any);
      } catch (error) {
        console.error('Error fetching folder contents:', error);
      }
    };

    fetchFoldersAndFiles();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-info mb-4">AJATT Gang Subs</h2>

      {folderContents.map((folder: any) => (
        <div key={folder.id} className="mb-5">
          <h4 className="text-start text-light mb-3"><span style={{ color: '#786c6c'}}>channel:</span> {folder.name}</h4>

          <div className="list-group">
            {folder.files.map((file: any) => {
              const videoId = file.name.split('__')[0];
              const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              const title = file.name.split('__')[1].replace(/\.srt$/, '');

              return (
                <div key={file.id}
                     className="list-group-item bg-dark text-light d-flex align-items-center justify-content-between">
                  <div className="me-2">
                    <img
                      src={thumb}
                      alt={file.name}
                      className="img-thumbnail"
                      style={{width: '160px', height: 'auto'}}
                    />
                  </div>
                  <div className="d-flex flex-column flex-grow-1">
                    <h6 className="text-start mb-2">{title}</h6>
                    <a
                      style={{ width: '100px'}}
                      href={`https://drive.google.com/file/d/${file.id}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-info"
                    >
                      Download
                    </a>
                  </div>


                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>

  );
};
