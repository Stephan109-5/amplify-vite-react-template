import React, { useEffect } from 'react';
// import { uploadData } from 'aws-amplify/storage';
import { Authenticator, Collection } from '@aws-amplify/ui-react'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';
import { list } from 'aws-amplify/storage';

export default function Storage_Page() {
    // const [file, setFile] = React.useState();
    const [listImg, setListImg] = React.useState([]);
    // const [gallery, setGallery] = React.useState();

    async function GetList() {
        try {
            const result = await list({
                path: ({ identityId }) => `picture-submissions/${identityId}/`,
            });

            setListImg(result.items);
        } catch (error) {
            console.log(error);
        }
    }

    // const handleChange = (event) => {
    //     setFile(event.target.files[0]);
    // };

    useEffect(() => {
        GetList();
    }, [])

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <main>
                    <h1>{user?.signInDetails?.loginId}'s Storage</h1>
                    <div>
                        {/* <input type="file" onChange={handleChange} />
                        <button
                            onClick={() =>
                                uploadData({
                                    path: `picture-submissions/${file.name}`,
                                    data: file,
                                })
                            }
                        >
                            Upload
                        </button> */}
                        <StorageManager
                            acceptedFileTypes={['image/*']}
                            path={({ identityId }) => `picture-submissions/${identityId}/`}
                            maxFileCount={1}
                            isResumable
                        />
                        {listImg.length > 0 &&
                            <Collection
                                items={listImg}
                                type="grid"
                                templateColumns="1fr 1fr 1fr"
                                templateRows="8rem"
                                gap={'12px'}
                            >
                                {(item, index) => {
                                    return (
                                        <StorageImage key={index} padding={'medium'} width={'8rem'} height={'8rem'} path={item.path} />
                                    )
                                }}
                            </Collection>
                        }

                    </div>
                    <button onClick={signOut}>Sign out</button>
                </main>
            )}
        </Authenticator>
    )
}