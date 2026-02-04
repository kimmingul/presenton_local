import React from 'react'
import * as z from "zod";

export const layoutId = 'corporate-agenda-slide'
export const layoutName = 'Agenda'
export const layoutDescription = 'Professional agenda layout with numbered items.'

const agendaSchema = z.object({
    title: z.string().min(3).max(40).default('Agenda').meta({
        description: "Section title",
    }),
    items: z.array(z.object({
        title: z.string().min(3).max(60).meta({
            description: "Agenda item title",
        }),
        duration: z.string().min(2).max(20).meta({
            description: "Time or duration",
        }),
    })).min(3).max(6).default([
        { title: 'Introduction & Overview', duration: '10 min' },
        { title: 'Q3 Performance Review', duration: '20 min' },
        { title: 'Strategic Initiatives', duration: '25 min' },
        { title: 'Market Analysis', duration: '15 min' },
        { title: 'Q&A Session', duration: '10 min' },
    ]).meta({
        description: "Agenda items",
    }),
})

export const Schema = agendaSchema

export type AgendaSlideData = z.infer<typeof agendaSchema>

interface AgendaSlideLayoutProps {
    data?: Partial<AgendaSlideData>
}

const AgendaSlideLayout: React.FC<AgendaSlideLayoutProps> = ({ data: slideData }) => {
    const items = slideData?.items || [
        { title: 'Introduction & Overview', duration: '10 min' },
        { title: 'Q3 Performance Review', duration: '20 min' },
        { title: 'Strategic Initiatives', duration: '25 min' },
        { title: 'Market Analysis', duration: '15 min' },
        { title: 'Q&A Session', duration: '10 min' },
    ];

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "var(--card-background-color,#ffffff)",
                    fontFamily: "var(--heading-font-family,'Source Sans Pro')"
                }}
            >
                <div className="h-full flex">
                    {/* Left Panel */}
                    <div
                        style={{ background: "var(--primary-accent-color,#1e3a8a)" }}
                        className="w-2/5 h-full flex flex-col justify-center px-12"
                    >
                        <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                            {slideData?.title || 'Agenda'}
                        </h2>
                        <div className="w-16 h-1 bg-white/40" />
                    </div>

                    {/* Right Panel - Items */}
                    <div className="w-3/5 h-full flex flex-col justify-center px-12">
                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-6 py-3 border-b border-gray-100 last:border-0"
                                >
                                    <div
                                        style={{ background: "var(--primary-accent-color,#1e3a8a)" }}
                                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                    >
                                        <span className="text-white font-bold">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <span
                                            style={{ color: "var(--text-heading-color,#1e293b)" }}
                                            className="text-xl font-semibold"
                                        >
                                            {item.title}
                                        </span>
                                    </div>
                                    <span
                                        style={{ color: "var(--text-body-color,#64748b)" }}
                                        className="text-sm font-medium"
                                    >
                                        {item.duration}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgendaSlideLayout
