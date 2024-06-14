import React, { useEffect } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { Authenticator, Collection } from '@aws-amplify/ui-react'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';
// import { Storage } from 'aws-amplify';
import { list } from 'aws-amplify/storage';

export default function Storage_Page() {
    const [file, setFile] = React.useState();
    const [listImg, setListImg] = React.useState([]);
    // const [gallery, setGallery] = React.useState();

    async function GetList() {
        try {
            const result = await list({
                path: ({ identityId }) => `picture-submissions/${identityId}/`,
            });

            setListImg(result.items);
            // let listz = result.items;
            // setGallery(
            //     listz.map((item) => {
            //         console.log(item.path)
            //         return (
            //             <StorageImage path={item.path} />
            //         )
            //     })
            // )
        } catch (error) {
            console.log(error);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
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
                        {/* {listImg.map((item) => {
                            console.log(item.path)
                            return (
                                <StorageImage path={item.path} />
                            )
                        })} */}
                        {listImg.length > 0 &&
                            <Collection
                                items={listImg}
                                type="grid"
                                templateColumns="1fr 1fr 1fr"
                                templateRows="12rem 12rem 12rem"
                            >
                                {(item, index) => {
                                    return (
                                        <StorageImage key={index} path={item.path} />
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