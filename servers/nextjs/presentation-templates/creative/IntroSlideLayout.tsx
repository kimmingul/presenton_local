import React from 'react'
import * as z from "zod";

export const layoutId = 'creative-intro-slide'
export const layoutName = 'Creative Intro'
export const layoutDescription = 'Bold, colorful title slide with gradient background.'

const introSlideSchema = z.object({
    title: z.string().min(3).max(60).default('Think Different').meta({
        description: "Main title",
    }),
    subtitle: z.string().min(5).max(120).default('Innovative ideas that change the world').meta({
        description: "Subtitle",
    }),
    tagline: z.string().min(2).max(40).default('2025 Edition').meta({
        description: "Small tagline or date",
    }),
})

export const Schema = introSlideSchema

export type IntroSlideData = z.infer<typeof introSlideSchema>

interface IntroSlideLayoutProps {
    data?: Partial<IntroSlideData>
}

const IntroSlideLayout: React.FC<IntroSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, var(--primary-accent-color,#667eea) 0%, var(--primary-accent-color,#764ba2) 50%, var(--primary-accent-color,#f093fb) 100%)",
                    fontFamily: "var(--heading-font-family,Poppins)"
                }}
            >
                {/* Decorative Circles */}
                <div className="absolute top-[-100px] right-[-100px] w-80 h-80 rounded-full bg-white/10" />
                <div className="absolute bottom-[-150px] left-[-100px] w-96 h-96 rounded-full bg-white/5" />
                <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-white/10" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center items-center px-16 py-12 text-center">
                    {/* Tagline */}
                    <span className="text-white/70 text-sm uppercase tracking-[0.3em] mb-6">
                        {slideData?.tagline || '2025 Edition'}
                    </span>

                    {/* Title */}
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-tight mb-8">
                        {slideData?.title || 'Think Different'}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl sm:text-2xl text-white/80 font-light max-w-2xl">
                        {slideData?.subtitle || 'Innovative ideas that change the world'}
                    </p>

                    {/* Decorative Line */}
                    <div className="mt-12 w-24 h-1 bg-white/40 rounded-full" />
                </div>
            </div>
        </>
    )
}

export default IntroSlideLayout
