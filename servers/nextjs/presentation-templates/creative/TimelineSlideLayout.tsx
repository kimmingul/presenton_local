import React from 'react'
import * as z from "zod";

export const layoutId = 'creative-timeline-slide'
export const layoutName = 'Timeline'
export const layoutDescription = 'Colorful timeline for milestones or process steps.'

const timelineSchema = z.object({
    title: z.string().min(3).max(60).default('Our Journey').meta({
        description: "Section title",
    }),
    milestones: z.array(z.object({
        year: z.string().min(2).max(10).meta({
            description: "Year or date",
        }),
        title: z.string().min(3).max(40).meta({
            description: "Milestone title",
        }),
        description: z.string().min(10).max(80).meta({
            description: "Milestone description",
        }),
    })).min(3).max(5).default([
        { year: '2020', title: 'Founded', description: 'Started with a vision to transform the industry' },
        { year: '2021', title: 'First Product', description: 'Launched our flagship product to market' },
        { year: '2022', title: 'Global Expansion', description: 'Expanded to 50+ countries worldwide' },
        { year: '2023', title: '1M Users', description: 'Reached one million active users milestone' },
        { year: '2024', title: 'Series B', description: 'Raised $50M to accelerate growth' },
    ]).meta({
        description: "Timeline milestones",
    }),
})

export const Schema = timelineSchema

export type TimelineSlideData = z.infer<typeof timelineSchema>

interface TimelineSlideLayoutProps {
    data?: Partial<TimelineSlideData>
}

const colors = ['#667eea', '#f093fb', '#4fd1c5', '#f6ad55', '#fc8181'];

const TimelineSlideLayout: React.FC<TimelineSlideLayoutProps> = ({ data: slideData }) => {
    const milestones = slideData?.milestones || [
        { year: '2020', title: 'Founded', description: 'Started with a vision to transform the industry' },
        { year: '2021', title: 'First Product', description: 'Launched our flagship product to market' },
        { year: '2022', title: 'Global Expansion', description: 'Expanded to 50+ countries worldwide' },
        { year: '2023', title: '1M Users', description: 'Reached one million active users milestone' },
        { year: '2024', title: 'Series B', description: 'Raised $50M to accelerate growth' },
    ];

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--card-background-color,#0f0f23)",
                    fontFamily: "var(--heading-font-family,Poppins)"
                }}
            >
                <div className="h-full flex flex-col px-14 py-10">
                    {/* Title */}
                    <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-12">
                        {slideData?.title || 'Our Journey'}
                    </h2>

                    {/* Timeline */}
                    <div className="flex-1 flex items-center">
                        <div className="w-full relative">
                            {/* Timeline Line */}
                            <div className="absolute top-6 left-0 right-0 h-1 bg-white/20 rounded-full" />
                            <div
                                className="absolute top-6 left-0 h-1 rounded-full"
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(90deg, #667eea, #f093fb, #4fd1c5, #f6ad55, #fc8181)',
                                }}
                            />

                            {/* Milestones */}
                            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${milestones.length}, 1fr)` }}>
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        {/* Dot */}
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
                                            style={{ background: colors[index % colors.length] }}
                                        >
                                            {milestone.year}
                                        </div>

                                        {/* Content */}
                                        <div className="mt-6 text-center">
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-white/60 text-sm leading-relaxed">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimelineSlideLayout
