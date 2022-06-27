import Image from "next/image"
import slide_1 from "../../public/slide_1.jpg"
import slide_2 from "../../public/slide_2.jpg"
import slide_3 from "../../public/slide_3.jpg"
import Slider from "react-slick"

const Slider_index = () => {
  const settings = {
    dots: false,
    prevArrow: false,
    nextArrow: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <Slider {...settings}>
      <div>
        <Image src={slide_1} alt="slide 1" />
      </div>
      <div>
        <Image src={slide_2} alt="slide 2" />
      </div>
      <div>
        <Image src={slide_3} alt="slide 3" />
      </div>
    </Slider>
  )
}

export default Slider_index
