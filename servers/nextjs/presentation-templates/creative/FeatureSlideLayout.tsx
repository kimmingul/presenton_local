import React from 'react'
import * as z from "zod";
import { IconSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'creative-feature-slide'
export const layoutName = 'Features Grid'
export const layoutDescription = 'Colorful feature cards with icons.'

const featureSchema = z.object({
    title: z.string().min(3).max(60).default('Amazing Features').meta({
        description: "Section title",
    }),
    features: z.array(z.object({
        title: z.string().min(3).max(40).meta({
            description: "Feature title",
        }),
        description: z.string().min(10).max(100).meta({
            description: "Feature description",
        }),
        icon: IconSchema.meta({
            description: "Feature icon",
        }),
    })).min(3).max(6).default([
        { title: 'Lightning Fast', description: 'Optimized performance that delivers results in milliseconds', icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'lightning bolt speed' } },
        { title: 'Secure & Safe', description: 'Enterprise-grade security protecting your valuable data', icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'shield security lock' } },
        { title: 'Easy to Use', description: 'Intuitive interface designed for everyone', icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'simple interface hand' } },
        { title: 'Always Available', description: '99.9% uptime guarantee with global infrastructure', icon: { __icon_url__: '/static/icons/placeholder.svg', __icon_query__: 'cloud server globe' } },
    ]).meta({
        description: "Features list",
    }),
})

export const Schema = featureSchema

export type FeatureSlideData = z.infer<typeof featureSchema>

interface FeatureSlideLayoutProps {
    data?: Partial<FeatureSlideData>
}

const colors = ['#667eea', '#f093fb', '#4fd1c5', '#f6ad55', '#fc8181', '#68d391'];

const FeatureSlideLayout: React.FC<FeatureSlideLayoutProps> = ({ data: slideData }) => {
    const features = slideData?.features || [
        { title: 'Lightning Fast', description: 'Optimized performance that delivers results in milliseconds', icon: { __icon_url__: '', __icon_query__: '' } },
        { title: 'Secure & Safe', description: 'Enterprise-grade security protecting your valuable data', icon: { __icon_url__: '', __icon_query__: '' } },
        { title: 'Easy to Use', description: 'Intuitive interface designed for everyone', icon: { __icon_url__: '', __icon_query__: '' } },
        { title: 'Always Available', description: '99.9% uptime guarantee with global infrastructure', icon: { __icon_url__: '', __icon_query__: '' } },
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
                    <h2
                        className="text-4xl sm:text-5xl font-bold text-white text-center mb-12"
                    >
                        {slideData?.title || 'Amazing Features'}
                    </h2>

                    {/* Features Grid */}
                    <div className={`flex-1 grid gap-6 ${features.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-2xl p-6 flex flex-col"
                                style={{ background: `${colors[index % colors.length]}20` }}
                            >
                                {/* Icon Circle */}
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                                    style={{ background: colors[index % colors.length] }}
                                >
                                    {feature.icon?.__icon_url__ ? (
                                        <img src={feature.icon.__icon_url__} alt="" className="w-7 h-7 invert" />
                                    ) : (
                                        <span className="text-2xl text-white">✦</span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeatureSlideLayout
