import contactCover from "../assets/zanzibar.jpg";


import img1 from "../assets/about/img1.jpg";
import img2 from "../assets/about/img2.jpg";
import img3 from "../assets/about/img3.jpg";
import icon from "../assets/about/arrow.png";

import camera from "../assets/about/camera.png";
import compas from "../assets/about/compas.png";
import hat from "../assets/about/hat.png";
import passport from "../assets/about/passport.png";


const array = [
  {
    id: 1,
    title: "გამოცდილება და პროფესიონალიზმი",
    description:
      "ჩვენი გამოცდილი გუნდი და სანდო პარტნიორები უზრუნველყოფენ თქვენი მოგზაურობის თითოეული დეტალის მაღალ დონეზე ორგანიზებას.",
  },
  {
    id: 2,
    title: "ინდივიდუალური მიდგომა",
    description:
      "თქვენი სურვილები და პრიორიტეტები ჩვენი მთავარი ამოცანაა. ვქმნით ტურს, რომელიც სრულად შეესაბამება თქვენს ინტერესებსა და ბიუჯეტს.",
  },
  {
    id: 3,
    title: "უსაფრთხოება და ნდობა",
    description:
      "ჩვენი გუნდი მუდმივად ზრუნავს თქვენს უსაფრთხოებასა და კომფორტზე. ვთანამშრომლობთ მხოლოდ სანდო პარტნიორებთან და ვიყენებთ უახლეს ტექნოლოგიებს, რათა უზრუნველვყოთ მშვიდი და უსაფრთხო მოგზაურობა.",
  },
  {
    id: 4,
    title: "დაუვიწყარი გამოცდილებები",
    description:
      "ჩვენ არ გთავაზობთ მხოლოდ ტურს — ჩვენ გთავაზობთ ისტორიებს, შთაბეჭდილებებს და მომენტებს, რომლებიც სამუდამოდ დაგამახსოვრდებათ.",
  },
];

export default function About() {
  return (
    <div className="max-w-[90%] m-auto py-32">
        <h1 className="text-3xl mb-10 md:text-4xl lg:text-5xl font-caps text-[#22afb9] text-center">
            ჩვენს შესახებ
        </h1>

        <div
            className="bg-cover bg-center mb-8 rounded-lg shadow-lg flex flex-col lg:flex-row justify-between items-center lg:items-start h-[300px] px-4 text-white relative overflow-hidden"
            style={{
            backgroundImage: `url(${contactCover})`,
            backgroundAttachment: "fixed",
            }}
        >
            {/* overlay */}
            {/* <div className="absolute inset-0 bg-black/50"></div> */}
        </div>

        <div className="main__content mt-14 flex flex-col xl:items-center lg:flex-row justify-between items-start gap-10 relative xl:w-[1100px] xl2:w-[1200px] xl:m-auto xl:mt-24">
    
            <div className="decor__img hidden xl:block absolute top-0 left-0 w-full h-full">
                <img 
                    className="passport absolute -top-12 -left-24 w-24 h-24" 
                    src={passport} 
                    alt="passport" 
                />
                <img 
                    className="hat absolute -top-8 -right-12 w-16 h-16" 
                    src={hat} 
                    alt="hat" 
                />
                <img 
                    className=" camera absolute -bottom-16 -left-16 w-24 h-24" 
                    src={camera} 
                    alt="camera" 
                />
                <img 
                    className="compas absolute  bottom-0 -right-16 w-24 h-25" 
                    src={compas} 
                    alt="compas" 
                />
            </div>
    
    
            <div className="img__side h-full w-full order-2 lg:order-1 lg:w-1/2 relative xl:-mt-[80px]">
                <div className="img__box">
                    <img className="img1 w-full xl:w-[60%]" src={img1} alt="travel" />
                    <img className="img2 hidden xl:block xl:absolute w-[50%] right-0 top-[30%] border-4 border-white" src={img2} alt="travel" />
                    <img className="img3 hidden xl:block xl:absolute w-[50%] left-[20%] bottom-[-35%] border-4 border-white" src={img3} alt="travel" />
                </div>
            </div>
            <div className="text__side order-1 lg:order-2 lg:w-1/2">
                <div style={{overflow:'hidden'}}>
                    <h3 className="fade4 text-2xl font-caps text-black border-b-2 pb-4 mb-4 border-primary ">დაგეგმეთ ტური ჩვენთან ერთად</h3>
                </div>
                <ul className="flex flex-col gap-8 xl:gap-2">
                    {array.map((item) => (
                        <li key={item.id}>
                            <div>
                                <div className="flex items-center gap-3">
                                    <img src={icon} alt="icon" className="rotate-45" style={{filter: 'brightness(0) saturate(100%) invert(68%) sepia(8%) saturate(4010%) hue-rotate(135deg) brightness(85%) contrast(86%)' }} />
                                    <h4 className="text-1xl font-caps text-primary">{item.title}</h4>  
                                </div>
                                <p className="pt-3 xl:pt-1 xl:text-[15px]">{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    </div>
  )
}
