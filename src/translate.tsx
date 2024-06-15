import { Button, Text, TextField, View } from "@aws-amplify/ui-react";
import { useState } from "react";
import { Predictions, TranslateTextOutput } from '@aws-amplify/predictions';

export default function Translate(){
    const [inputTxt, setInputTxt] = useState<string>('');
    const [outputTxt, setOutputTxt] = useState<TranslateTextOutput>();

    async function GetTranslatedTxt() {
        const result = await Predictions.convert({
            translateText: {
              source: {
                text: inputTxt,
                language : "en"
              },
              targetLanguage: "zh-TW"
            }
          })
        console.log(result)
        setOutputTxt(result);
    }
    
    return(
        <View>
            <TextField
                label="Enter text to translate"
                value={inputTxt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    setInputTxt(e.currentTarget.value);
                }}
            />
            <Button onClick={()=>{GetTranslatedTxt();}}>Translate</Button>
            <View>
                <Text>{outputTxt?.text}</Text>
            </View>
        </View>
    )
}