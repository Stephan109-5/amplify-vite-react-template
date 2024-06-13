import React, { useEffect } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { Authenticator } from '@aws-amplify/ui-react'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';
import { Storage } from '@aws-amplify/ui-react';
// import { S3ProviderListOutputItem } from '@aws-amplify/storage';
import { Collection } from '@aws-amplify/ui-react';
// import { getUrl } from 'aws-amplify/storage';
// import { list } from 'aws-amplify/storage';
import { ImageCard } from "./ImageCard";

export default function Storage_Page() {
    const [file, setFile] = React.useState();
    // const [listImg, setListImg] = React.useState();

    const [imageKeys, setImageKeys] = React.useState([]);
    const [images, setImages] = React.useState([]);

    const fetchImages = async () => {
        const { results } = await Storage.list("picture-submissions", { level: "private" })
        console.log('result from fetchImages');
        console.log(results);
        setImageKeys(results);
        const s3Images = await Promise.all(
            results.map(
                async image => await Storage.get(image.key, { level: 'private' })
            )
        );
        console.log(s3Images);
        setImages(s3Images);
    }

    // async function GetList() {
    //     try {
    //         const result = await list({
    //             path: ({ identityId }) => `picture-submissions/${identityId}/`,
    //             // Alternatively, path: ({identityId}) => `album/{identityId}/photos/`
    //         });
    //         console.log(result.items);
    //         // const urlList =  result.items.map(async (item)=> {
    //         //     const url = await getUrl({path: item.path});
    //         //     console.log(url);
    //         //     return url
    //         // })
    //         setListImg(result.items);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        fetchImages();
        // GetList();
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
                        {/* {listImg.map((item) => (
                            <StorageImage path={item.path} />
                        )
                        )}
                        {listImg.map((item) => (
                            <img src={item} />
                        )
                        )} */}

                        <Collection
                            items={images}
                            type="grid"
                            padding="2rem"
                            boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                            maxWidth="1100px"
                            margin="0 auto"
                            justifyContent="center"
                            templateColumns={{
                                base: "minmax(0, 500px)",
                                medium: "repeat(2, minmax(0, 1fr))",
                                large: "repeat(3, minmax(0, 1fr))"
                            }}
                            gap="small"
                        >
                            {(item, index) => (
                                <ImageCard
                                    key={index}
                                    imageKeys={imageKeys}
                                    item={item}
                                    index={index}
                                />
                            )}
                        </Collection>
                    </div>
                    <button onClick={signOut}>Sign out</button>
                </main>
            )}
        </Authenticator>
    )
}