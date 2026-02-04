import React from 'react'
import * as z from "zod";

export const layoutId = 'minimal-metrics-slide'
export const layoutName = 'Metrics'
export const layoutDescription = 'Display key metrics and numbers with clean minimal styling.'

const metricsSchema = z.object({
    title: z.string().min(3).max(60).default('Key Metrics').meta({
        description: "Section title",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(20).meta({
            description: "Metric value (e.g., 95%, $1.2M, 500+)",
        }),
        label: z.string().min(3).max(50).meta({
            description: "Metric label",
        }),
    })).min(2).max(4).default([
        { value: '95%', label: 'Customer Satisfaction' },
        { value: '$2.4M', label: 'Annual Revenue' },
        { value: '150+', label: 'Enterprise Clients' },
    ]).meta({
        description: "List of metrics",
    }),
})

export const Schema = metricsSchema

export type MetricsSlideData = z.infer<typeof metricsSchema>

interface MetricsSlideLayoutProps {
    data?: Partial<MetricsSlideData>
}

const MetricsSlideLayout: React.FC<MetricsSlideLayoutProps> = ({ data: slideData }) => {
    const metrics = slideData?.metrics || [
        { value: '95%', label: 'Customer Satisfaction' },
        { value: '$2.4M', label: 'Annual Revenue' },
        { value: '150+', label: 'Enterprise Clients' },
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
                        className="text-4xl sm:text-5xl font-light tracking-tight mb-16"
                    >
                        {slideData?.title || 'Key Metrics'}
                    </h2>

                    {/* Metrics Grid */}
                    <div className="flex-1 flex items-center">
                        <div className={`grid gap-8 w-full ${metrics.length === 2 ? 'grid-cols-2' : metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                            {metrics.map((metric, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        style={{ color: "var(--primary-accent-color,#000000)" }}
                                        className="text-6xl sm:text-7xl lg:text-8xl font-light mb-4"
                                    >
                                        {metric.value}
                                    </div>
                                    <div
                                        style={{ color: "var(--text-body-color,#666666)" }}
                                        className="text-lg uppercase tracking-widest"
                                    >
                                        {metric.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MetricsSlideLayout
