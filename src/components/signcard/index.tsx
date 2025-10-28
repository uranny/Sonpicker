import type { SignCardProps } from "../../types/component/signcard.type";

function SignCard({id, imgUrl, label, onClick }: SignCardProps) {

    return (
        <button key={id}
            className={`
                flex flex-col
                bg-white
                w-32
                pt-2 pr-2 pl-2 pb-2
                rounded-2xl
                border-slate-200
                border-3
                gap-1
                cursor-pointer
            `}
            onClick={onClick}
        >
            <img
                className="w-24 m-auto rounded-2xl"
                style={{ boxShadow: "inset 0 4px 6px rgba(0,0,0,0.3)" }}
                src={imgUrl}
                alt={label}
            />
            <p className="text-center text-2xl font-semibold text-black">{label}</p>
        </button>
    );
}

export default SignCard;
