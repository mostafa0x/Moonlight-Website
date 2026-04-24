import { memo } from 'react'

function Logo() {
    return (
        <img src="/logo-white.svg" alt="logo" className="w-16 h-16 object-contain" />
    )
}

export default memo(Logo)