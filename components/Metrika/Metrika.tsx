'use client'

import ym from 'react-yandex-metrika'
import { YMInitializer } from 'react-yandex-metrika'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function Metrika() {
    const router = usePathname()
    useEffect(() => {
        if(typeof window !== 'undefined') {
            ym('hit', router)
        }
    }, [router])
    return (
        <YMInitializer
            accounts={[]}
            options={{webvisor: true, defer: true}}
            version='2'
        />
    )
}