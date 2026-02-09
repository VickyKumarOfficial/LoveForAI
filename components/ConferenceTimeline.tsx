import React, { useState } from "react";
import { Timeline } from "@/components/ui/timeline";

export function ConferenceTimeline() {
  const [selectedDay, setSelectedDay] = useState<'day1' | 'day2'>('day1');

  const day1Data = [
    {
      title: "9:30 AM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">Opening Ceremony</h3>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Join us for the grand opening of LoveForAI Conference 2026. Welcome address and introduction to two days of amazing AI content.
          </p>
          {/* <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60"
              alt="Opening ceremony"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=500&auto=format&fit=crop&q=60"
              alt="Conference welcome"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div> */}
        </div>
      ),
    },
    {
      title: "10:15 AM - 11:00 AM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-brand-crimson">TECHNICAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">BANKING BEYOND BASICS - [with Mr. I. Surya Prakash] [WELLS FARGO]</h4>
          <p className="mb-6 text-xs font-normal text-white/70 md:text-sm">
            Deep dive into modern banking systems and financial technology innovations.
          </p>
          <div className="mb-6 p-4 bg-brand-crimson/10 rounded-lg border-l-4 border-brand-crimson">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-crimson/20 flex items-center justify-center">
                <span className="text-brand-crimson font-bold text-sm">SP</span>
              </div>
              <div>
                <p className="font-semibold text-white">Mr. I. Surya Prakash</p>
                <p className="text-sm text-white/60">Wells Fargo</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "12:15 PM - 1:30 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">LUNCH</h3>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Networking lunch break with delicious food and beverages.
          </p>
        </div>
      ),
    },
    {
      title: "11:15 AM - 12:10 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-brand-crimson">TECHNICAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">INSIDE MONGO DB : DBA EDITION</h4>
          <p className="mb-6 text-xs font-normal text-white/70 md:text-sm">
            Comprehensive look into MongoDB database administration and optimization techniques.
          </p>
        </div>
      ),
    },
    {
      title: "1:45 PM - 2:30 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-brand-crimson">TECHNICAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">IPR BEYOND BASICS</h4>
          <p className="mb-6 text-xs font-normal text-white/70 md:text-sm">
            Understanding Intellectual Property Rights and their importance in the tech industry.
          </p>
          <div className="mb-6 p-4 bg-brand-crimson/10 rounded-lg border-l-4 border-brand-crimson">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-crimson/20 flex items-center justify-center">
                <span className="text-brand-crimson font-bold text-sm">SS</span>
              </div>
              <div>
                <p className="font-semibold text-white">Mr. Subhajit Saha</p>
                <p className="text-sm text-white/60">Resolute IP Services</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "10:00 AM - 12:15 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-orange-400">CULTURAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">FREE FIRE SHOWDOWN</h4>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Gaming tournament and entertainment session.
          </p>
        </div>
      ),
    },
    {
      title: "11:00 AM - 12:00 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-orange-400">CULTURAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">AI PERSONA DESIGN STUDIO</h4>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Creative workshop on designing AI personas and character development.
          </p>
        </div>
      ),
    },
    {
      title: "1:40 PM - 2:30 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-orange-400">CULTURAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">MEME ENGINEERING</h4>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Fun and creative session about internet culture and meme creation.
          </p>
        </div>
      ),
    },
    {
      title: "2:45 PM - 3:45 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-orange-400">CULTURAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">ROOTS & RHYTHMS: FOLK BAND PERFORMANCE</h4>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Live musical performance featuring traditional and contemporary folk music.
          </p>
        </div>
      ),
    },
  ];

  const day2Data = [
    {
      title: "9:30 AM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">DAY 2 begins</h3>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Welcome to the second day of LoveForAI Conference 2026.
          </p>
        </div>
      ),
    },
    {
      title: "10:15 AM - 11:00 AM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-brand-crimson">TECHNICAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">GAME DEV : The Modern Way</h4>
          <p className="mb-6 text-xs font-normal text-white/70 md:text-sm">
            Exploring modern game development techniques and tools.
          </p>
          <p className="text-xs text-white/60 md:text-sm">
            [Inside today's game dev tools - with Mr. Srini Adiraju]
          </p>
        </div>
      ),
    },
    {
      title: "11:15 AM - 12:15 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-brand-crimson">TECHNICAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">MINDS, MACHINES & MORALS</h4>
          <p className="mb-6 text-xs font-normal text-white/70 md:text-sm">
            Exploring the intersection of artificial intelligence, consciousness, and ethics.
          </p>
          <p className="text-xs text-white/60 md:text-sm">
            [EXPERT PANEL, MODERATED LIVE]
          </p>
        </div>
      ),
    },
    {
      title: "12:15 PM - 1:30 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">LUNCH</h3>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Networking lunch break with delicious food and beverages.
          </p>
        </div>
      ),
    },
    {
      title: "1:45 PM - 2:45 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-brand-crimson">TECHNICAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">AGENTIC AI : POWERED BY NVIDIA</h4>
          <p className="mb-6 text-xs font-normal text-white/70 md:text-sm">
            Advanced AI agents and their applications powered by NVIDIA technology.
          </p>
          <p className="text-xs text-white/60 md:text-sm">
            [Curated by Dr. Arpita Gupta]
          </p>
        </div>
      ),
    },
    {
      title: "10:00 AM - 12:15 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-orange-400">CULTURAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">BATTLEGROUND BLITZ</h4>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Competitive gaming tournament and esports showcase.
          </p>
        </div>
      ),
    },
    {
      title: "11:00 AM - 12:00 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-orange-400">CULTURAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">MINDTRAIL</h4>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Mental challenges and brain training activities.
          </p>
        </div>
      ),
    },
    {
      title: "1:30 PM - 3:00 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-orange-400">CULTURAL</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">FRAMES UNCUT</h4>
          <p className="mb-6 text-xs font-normal text-white/70 md:text-sm">
            Short film screening and cinematography showcase.
          </p>
          <p className="text-xs text-white/60 md:text-sm">
            [Winner Short films Screening]
          </p>
        </div>
      ),
    },
    {
      title: "3:00 PM - 4:00 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-blue-400">ENDING THE EVENT WITH</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">Awards and recognition</h4>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Closing ceremony with awards presentation and recognition.
          </p>
        </div>
      ),
    },
    {
      title: "4:00 PM - 4:30 PM",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-blue-400">ENDING THE EVENT WITH</h3>
          <h4 className="text-xl font-semibold mb-4 text-white">Vote of thanks</h4>
          <p className="mb-4 text-xs font-normal text-white/70 md:text-sm">
            Final thanks and farewell to all participants and organizers.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      {/* Timeline Component with day selection */}
      <Timeline 
        data={selectedDay === 'day1' ? day1Data : day2Data} 
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
      />
    </div>
  );
}