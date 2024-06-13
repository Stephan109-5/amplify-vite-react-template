import React, { useEffect } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { Authenticator } from '@aws-amplify/ui-react'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';
import { getUrl } from 'aws-amplify/storage';
import { list } from 'aws-amplify/storage';

export default function Storage_Page() {
    const [file, setFile] = React.useState();
    const [listImg, setListImg] = React.useState();

    async function GetList(){
        try {
            const result = await list({
                path: ({ identityId }) => `picture-submissions/${identityId}/`,
                // Alternatively, path: ({identityId}) => `album/{identityId}/photos/`
            });
            console.log(result.items);
            const urlList =  result.items.map(async (item)=> {
                const url = await getUrl({path: item.path});
                console.log(url);
                return url
            })
            setListImg(urlList);
        } catch (error) {
            console.log(error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(()=>{
        GetList();
    }, [])

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
                        {listImg.map((item)=> (
                            <StorageImage path={item.path} />
                        )
                        )}
                        {listImg.map((item)=> (
                            <img src={item} />
                        )
                        )}
                    </div>
                    <button onClick={signOut}>Sign out</button>
                </main>
            )}
        </Authenticator>
    )
}