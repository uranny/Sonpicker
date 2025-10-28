import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { SignDetailPageProps } from "../../../types/page/sign/detail.type";
import PageContainer from "../../../components/pagecontainer";
import Webcam from "react-webcam";
import XmarkIcon from "../../../assets/xmark.svg";
import SearchIcon from "../../../assets/search.svg";
import { SyncLoader } from "react-spinners";
import Colors from "../../../styles/colors/Colors";

function SignDetailPage() {
    const location = useLocation();
    const props = location.state as SignDetailPageProps;
    const [showExplain, setShowExplain]  = useState(true)
    const [loading, setLoading] = useState(true)

    const webcamRef = useRef<Webcam>(null);
    const handleShowExplain = useCallback(() => {
        setShowExplain(prev => !prev)
    }, [])
    const handleUserMedia = () => {
        console.log('연결 완료')
        setLoading(false)
    }
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
                            bg-[${Colors.second}]/60
                            backdrop-blur-sm
                            z-50 gap-8
                        `}>
                            <SyncLoader loading={loading} color="#FFFFFF"/>
                            <p className="text-2xl font-semibold text-white">
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
