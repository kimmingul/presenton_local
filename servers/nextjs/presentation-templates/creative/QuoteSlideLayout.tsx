import React from 'react'
import * as z from "zod";

export const layoutId = 'creative-quote-slide'
export const layoutName = 'Quote'
export const layoutDescription = 'Inspirational quote with gradient styling.'

const quoteSchema = z.object({
    quote: z.string().min(20).max(250).default('The only way to do great work is to love what you do.').meta({
        description: "Quote text",
    }),
    author: z.string().min(2).max(50).default('Steve Jobs').meta({
        description: "Quote author",
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
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <div
                className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                    fontFamily: "var(--heading-font-family,Poppins)"
                }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 text-[200px] font-serif text-white/10 leading-none">"</div>
                <div className="absolute bottom-10 right-10 text-[200px] font-serif text-white/10 leading-none rotate-180">"</div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center items-center px-20 py-16 text-center">
                    {/* Quote */}
                    <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-relaxed mb-10 max-w-4xl">
                        {slideData?.quote || 'The only way to do great work is to love what you do.'}
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-0.5 bg-white/40" />
                        <span className="text-white/80 text-xl font-medium">
                            {slideData?.author || 'Steve Jobs'}
                        </span>
                        <div className="w-12 h-0.5 bg-white/40" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuoteSlideLayout
