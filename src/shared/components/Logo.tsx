import { memo } from 'react'

function Logo() {
    return (
        <img src="/logo-white.svg" alt="logo" className="w-12 h-12 object-contain" />
    )
}

export default memo(Logo)