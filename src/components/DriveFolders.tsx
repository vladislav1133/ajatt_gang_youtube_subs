import React, { useEffect, useState } from 'react';

export const DriveFolders = () => {
  const [folders, setFolders] = useState([]);

  const API_KEY = 'AIzaSyDJUy3BNIYC0YJzQE8YeWbOq5yyYZCKXvQ'; // Replace with your API key
  const FOLDER_ID = '1rLzXv56a1DzlxKH228ANnUM37hI5KIXr'; // Replace with your folder ID

  useEffect(() => {
    const fetchFolders = async () => {
      const query = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}`;

      try {
        const res = await fetch(query);
        const data = await res.json();

        if (data.files) {
          setFolders(data.files);
        } else {
          console.error('No files found:', data);
        }
      } catch (err) {
        console.error('Error fetching folders:', err);
      }
    };

    fetchFolders();
  }, []);

  return (
    <div>
      <h2>AJATT Gang Subs</h2>
      <ul>
        {folders.map((folder: any) => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
    </div>
  );
};
