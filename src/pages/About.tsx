import { motion } from 'framer-motion';
import { Globe, Brain, Award, Heart } from 'lucide-react';

export default function About() {
  // t function not needed for this page currently

  const values = [
    { icon: Globe, title: 'Accessibility', desc: 'We believe language learning should be accessible to everyone, regardless of background or location.' },
    { icon: Award, title: 'Quality', desc: 'Every lesson is carefully crafted by experienced Chinese language educators and native speakers.' },
    { icon: Brain, title: 'Innovation', desc: 'We use cutting-edge technology to make learning Chinese engaging, effective, and fun.' },
    { icon: Heart, title: 'Community', desc: 'Join a global community of learners supporting each other on their Chinese language journey.' },
  ];

  const stats = [
    { value: '5000+', label: 'Students' },
    { value: '120+', label: 'Lessons' },
    { value: '8', label: 'Levels' },
    { value: '2', label: 'Languages' },
  ];

  const team = [
    { name: 'Dr. Li Wei', role: 'Head of Curriculum', initial: 'LW', color: '#FF3333' },
    { name: 'Amina Hassan', role: 'Arabic Content Lead', initial: 'AH', color: '#3b82f6' },
    { name: 'James Chen', role: 'Tech Lead', initial: 'JC', color: '#10b981' },
    { name: 'Sarah Kim', role: 'UX Designer', initial: 'SK', color: '#8b5cf6' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,51,51,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.h1
            className="font-display font-black text-white mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About NiHao
          </motion.h1>
          <motion.p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our mission is to make Chinese language learning accessible, engaging, and effective for Arabic and English speakers worldwide. We believe everyone should have the opportunity to learn one of the world's most important languages.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-[800px] mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-display font-black text-4xl text-[#FF3333] mb-1">{stat.value}</div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding max-w-[800px]">
        <motion.div
          className="liquid-glass p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-chinese text-6xl text-[#FF3333]/20 block mb-4">使命</span>
          <p className="text-lg leading-relaxed text-white">
            We started NiHao with a simple belief: that language should bring people together, not divide them. By teaching Chinese to Arabic and English speakers, we are building bridges between cultures and opening doors to new opportunities.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-[1000px] mx-auto">
          <motion.h2
            className="font-display font-extrabold text-3xl text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="liquid-glass p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <v.icon size={28} className="text-[#FF3333] mb-4" />
                <h3 className="font-display font-bold text-lg text-white mb-2">{v.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            className="font-display font-extrabold text-3xl text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet the Team
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="liquid-glass p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-display font-bold text-white text-lg"
                  style={{ background: member.color }}
                >
                  {member.initial}
                </div>
                <h4 className="font-display font-bold text-white mb-1">{member.name}</h4>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
