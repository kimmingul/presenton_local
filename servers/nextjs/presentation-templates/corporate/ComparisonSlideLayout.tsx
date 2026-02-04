import React from 'react'
import * as z from "zod";

export const layoutId = 'corporate-comparison-slide'
export const layoutName = 'Comparison'
export const layoutDescription = 'Side-by-side comparison layout for options or features.'

const comparisonSchema = z.object({
    title: z.string().min(3).max(60).default('Solution Comparison').meta({
        description: "Section title",
    }),
    leftColumn: z.object({
        title: z.string().min(2).max(40).default('Current State').meta({
            description: "Left column header",
        }),
        items: z.array(z.string().min(5).max(80)).min(3).max(5).default([
            'Manual processes taking hours',
            'Disconnected data sources',
            'Limited visibility into metrics',
            'High operational costs',
        ]).meta({
            description: "Left column items",
        }),
    }).meta({
        description: "Left comparison column",
    }),
    rightColumn: z.object({
        title: z.string().min(2).max(40).default('With Our Solution').meta({
            description: "Right column header",
        }),
        items: z.array(z.string().min(5).max(80)).min(3).max(5).default([
            'Automated workflows in minutes',
            'Unified data platform',
            'Real-time analytics dashboard',
            '40% cost reduction',
        ]).meta({
            description: "Right column items",
        }),
    }).meta({
        description: "Right comparison column",
    }),
})

export const Schema = comparisonSchema

export type ComparisonSlideData = z.infer<typeof comparisonSchema>

interface ComparisonSlideLayoutProps {
    data?: Partial<ComparisonSlideData>
}

const ComparisonSlideLayout: React.FC<ComparisonSlideLayoutProps> = ({ data: slideData }) => {
    const leftColumn = slideData?.leftColumn || {
        title: 'Current State',
        items: ['Manual processes taking hours', 'Disconnected data sources', 'Limited visibility into metrics', 'High operational costs'],
    };
    const rightColumn = slideData?.rightColumn || {
        title: 'With Our Solution',
        items: ['Automated workflows in minutes', 'Unified data platform', 'Real-time analytics dashboard', '40% cost reduction'],
    };

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
                    {/* Title */}
                    <h2
                        style={{ color: "var(--text-heading-color,#1e3a8a)" }}
                        className="text-4xl sm:text-5xl font-bold mb-10"
                    >
                        {slideData?.title || 'Solution Comparison'}
                    </h2>

                    {/* Comparison Grid */}
                    <div className="flex-1 grid grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="bg-gray-50 rounded-lg p-8">
                            <h3
                                style={{ color: "var(--text-body-color,#64748b)" }}
                                className="text-xl font-bold mb-6 uppercase tracking-wide"
                            >
                                {leftColumn.title}
                            </h3>
                            <div className="space-y-4">
                                {leftColumn.items.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="text-red-500 text-xl mt-0.5">✕</span>
                                        <span
                                            style={{ color: "var(--text-heading-color,#374151)" }}
                                            className="text-lg"
                                        >
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div
                            style={{ background: "var(--primary-accent-color,#1e3a8a)" }}
                            className="rounded-lg p-8"
                        >
                            <h3 className="text-xl font-bold mb-6 uppercase tracking-wide text-white/80">
                                {rightColumn.title}
                            </h3>
                            <div className="space-y-4">
                                {rightColumn.items.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="text-green-400 text-xl mt-0.5">✓</span>
                                        <span className="text-white text-lg">
                                            {item}
                                        </span>
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

export default ComparisonSlideLayout
