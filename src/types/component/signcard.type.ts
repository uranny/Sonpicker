import type { SharedSignType } from "../util/sign.type";

export type SignCardProps = SharedSignType & {
    onClick?: () => void;
};
