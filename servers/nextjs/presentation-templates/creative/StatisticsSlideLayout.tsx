import React from 'react'
import * as z from "zod";

export const layoutId = 'creative-statistics-slide'
export const layoutName = 'Statistics'
export const layoutDescription = 'Eye-catching statistics with colorful accents.'

const statsSchema = z.object({
    title: z.string().min(3).max(60).default('By The Numbers').meta({
        description: "Section title",
    }),
    stats: z.array(z.object({
        value: z.string().min(1).max(20).meta({
            description: "Statistic value",
        }),
        label: z.string().min(3).max(40).meta({
            description: "Statistic label",
        }),
    })).min(3).max(4).default([
        { value: '10M+', label: 'Happy Users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '150+', label: 'Countries' },
        { value: '24/7', label: 'Support' },
    ]).meta({
        description: "Statistics",
    }),
})

export const Schema = statsSchema

export type StatisticsSlideData = z.infer<typeof statsSchema>

interface StatisticsSlideLayoutProps {
    data?: Partial<StatisticsSlideData>
}

const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4fd1c5 0%, #38b2ac 100%)',
    'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
];

const StatisticsSlideLayout: React.FC<StatisticsSlideLayoutProps> = ({ data: slideData }) => {
    const stats = slideData?.stats || [
        { value: '10M+', label: 'Happy Users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '150+', label: 'Countries' },
        { value: '24/7', label: 'Support' },
    ];

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--card-background-color,#0f0f23)",
                    fontFamily: "var(--heading-font-family,Poppins)"
                }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2" style={{ background: 'linear-gradient(90deg, #667eea, #f093fb, #4fd1c5, #f6ad55)' }} />

                <div className="h-full flex flex-col px-14 py-12">
                    {/* Title */}
                    <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-16">
                        {slideData?.title || 'By The Numbers'}
                    </h2>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-4 gap-8 items-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                {/* Value with gradient text */}
                                <div
                                    className="text-6xl sm:text-7xl font-black mb-4"
                                    style={{
                                        background: gradients[index % gradients.length],
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-white/60 text-lg uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatisticsSlideLayout
