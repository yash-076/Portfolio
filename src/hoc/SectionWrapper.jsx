import React from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles.js'
import { staggerContainer } from '../utils/motion'

const SectionWrapper = (Component, idName) => {
  const HOC = (props) => {
    console.log("Section", idName)
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        id={idName}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}> &nbsp; </span>
        <Component {...props} />
      </motion.section>
  )
}

  return HOC
}

export default SectionWrapper