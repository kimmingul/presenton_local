import React from 'react'
import * as z from "zod";

export const layoutId = 'minimal-intro-slide'
export const layoutName = 'Intro Slide'
export const layoutDescription = 'A minimalist title slide with clean typography and subtle accent.'

const introSlideSchema = z.object({
    title: z.string().min(3).max(60).default('Presentation Title').meta({
        description: "Main title of the presentation",
    }),
    subtitle: z.string().min(5).max(100).default('A brief description of the topic').meta({
        description: "Subtitle or tagline",
    }),
    presenterName: z.string().min(2).max(50).default('Presenter Name').meta({
        description: "Name of the presenter",
    }),
    presentationDate: z.string().min(2).max(50).default('2025').meta({
        description: "Date of the presentation",
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
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--card-background-color,#fafafa)",
                    fontFamily: "var(--heading-font-family,Inter)"
                }}
            >
                <div className="h-full flex flex-col justify-center items-center px-16 py-12">
                    {/* Accent Line */}
                    <div
                        style={{ background: "var(--primary-accent-color,#000000)" }}
                        className="w-16 h-1 mb-8"
                    />

                    {/* Title */}
                    <h1
                        style={{ color: "var(--text-heading-color,#111111)" }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-light text-center tracking-tight mb-6"
                    >
                        {slideData?.title || 'Presentation Title'}
                    </h1>

                    {/* Subtitle */}
                    <p
                        style={{ color: "var(--text-body-color,#666666)" }}
                        className="text-xl sm:text-2xl font-light text-center max-w-2xl mb-12"
                    >
                        {slideData?.subtitle || 'A brief description of the topic'}
                    </p>

                    {/* Presenter Info */}
                    <div className="flex items-center gap-3 text-sm uppercase tracking-widest">
                        <span style={{ color: "var(--text-body-color,#999999)" }}>
                            {slideData?.presenterName || 'Presenter Name'}
                        </span>
                        <span style={{ color: "var(--text-body-color,#cccccc)" }}>|</span>
                        <span style={{ color: "var(--text-body-color,#999999)" }}>
                            {slideData?.presentationDate || '2025'}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IntroSlideLayout
