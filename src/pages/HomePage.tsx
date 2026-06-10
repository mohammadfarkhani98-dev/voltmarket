import { useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import About from '../components/About'
import Bestsellers from '../components/Bestsellers'
import NewProducts from '../components/NewProducts'
import Articles from '../components/Articles'

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up, .fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Hero />
      <Categories />
      <Bestsellers />
      <About />
      <NewProducts />
      <Articles />
    </>
  )
}
