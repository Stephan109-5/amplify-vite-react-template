import React from 'react';
import { uploadData } from 'aws-amplify/storage';
import { Authenticator } from '@aws-amplify/ui-react'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';
// import { getUrl } from 'aws-amplify/storage';
import { list } from 'aws-amplify/storage';

try {
  const result = await list({
    path: ({ identityId }) => `picture-submissions/${identityId}/`,
    // Alternatively, path: ({identityId}) => `album/{identityId}/photos/`
  });
  console.log(result);
} catch (error) {
  console.log(error);
}

export default function Storage_Page() {
    const [file, setFile] = React.useState();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <main>
                    <h1>{user?.signInDetails?.loginId}'s Storage</h1>
                    <div>
                        <input type="file" onChange={handleChange} />
                        <button
                            onClick={() =>
                                uploadData({
                                    path: `picture-submissions/${file.name}`,
                                    data: file,
                                })
                            }
                        >
                            Upload
                        </button>
                        <StorageManager
                            acceptedFileTypes={['image/*']}
                            path={({ identityId }) => `picture-submissions/${identityId}/`}
                            maxFileCount={1}
                            isResumable
                        />
                        <StorageImage path={({ identityId }) => `picture-submissions/${identityId}/`}/>
                    </div>
                    <button onClick={signOut}>Sign out</button>
                </main>
            )}
        </Authenticator>
    )
}