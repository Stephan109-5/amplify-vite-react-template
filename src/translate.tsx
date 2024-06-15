import { Authenticator, Button, Divider, Flex, Heading, Menu, MenuItem, TextAreaField, View } from "@aws-amplify/ui-react";
import { useState } from "react";
import { Predictions, TranslateTextOutput } from '@aws-amplify/predictions';
import { useNavigate } from 'react-router-dom';

export default function Translate() {
    const navigate = useNavigate();

    const [inputTxt, setInputTxt] = useState<string>('');
    const [outputTxt, setOutputTxt] = useState<TranslateTextOutput>();

    async function GetTranslatedTxt() {
        const result = await Predictions.convert({
            translateText: {
                source: {
                    text: inputTxt,
                    language: "en"
                },
                targetLanguage: "zh-TW"
            }
        })
        // console.log(result)
        setOutputTxt(result);
    }

    return (
        <Authenticator>
            {({ signOut }) => (
                <main>
                    <View
                        backgroundColor="var(--amplify-colors-white)"
                        maxWidth="100%"
                        borderRadius="6px"
                        padding={'1rem'}
                    >
                        <Flex justifyContent={'space-between'} marginBottom={'1rem'}>
                            <Heading level={5}>AWS Translator</Heading>
                            <Menu menuAlign="end">
                                <MenuItem onClick={() => navigate('/')}>
                                    ToDo List
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/gallery')}>
                                    Gallery
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={signOut}>
                                    Sign Out
                                </MenuItem>
                            </Menu>
                        </Flex>
                        <Flex direction={'column'} justifyContent={'space-between'} gap={'1rem'} >
                            <TextAreaField
                                width="20rem"
                                label="Enter text to translate in Chinese (Traditional)"
                                value={inputTxt}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setInputTxt(e.currentTarget.value);
                                }}
                            >
                            </TextAreaField>
                            <TextAreaField
                                width="20rem"
                                label="Translated text in Chinese (Traditional)"
                                value={outputTxt?.text}
                                isReadOnly={true}
                            >
                            </TextAreaField>
                        </Flex>
                        <Flex justifyContent={'center'} paddingTop={'1rem'}>
                            <Button onClick={() => { GetTranslatedTxt(); }}>Translate</Button>
                        </Flex>
                    </View>
                </main>
            )}
        </Authenticator>

    )
}