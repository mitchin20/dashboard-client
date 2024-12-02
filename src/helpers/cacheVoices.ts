import { useState, useEffect } from "react";

const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            resolve(voices);
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                resolve(window.speechSynthesis.getVoices());
            };
        }
    });
};

export const useCachedVoices = () => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        console.log("useCachedVoices effect running");
        loadVoices().then((loadedVoices) => setVoices(loadedVoices));
    }, []);

    return voices;
};
