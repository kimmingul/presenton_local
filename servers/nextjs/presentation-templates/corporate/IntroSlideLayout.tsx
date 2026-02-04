import React from 'react'
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'corporate-intro-slide'
export const layoutName = 'Corporate Intro'
export const layoutDescription = 'Professional title slide with company branding area.'

const introSlideSchema = z.object({
    title: z.string().min(3).max(80).default('Annual Business Review').meta({
        description: "Main title",
    }),
    subtitle: z.string().min(5).max(120).default('Strategic Planning & Growth Initiatives').meta({
        description: "Subtitle",
    }),
    companyName: z.string().min(2).max(50).default('Acme Corporation').meta({
        description: "Company name",
    }),
    date: z.string().min(2).max(50).default('Q4 2025').meta({
        description: "Date or period",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
        __image_prompt__: 'Modern corporate skyscraper building'
    }).meta({
        description: "Background or supporting image",
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
                href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    fontFamily: "var(--heading-font-family,'Source Sans Pro')"
                }}
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={slideData?.image?.__image_url__ || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div
                        style={{ background: "linear-gradient(135deg, var(--primary-accent-color,rgba(30,58,138,0.92)) 0%, var(--primary-accent-color,rgba(59,130,246,0.85)) 100%)" }}
                        className="absolute inset-0"
                    />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between px-16 py-12">
                    {/* Company Name */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                {(slideData?.companyName || 'AC').charAt(0)}
                            </span>
                        </div>
                        <span className="text-white/80 text-lg font-medium tracking-wide">
                            {slideData?.companyName || 'Acme Corporation'}
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                            {slideData?.title || 'Annual Business Review'}
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/80 font-light max-w-3xl">
                            {slideData?.subtitle || 'Strategic Planning & Growth Initiatives'}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end">
                        <span className="text-white/60 text-sm uppercase tracking-widest">
                            {slideData?.date || 'Q4 2025'}
                        </span>
                        <div className="w-24 h-1 bg-white/30" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default IntroSlideLayout
