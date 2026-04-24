import { memo } from "react"

function BestSeller() {
    return (
        <div className=" absolute left-2 top-4 lg:top-5.5 z-5">
            <span className="bg-[#262626] w-18 h-7.75 lg:w-22.75 lg:h-11 rounded-[20px] px-2 text-sm lg:text-base text-[#F2C975] text-nowrap align-middle items-center justify-center">
                Best Seller
            </span>
        </div>
    )
}

export default memo(BestSeller)