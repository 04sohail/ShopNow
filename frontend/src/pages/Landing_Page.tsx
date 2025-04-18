import Footer from '../components/Footer_section'
import Header from '../components/Header_section'
import Landing_page_section from '../components/Landing_page_section'

const landing_Page = () => {
  const user = localStorage.getItem("toastFlag")
  if (!user) {
    localStorage.setItem("toastFlag", "false")
  }

  return (
    <>
      <Header />
      <Landing_page_section />
      <Footer />
    </>
  )
}

export default landing_Page