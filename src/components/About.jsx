import React from 'react'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'

import { styles } from '../styles.js'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper.jsx'

const ServiceCard = ({ index, title, icon }) =>{
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div 
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)} 
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h flex min-h-[280px] justify-evenly flex-col items-center'
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain'/>
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>
          Introduction
        </p>
        <h2 className={styles.sectionHeadText}>
          Overview
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn( "", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I’m a B.Tech IT student with hands-on experience in full-stack web development and cybersecurity projects. I work mainly with JavaScript, React, Node.js, Python, and FastAPI, and I enjoy building real-time applications like dashboards, chat apps, and security tools. I focus on writing clean code, understanding system design fundamentals, and continuously improving my skills through projects and labs.
      </motion.p>
      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {services.map((service, index)=>(
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, 'about')