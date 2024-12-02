import { useEffect, useRef } from "react";

interface UtteranceProps {
    rolledNumber: number | null;
    getBingoLetter: (num: number) => string;
    englishVoice: SpeechSynthesisVoice | undefined;
    vietnameseVoice: SpeechSynthesisVoice | undefined;
}

const useBingoSpeech = ({
    rolledNumber,
    getBingoLetter,
    englishVoice,
    vietnameseVoice,
}: UtteranceProps) => {
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (!utteranceRef.current) {
            utteranceRef.current = new SpeechSynthesisUtterance();
            utteranceRef.current.pitch = 1.5;
            utteranceRef.current.rate = 0.8;
        }

        if (rolledNumber !== null) {
            const text = `${getBingoLetter(rolledNumber)}-${rolledNumber}`;

            // Stop any ongoing speech
            window.speechSynthesis.cancel();

            // Create and configure the English utterance
            const englishUtterance = new SpeechSynthesisUtterance(text);
            englishUtterance.lang = "en-US";
            englishUtterance.pitch = 1.5;
            englishUtterance.rate = 1;

            // Use the selected English voice, if available
            if (englishVoice) {
                englishUtterance.voice = englishVoice;
            }

            // Set up the `onend` event to queue the Vietnamese speech
            englishUtterance.onend = () => {
                setTimeout(() => {
                    const vietnameseUtterance = new SpeechSynthesisUtterance(
                        text
                    );
                    vietnameseUtterance.lang = "vi-VN";
                    vietnameseUtterance.pitch = 1.5;
                    vietnameseUtterance.rate = 1;

                    // Use the selected Vietnamese voice, if available
                    if (vietnameseVoice) {
                        vietnameseUtterance.voice = vietnameseVoice;
                    }

                    window.speechSynthesis.speak(vietnameseUtterance);
                }, 100); // Delay of 100ms after English finishes
            };

            // Speak in English
            window.speechSynthesis.speak(englishUtterance);
        }
    }, [rolledNumber, getBingoLetter, englishVoice, vietnameseVoice]);
};

export default useBingoSpeech;
