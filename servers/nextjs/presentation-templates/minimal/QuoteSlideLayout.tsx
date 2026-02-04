import React from 'react'
import * as z from "zod";

export const layoutId = 'minimal-quote-slide'
export const layoutName = 'Quote'
export const layoutDescription = 'A centered quote with attribution in minimalist style.'

const quoteSchema = z.object({
    quote: z.string().min(20).max(300).default('Design is not just what it looks like and feels like. Design is how it works.').meta({
        description: "The quote text",
    }),
    author: z.string().min(2).max(50).default('Steve Jobs').meta({
        description: "Quote attribution",
    }),
    role: z.string().min(2).max(80).default('Co-founder, Apple Inc.').meta({
        description: "Author's role or title",
    }),
})

export const Schema = quoteSchema

export type QuoteSlideData = z.infer<typeof quoteSchema>

interface QuoteSlideLayoutProps {
    data?: Partial<QuoteSlideData>
}

const QuoteSlideLayout: React.FC<QuoteSlideLayoutProps> = ({ data: slideData }) => {
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
                <div className="h-full flex flex-col justify-center items-center px-20 py-16">
                    {/* Quote Mark */}
                    <div
                        style={{ color: "var(--primary-accent-color,#e0e0e0)" }}
                        className="text-9xl font-serif leading-none mb-4"
                    >
                        "
                    </div>

                    {/* Quote Text */}
                    <blockquote
                        style={{ color: "var(--text-heading-color,#222222)" }}
                        className="text-3xl sm:text-4xl font-light text-center leading-relaxed max-w-4xl mb-10"
                    >
                        {slideData?.quote || 'Design is not just what it looks like and feels like. Design is how it works.'}
                    </blockquote>

                    {/* Attribution */}
                    <div className="flex flex-col items-center gap-1">
                        <span
                            style={{ color: "var(--text-heading-color,#333333)" }}
                            className="text-lg font-medium"
                        >
                            {slideData?.author || 'Steve Jobs'}
                        </span>
                        <span
                            style={{ color: "var(--text-body-color,#888888)" }}
                            className="text-sm uppercase tracking-widest"
                        >
                            {slideData?.role || 'Co-founder, Apple Inc.'}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuoteSlideLayout
