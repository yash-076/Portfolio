import React from 'react'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles';
import { github } from '../assets'
import SectionWrapper  from '../hoc/SectionWrapper.jsx';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ProjectCard = ({index, name, description, tags, image, source_code_link, live_link}) =>{
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    >
      <Tilt 
        options={{
          max: 45,
          scale: 1, 
          speed: 450
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img src={image} alt={name} className='w-full h-full object-cover rounded-2xl' />
          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div 
              onClick={() => window.open(source_code_link, '_blank')}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-secondary/40 ring-1 ring-secondary/40 shadow-[0_0_14px_rgba(145,94,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-2 hover:ring-secondary hover:border-secondary hover:shadow-[0_0_24px_rgba(145,94,255,0.5)]'
            >
              <img src={github} alt="github" className='w-1/2 h-1/2 object-contain' />
            </div>
          </div>
        </div>
        
        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] '>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) =>(
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>#{tag.name}</p>
          ))}
        </div>

        {live_link && (
          <div className='mt-5'>
            <button
              type='button'
              onClick={() => window.open(live_link, '_blank')}
              className='w-full py-3 rounded-xl bg-black-200 text-white font-semibold text-[14px] border border-secondary/40 ring-1 ring-secondary/60 shadow-[0_0_22px_rgba(145,94,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:ring-2 hover:ring-secondary hover:border-secondary hover:shadow-[0_0_30px_rgba(145,94,255,0.55)]'
            >
              Live Demo
            </button>
          </div>
        )}
      </Tilt>
    </motion.div>
  )
}

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          These projects represent my hands-on learning in software development. Each project focuses on real-world problem solving, system design, and practical implementation.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) =>(
          <ProjectCard 
            key={`project-${index}`} 
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, 'work');