import React from 'react'
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'minimal-image-text-slide'
export const layoutName = 'Image with Text'
export const layoutDescription = 'Split layout with image on one side and text content on the other.'

const imageTextSchema = z.object({
    title: z.string().min(3).max(60).default('About Us').meta({
        description: "Section title",
    }),
    description: z.string().min(20).max(400).default('We are a team of passionate individuals dedicated to creating innovative solutions that make a difference in peoples lives.').meta({
        description: "Main description text",
    }),
    image: ImageSchema.default({
        __image_url__: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
        __image_prompt__: 'Modern minimalist office workspace'
    }).meta({
        description: "Supporting image",
    }),
})

export const Schema = imageTextSchema

export type ImageTextSlideData = z.infer<typeof imageTextSchema>

interface ImageTextSlideLayoutProps {
    data?: Partial<ImageTextSlideData>
}

const ImageTextSlideLayout: React.FC<ImageTextSlideLayoutProps> = ({ data: slideData }) => {
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
                <div className="h-full flex">
                    {/* Left - Image */}
                    <div className="w-1/2 h-full">
                        <img
                            src={slideData?.image?.__image_url__ || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80'}
                            alt={slideData?.image?.__image_prompt__ || slideData?.title || ''}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right - Content */}
                    <div className="w-1/2 h-full flex flex-col justify-center px-14">
                        {/* Accent Line */}
                        <div
                            style={{ background: "var(--primary-accent-color,#000000)" }}
                            className="w-12 h-1 mb-8"
                        />

                        {/* Title */}
                        <h2
                            style={{ color: "var(--text-heading-color,#111111)" }}
                            className="text-4xl sm:text-5xl font-light tracking-tight mb-8"
                        >
                            {slideData?.title || 'About Us'}
                        </h2>

                        {/* Description */}
                        <p
                            style={{ color: "var(--text-body-color,#555555)" }}
                            className="text-lg sm:text-xl font-light leading-relaxed"
                        >
                            {slideData?.description || 'We are a team of passionate individuals dedicated to creating innovative solutions that make a difference in peoples lives.'}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageTextSlideLayout
