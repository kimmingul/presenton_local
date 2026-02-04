import React from 'react'
import * as z from "zod";
import { ImageSchema } from '@/presentation-templates/defaultSchemes';

export const layoutId = 'corporate-team-slide'
export const layoutName = 'Leadership Team'
export const layoutDescription = 'Professional team introduction with photos and titles.'

const teamSchema = z.object({
    title: z.string().min(3).max(40).default('Leadership Team').meta({
        description: "Section title",
    }),
    members: z.array(z.object({
        name: z.string().min(2).max(40).meta({
            description: "Team member name",
        }),
        role: z.string().min(2).max(60).meta({
            description: "Job title or role",
        }),
        image: ImageSchema.meta({
            description: "Profile photo",
        }),
    })).min(3).max(4).default([
        { name: 'Sarah Johnson', role: 'Chief Executive Officer', image: { __image_url__: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', __image_prompt__: 'Professional businesswoman portrait' } },
        { name: 'Michael Chen', role: 'Chief Technology Officer', image: { __image_url__: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', __image_prompt__: 'Professional businessman portrait' } },
        { name: 'Emily Davis', role: 'Chief Financial Officer', image: { __image_url__: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', __image_prompt__: 'Professional woman executive portrait' } },
    ]).meta({
        description: "Team members",
    }),
})

export const Schema = teamSchema

export type TeamSlideData = z.infer<typeof teamSchema>

interface TeamSlideLayoutProps {
    data?: Partial<TeamSlideData>
}

const TeamSlideLayout: React.FC<TeamSlideLayoutProps> = ({ data: slideData }) => {
    const members = slideData?.members || [
        { name: 'Sarah Johnson', role: 'Chief Executive Officer', image: { __image_url__: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', __image_prompt__: '' } },
        { name: 'Michael Chen', role: 'Chief Technology Officer', image: { __image_url__: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', __image_prompt__: '' } },
        { name: 'Emily Davis', role: 'Chief Financial Officer', image: { __image_url__: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', __image_prompt__: '' } },
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
                    {/* Title */}
                    <h2
                        style={{ color: "var(--text-heading-color,#1e3a8a)" }}
                        className="text-4xl sm:text-5xl font-bold mb-12 text-center"
                    >
                        {slideData?.title || 'Leadership Team'}
                    </h2>

                    {/* Team Grid */}
                    <div className={`flex-1 grid gap-8 items-center ${members.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                        {members.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div
                                    style={{ borderColor: "var(--primary-accent-color,#1e3a8a)" }}
                                    className="w-36 h-36 rounded-full overflow-hidden border-4 mb-4"
                                >
                                    <img
                                        src={member.image?.__image_url__ || ''}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3
                                    style={{ color: "var(--text-heading-color,#1e293b)" }}
                                    className="text-xl font-bold mb-1"
                                >
                                    {member.name}
                                </h3>
                                <p
                                    style={{ color: "var(--text-body-color,#64748b)" }}
                                    className="text-sm"
                                >
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamSlideLayout
