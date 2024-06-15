import React, { useEffect } from 'react';
// import { uploadData } from 'aws-amplify/storage';
import { Authenticator, Button, Card, Collection, Divider, Flex, Heading, Menu, MenuItem, View } from '@aws-amplify/ui-react'
import { StorageImage, StorageManager } from '@aws-amplify/ui-react-storage';
import { list, remove } from 'aws-amplify/storage';
import type { ListPaginateWithPathOutput } from 'aws-amplify/storage';
import { useNavigate } from 'react-router-dom';

export default function Gallery_Page() {
    const navigate = useNavigate();
    // const [file, setFile] = React.useState();
    const [listImg, setListImg] = React.useState<ListPaginateWithPathOutput>();

    async function GetList() {
        try {
            const result = await list({
                path: ({ identityId }) => `picture-submissions/${identityId}/`,
            });

            setListImg(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function DeleteImg(imgpath: string) {
        try {
            await remove({ 
              path: imgpath,
              // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
            });
            GetList();
          } catch (error) {
            console.log('Error ', error);
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
                <main style={{marginTop: '1rem'}}>
                    <Flex direction={'row'} alignItems="center" justifyContent="space-between" style={{paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
                        <Heading level={5}>{user?.signInDetails?.loginId}'s Gallery</Heading>
                        <Menu 
                            menuAlign="end"
                            style={{}}
                        >
                            <MenuItem onClick={() => navigate('/')}>
                                ToDo List
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/translate')}>
                                Translate
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={signOut}>
                                Sign Out
                            </MenuItem>
                        </Menu>
                    </Flex>
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
                            onUploadSuccess={GetList}
                        />
                        <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
                        {listImg?.items &&
                            <Collection
                                items={listImg.items}
                                type="list"
                                direction="row"
                                gap="1rem"
                                maxWidth={'41rem'}
                                wrap="wrap"
                            >
                                {(item, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            borderRadius="medium"
                                            maxWidth="20rem"
                                            variation="outlined"
                                        >
                                            <StorageImage key={index} alt={'pic'+index} path={item.path} />
                                            <View>
                                                <Divider padding="xs" />
                                                <Button 
                                                    style={{marginTop: '0.5rem', width: '100%'}} 
                                                    variation="primary" 
                                                    colorTheme="warning"
                                                    onClick={()=> DeleteImg(item.path)}
                                                >
                                                    Delete
                                                </Button>
                                            </View>
                                        </Card>
                                    )
                                }}
                            </Collection>
                        }
                        </div>
                    </div>
                </main>
            )}
        </Authenticator>
        
    )
}