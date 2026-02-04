import React from 'react'
import * as z from "zod";

export const layoutId = 'minimal-table-of-contents'
export const layoutName = 'Table of Contents'
export const layoutDescription = 'Clean table of contents with numbered sections.'

const tocSchema = z.object({
    title: z.string().min(3).max(40).default('Contents').meta({
        description: "TOC title",
    }),
    sections: z.array(z.object({
        title: z.string().min(3).max(60).meta({
            description: "Section title",
        }),
    })).min(3).max(8).default([
        { title: 'Introduction' },
        { title: 'Problem Statement' },
        { title: 'Our Solution' },
        { title: 'Key Features' },
        { title: 'Conclusion' },
    ]).meta({
        description: "List of sections",
    }),
})

export const Schema = tocSchema

export type TOCSlideData = z.infer<typeof tocSchema>

interface TOCSlideLayoutProps {
    data?: Partial<TOCSlideData>
}

const TableOfContentsLayout: React.FC<TOCSlideLayoutProps> = ({ data: slideData }) => {
    const sections = slideData?.sections || [
        { title: 'Introduction' },
        { title: 'Problem Statement' },
        { title: 'Our Solution' },
        { title: 'Key Features' },
        { title: 'Conclusion' },
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
                <div className="h-full flex">
                    {/* Left - Title */}
                    <div className="w-2/5 h-full flex flex-col justify-center px-14 border-r border-gray-200">
                        <h2
                            style={{ color: "var(--text-heading-color,#111111)" }}
                            className="text-5xl sm:text-6xl font-light tracking-tight"
                        >
                            {slideData?.title || 'Contents'}
                        </h2>
                        <div
                            style={{ background: "var(--primary-accent-color,#000000)" }}
                            className="w-16 h-1 mt-8"
                        />
                    </div>

                    {/* Right - Sections */}
                    <div className="w-3/5 h-full flex flex-col justify-center px-14">
                        <div className="space-y-6">
                            {sections.map((section, index) => (
                                <div key={index} className="flex items-center gap-6">
                                    <span
                                        style={{ color: "var(--primary-accent-color,#cccccc)" }}
                                        className="text-3xl font-light w-12"
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        style={{ color: "var(--text-heading-color,#333333)" }}
                                        className="text-2xl font-light"
                                    >
                                        {section.title}
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

export default TableOfContentsLayout
