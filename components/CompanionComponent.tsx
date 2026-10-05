'use client';

import {useEffect, useRef, useState} from 'react'
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import {addToSessionHistory} from "@/lib/actions/companion.actions";
import {useRouter} from "next/navigation";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const router = useRouter();
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const sessionPromiseRef = useRef<Promise<any> | null>(null);

    useEffect(() => {
        if(lottieRef) {
            if(isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    const recordSession = async () => {
        if (!sessionPromiseRef.current) {
            sessionPromiseRef.current = (async () => {
                try {
                    const res = await addToSessionHistory(companionId);
                    router.refresh();
                    return res;
                } catch (err) {
                    console.error("Failed to record session history:", err);
                }
            })();
        }
        return await sessionPromiseRef.current;
    };

    useEffect(() => {
        const onCallStart = () => {
            sessionPromiseRef.current = null;
            setCallStatus(CallStatus.ACTIVE);
        };

        const onCallEnd = async () => {
            setCallStatus(CallStatus.FINISHED);
            await recordSession();
            router.push('/my-journey');
        }

        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage= { role: message.role, content: message.transcript}
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, [companionId]);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        sessionPromiseRef.current = null;
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
        await recordSession();
        router.push('/my-journey');
    }

    const [copied, setCopied] = useState(false);

    const generateNotesText = () => {
        let text = `# Session Notes: ${name}\n`;
        text += `**Subject:** ${subject} | **Topic:** ${topic}\n`;
        text += `**Date:** ${new Date().toLocaleDateString()}\n\n`;
        text += `## Transcript\n`;
        if (messages.length === 0) {
            text += `*No transcript recorded during this session.*\n`;
        } else {
            messages.slice().reverse().forEach((msg) => {
                const speaker = msg.role === 'assistant' ? (name || 'Companion').split(' ')[0] : (userName || 'User');
                text += `**${speaker}:** ${msg.content}\n\n`;
            });
        }
        return text;
    };

    const handleCopyTranscript = () => {
        const notes = generateNotesText();
        navigator.clipboard.writeText(notes);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExportMarkdown = () => {
        const notes = generateNotesText();
        const blob = new Blob([notes], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${(name || 'Session').replace(/\s+/g, '_')}_Notes.md`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="flex flex-col h-screen">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div className="companion-avatar" style={{ backgroundColor: getSubjectColor(subject)}}>
                        <div
                            className={
                            cn(
                                'absolute transition-opacity duration-1000', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                            )
                        }>
                            <Image src={`/icons/${subject?.toLowerCase()}.svg`} alt={subject} width={150} height={150} className="max-sm:w-fit" />
                        </div>

                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100': 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">{name}</p>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <Image src={userImage || '/icons/check.svg'} alt={userName || 'User'} width={130} height={130} className="rounded-lg object-cover" />
                        <p className="font-bold text-2xl">
                            {userName || 'User'}
                        </p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt="mic" width={36} height={36} />
                        <p className="max-sm:hidden">
                            {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        </p>
                    </button>
                    <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white font-semibold', callStatus === CallStatus.ACTIVE ? 'bg-red-700 hover:bg-red-800' : 'bg-primary hover:bg-neutral-800', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                                ? 'Connecting...'
                                : 'Start Session'
                        }
                    </button>

                    <div className="flex gap-2 w-full mt-2">
                        <button
                            type="button"
                            onClick={handleCopyTranscript}
                            className="flex-1 text-xs py-2 px-3 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg font-medium text-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <Image src="/icons/check.svg" alt="copy" width={14} height={14} />
                            {copied ? 'Copied!' : 'Copy Summary'}
                        </button>
                        <button
                            type="button"
                            onClick={handleExportMarkdown}
                            className="flex-1 text-xs py-2 px-3 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg font-medium text-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            Export Notes (.md)
                        </button>
                    </div>
                </div>
            </section>

            <section className="transcript">
                <div className="flex justify-between items-center mb-2 px-1">
                    <span className="font-semibold text-sm text-neutral-700">Live Transcript & Notes</span>
                    <span className="text-xs text-neutral-500">{messages.length} messages</span>
                </div>
                <div className="transcript-message no-scrollbar">
                    {messages.length === 0 ? (
                        <p className="text-muted-foreground text-sm italic">
                            Start session to begin speaking with {name}...
                        </p>
                    ) : (
                        messages.map((message, index) => {
                            if (message.role === 'assistant') {
                                return (
                                    <p key={index} className="text-lg max-sm:text-sm">
                                        {
                                            (name || 'Companion')
                                                .split(' ')[0]
                                                .replace(/[.,]/g, '')
                                        }: {message.content}
                                    </p>
                                )
                            } else {
                                return <p key={index} className="text-lg max-sm:text-sm">
                                    {userName || 'User'}: {message.content}
                                </p>
                            }
                        })
                    )}
                </div>

                <div className="transcript-fade" />
            </section>
        </section>
    )
}

export default CompanionComponent