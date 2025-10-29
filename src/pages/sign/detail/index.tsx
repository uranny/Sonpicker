import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { SignDetailPageProps } from "../../../types/page/sign/detail.type";
import PageContainer from "../../../components/pagecontainer";
import Webcam from "react-webcam";
import XmarkIcon from "../../../assets/xmark.svg";
import SearchIcon from "../../../assets/search.svg";
import { SyncLoader } from "react-spinners";
import Colors from "../../../styles/colors/Colors";

import * as tmPose from "@teachablemachine/pose";
import { mod } from "@tensorflow/tfjs";

function SignDetailPage() {
    const location = useLocation();
    const props = location.state as SignDetailPageProps;

    const [showExplain, setShowExplain]  = useState(true)
    const [loading, setLoading] = useState(true)
    const [successLogged, setSuccessLogged] = useState(false);
    const [model, setModel] = useState<tmPose.CustomPoseNet | null>(null)
    const [maxPred, setMaxPred] = useState<{className : string, probability : number} | null>(null)

    const webcamRef = useRef<Webcam>(null);
    const rafId = useRef<number>(0)

    const handleShowExplain = useCallback(() => {
        setShowExplain(prev => !prev)
    }, [])

    const handleUserMedia = () => {
        console.log('연결 완료')
        setLoading(false)
    }

    const loadModel = useCallback(async () => {
        const URL = import.meta.env.VITE_MODEL_URL
        const modelURL = URL + 'model.json'
        const metadataURL = URL + "metadata.json";
        const loadedModel = await tmPose.load(modelURL, metadataURL)
        setModel(loadedModel)
        await detectPose()
    }, [])
    const detectPose = async () => {
        const currentWebcam = webcamRef.current;
        if (!model || !currentWebcam) return;
    
        const video = currentWebcam.video;
        if (video && video.readyState === 4) {
            const { pose, posenetOutput } = await model.estimatePose(video);
            const prediction = await model.predict(posenetOutput);
    
            // 📊 유사도 콘솔 출력
            console.clear();
            console.group("📊 자세 유사도");
            prediction.forEach((p) => {
                console.log(`${p.className}: ${(p.probability * 100).toFixed(2)}%`);
            });
            console.groupEnd();
    
            // 가장 높은 확률
            const max = prediction.reduce(
                (prev, current) => (prev.probability > current.probability ? prev : current),
                prediction[0]
            );
            setMaxPred(max);
    
            // SuccessPose 감지 시 한 번만 로그
            if (max.className === "SuccessPose" && max.probability > 0.8 && !successLogged) {
                console.log("✅ 자세 감지 성공!");
                setSuccessLogged(true);
            }
    
            if (max.className !== "SuccessPose") {
                setSuccessLogged(false);
            }
        }
    
        rafId.current = requestAnimationFrame(detectPose);
    };
    

    useEffect(() => {
        loadModel()
    })

    useEffect(() => {
        detectPose()
    }, [model])

    return (
        <PageContainer className="pt-16">
            <div
                className="
                    relative 
                    w-full h-[700px]
                    bg-white rounded-xl overflow-hidden shadow-2xl m-auto
                "
            >
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    onUserMedia={handleUserMedia}
                    className="w-full h-[700px] object-cover"
                    videoConstraints={{
                        facingMode: "user",
                    }}
                />
                {
                    loading && (
                        <div className={`
                            absolute inset-0
                            flex flex-col justify-center items-center
                            bg-white
                            backdrop-blur-sm
                            z-50 gap-8
                        `}>
                            <SyncLoader loading={loading} color={Colors.primary}/>
                            <p className={`text-2xl font-semibold text-[${Colors.primary}]`}>
                                로딩 중...
                            </p>
                        </div>
                    ) 
                }
                {
                    showExplain ? (
                        <div
                            className="
                                flex flex-row gap-6 absolute
                                bg-slate-100/80 backdrop-blur-sm rounded-2xl border-2 border-white
                                bottom-4 right-4 p-4 ml-4 mt-4
                                animate-slideUp
                            "
                        >
                            <img className="rounded-lg w-24 " src={props.imgUrl} />
                            <div className="flex flex-col gap-1 max-w-[480px] mt-1">
                                <div className="flex flex-row justify-between">
                                    <p className="text-[1.25rem] text-black font-semibold cursor">{`대응 표현 : '${props.label}'`}</p>
                                    <img className="cursor-pointer"  src={XmarkIcon} width={24} height={24} onClick={handleShowExplain}/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[1rem] text-black font-medium">{`표현 설명`}</p>
                                    <p className="text-sm text-gray-700 font-medium">{`${props.explan}`}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="
                                flex flex-row gap-6 absolute
                                bg-slate-100/80 backdrop-blur-sm rounded-2xl border-2 border-white
                                bottom-4 right-4 p-4 ml-4 mt-4
                                animate-slideUp
                            "
                        >
                            <img className="cursor-pointer" src={SearchIcon} width={24} height={24} onClick={handleShowExplain}/>
                        </div>
                    )
                }
            </div>
        </PageContainer>
    );
}

export default SignDetailPage;
