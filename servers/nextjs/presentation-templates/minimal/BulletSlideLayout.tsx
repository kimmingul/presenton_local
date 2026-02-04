import React from 'react'
import * as z from "zod";

export const layoutId = 'minimal-bullet-slide'
export const layoutName = 'Bullet Points'
export const layoutDescription = 'Clean bullet points with minimal styling and generous whitespace.'

const bulletSchema = z.object({
    title: z.string().min(3).max(60).default('Key Points').meta({
        description: "Section title",
    }),
    bullets: z.array(z.object({
        text: z.string().min(5).max(150).meta({
            description: "Bullet point text",
        }),
    })).min(3).max(6).default([
        { text: 'First key point with important information' },
        { text: 'Second key point explaining the concept' },
        { text: 'Third key point with additional details' },
        { text: 'Fourth key point summarizing benefits' },
    ]).meta({
        description: "List of bullet points",
    }),
})

export const Schema = bulletSchema

export type BulletSlideData = z.infer<typeof bulletSchema>

interface BulletSlideLayoutProps {
    data?: Partial<BulletSlideData>
}

const BulletSlideLayout: React.FC<BulletSlideLayoutProps> = ({ data: slideData }) => {
    const bullets = slideData?.bullets || [
        { text: 'First key point with important information' },
        { text: 'Second key point explaining the concept' },
        { text: 'Third key point with additional details' },
        { text: 'Fourth key point summarizing benefits' },
    ];

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
                <div className="h-full flex flex-col px-16 py-14">
                    {/* Title */}
                    <h2
                        style={{ color: "var(--text-heading-color,#111111)" }}
                        className="text-4xl sm:text-5xl font-light tracking-tight mb-12"
                    >
                        {slideData?.title || 'Key Points'}
                    </h2>

                    {/* Bullets */}
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        {bullets.map((bullet, index) => (
                            <div key={index} className="flex items-start gap-6">
                                <div
                                    style={{ background: "var(--primary-accent-color,#000000)" }}
                                    className="w-2 h-2 rounded-full mt-3 flex-shrink-0"
                                />
                                <p
                                    style={{ color: "var(--text-body-color,#444444)" }}
                                    className="text-xl sm:text-2xl font-light leading-relaxed"
                                >
                                    {bullet.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BulletSlideLayout
