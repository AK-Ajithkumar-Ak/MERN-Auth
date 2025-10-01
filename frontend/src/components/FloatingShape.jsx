import {motion} from 'framer-motion';


export const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div 
    className={`position-absolute rounded-circle ${color} ${size} opacity-20 blur-xl`}
    style={{top, left, borderRadius:"100%", width:"110px", height:"100px"}}
    animate={{
        y: ["0%", "100%", "0%"],
				x: ["0%", "100%", "0%"],
				rotate: [0, 360],
    }}
    transition={{
        duration: 20,
        ease:"linear",
        repeat:Infinity,
        delay,
    }}
    aria-hidden="true"
    >
      {/* <h2 className='rounded-pill w-auto w'>a</h2> */}
    </motion.div>
  )
}
