import { useNavigate } from "react-router-dom"
import SignCard from "../../components/signcard"
import { SignCardList } from "../../constants/SignCardList"
import PageContainer from "../../components/pagecontainer"

function MainPage() {
    const navigate = useNavigate()
    return(
        <PageContainer>
            <div className="h-6"/>
            <div className="flex flex-1 flex-col gap-4">
                <p className="text-2xl font-bold text-black">자음•모음 수화 배우기</p>
                <div className="flex flex-row flex-wrap gap-4">
                    {
                        SignCardList.map((value) => {
                            return (
                                <SignCard 
                                    id={value.id}
                                    imgUrl={value.imgUrl} 
                                    label={value.label}
                                    explan={value.explan}
                                    onClick={() => {
                                        navigate(`/sign/${value.id}`, 
                                            {
                                                replace : false, 
                                                state : {
                                                    imgUrl : value.imgUrl, 
                                                    label : value.label,
                                                    explan : value.explan
                                                }
                                            }
                                        )
                                    }}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </PageContainer>
    )
}

export default MainPage