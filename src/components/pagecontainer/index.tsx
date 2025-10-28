import type { ReactNode } from "react";

type PageContainerProps = {
    className ?: string
    children : ReactNode
}

function PageContainer({className, children} : PageContainerProps) {
    return <div className={`
        flex flex-col flex-1 
        mx-4 sm:mx-10 md:mx-20 lg:mx-40
        ${className}
    `}>
        {children}
    </div>;
}

export default PageContainer