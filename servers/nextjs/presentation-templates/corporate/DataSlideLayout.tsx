import React from 'react'
import * as z from "zod";

export const layoutId = 'corporate-data-slide'
export const layoutName = 'Data Overview'
export const layoutDescription = 'Professional data presentation with metrics and charts placeholder.'

const dataSchema = z.object({
    title: z.string().min(3).max(60).default('Financial Performance').meta({
        description: "Section title",
    }),
    subtitle: z.string().min(5).max(100).default('Year-over-year growth metrics').meta({
        description: "Subtitle",
    }),
    metrics: z.array(z.object({
        value: z.string().min(1).max(20).meta({
            description: "Metric value",
        }),
        label: z.string().min(3).max(40).meta({
            description: "Metric label",
        }),
        change: z.string().min(1).max(20).meta({
            description: "Change indicator (e.g., +15%)",
        }),
    })).min(3).max(4).default([
        { value: '$4.2M', label: 'Total Revenue', change: '+23%' },
        { value: '847', label: 'New Clients', change: '+18%' },
        { value: '94%', label: 'Retention Rate', change: '+5%' },
        { value: '12', label: 'Markets', change: '+3' },
    ]).meta({
        description: "Key metrics",
    }),
})

export const Schema = dataSchema

export type DataSlideData = z.infer<typeof dataSchema>

interface DataSlideLayoutProps {
    data?: Partial<DataSlideData>
}

const DataSlideLayout: React.FC<DataSlideLayoutProps> = ({ data: slideData }) => {
    const metrics = slideData?.metrics || [
        { value: '$4.2M', label: 'Total Revenue', change: '+23%' },
        { value: '847', label: 'New Clients', change: '+18%' },
        { value: '94%', label: 'Retention Rate', change: '+5%' },
        { value: '12', label: 'Markets', change: '+3' },
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
                {/* Header Bar */}
                <div
                    style={{ background: "var(--primary-accent-color,#1e3a8a)" }}
                    className="h-2 w-full"
                />

                <div className="h-full flex flex-col px-14 py-10">
                    {/* Title Section */}
                    <div className="mb-10">
                        <h2
                            style={{ color: "var(--text-heading-color,#1e3a8a)" }}
                            className="text-4xl sm:text-5xl font-bold mb-2"
                        >
                            {slideData?.title || 'Financial Performance'}
                        </h2>
                        <p
                            style={{ color: "var(--text-body-color,#64748b)" }}
                            className="text-lg"
                        >
                            {slideData?.subtitle || 'Year-over-year growth metrics'}
                        </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="flex-1 grid grid-cols-4 gap-6">
                        {metrics.map((metric, index) => (
                            <div
                                key={index}
                                style={{ background: "var(--card-background-color,#f8fafc)", borderColor: "var(--primary-accent-color,#e2e8f0)" }}
                                className="rounded-lg p-6 border flex flex-col justify-center"
                            >
                                <div className="flex items-end gap-2 mb-2">
                                    <span
                                        style={{ color: "var(--text-heading-color,#1e293b)" }}
                                        className="text-4xl sm:text-5xl font-bold"
                                    >
                                        {metric.value}
                                    </span>
                                    <span className="text-green-600 text-lg font-semibold mb-1">
                                        {metric.change}
                                    </span>
                                </div>
                                <span
                                    style={{ color: "var(--text-body-color,#64748b)" }}
                                    className="text-sm uppercase tracking-wide"
                                >
                                    {metric.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataSlideLayout
