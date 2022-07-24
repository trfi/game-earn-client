import styles from './Banner.module.css'

export const Banner = () => {
  return (
    <div id='banner' className='relative text-center'>
      <img className='object-cover w-full' src="/images/banner.png" alt="banner" />
    </div>
  )
}