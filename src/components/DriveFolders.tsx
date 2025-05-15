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
    <div>
      <h2>AJATT Gang Subs</h2>
      {folderContents.map((folder: any) => (
        <div key={folder.id} style={{ marginBottom: '1.5rem' }}>
          <h3>{folder.name}</h3>
          <ul>
            {folder.files.map((file: any) => {
              const videoId = file.name.split('_')[0];
              const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`


              const title = file.name.split('_')[1].replace(/\.srt$/, '');
              return (
                <>

                  <img
                    src={thumb}
                    alt={file.name}
                    width={160}
                    height="auto"
                    style={{display: 'block', marginBottom: '0.5rem'}}
                  />
                  <li key={file.id}>
                    <div>{title}</div>
                    <a
                      href={`https://drive.google.com/file/d/${file.id}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      download
                    </a>
                  </li>
                </>

              )
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
