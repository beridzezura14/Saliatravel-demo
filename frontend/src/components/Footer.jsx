import video from "../assets/sea.mp4";
import logoFooter from "../assets/img/logo.png";
import fb from "../assets/img/fb.png";
import insta from "../assets/img/insta.png";
import tiktok from "../assets/img/tiktok.png";

export default function Footer() {
  return (
    <footer className="relative w-full text-white overflow-hidden">
      {/* ვიდეო ბექგრაუნდი */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-125 z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
      </video>


      <div className="absolute inset-0 bg-[#000]/30 z-10"></div>


      <div className="relative z-20 w-[90%] mx-auto py-16">
        <div className="grid grid-cols-1 lg:flex lg:justify-between lg:gap-32 mb-10">
          <div>
            <img
              src={logoFooter}
              alt="logo"
              className="w-full lg:w-[100%] mb-4"
            />
            <div className="space-y-2 text-sm mt-6  border-b-2 pb-4 mb-4 lg:border-b-0">
              <p>
                <b>მისამართი</b> – გიორგი ლეონიძის ქ. #2, თბილისი, საქართველო
              </p>
              <p>
                <b>ტელეფონი</b> –{" "}
                <a href="tel:+995557171706" className="hover:text-primary">
                  +995 557 17 17 06
                </a>
              </p>
              <p>
                <b>იმეილი</b> –{" "}
                <a
                  href="mailto:lannasalia@gmail.com"
                  className="hover:text-primary"
                >
                  lannasalia@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Menu */}
          <div className="lg:flex md:gap-16">
            <div className="border-b-2 pb-4 mb-4 lg:border-b-0 lg:w-[150px]">
                <h2 className="text-xl font-caps mb-4">მენიუ</h2>
                <ul className="space-y-2">
                <li><a href="/Home" className="hover:text-primary">მთავარი</a></li>
                <li><a href="/About" className="hover:text-primary">ჩვენს შესახებ</a></li>
                <li><a href="/Tours" className="hover:text-primary">ტურები</a></li>
                <li><a href="/Contact" className="hover:text-primary">საკონტაქტო</a></li>
                </ul>
            </div>

            {/* Working Hours */}
            <div className="lg:w-[300px]">
                <h2 className="text-xl font-caps mb-4">სამუშაო საათები</h2>
                <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <p>ორშაბათი - პარასკევი:</p>
                    <p>11:00 - 18:00</p>
                </div>
                <div className="flex justify-between">
                    <p>შაბათი - კვირა:</p>
                    <p>დაკეტილია</p>
                </div>
                </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100076234376477"
              target="_blank"
              rel="noreferrer"
              className="footer__icon border rounded-full p-3"
            >
              <img src={fb} alt="fb" className="w-6 hover:opacity-80"  />
            </a>
            <a
              href="https://www.instagram.com/saliatravel/"
              target="_blank"
              rel="noreferrer"
              className="footer__icon border rounded-full p-3"
              
            >
              <img src={insta} alt="insta" className="w-6 hover:opacity-80" />
            </a>
            <a
              href="https://www.tiktok.com/@saliatravel?_t=8sR5boVvKbd&_r=1"
              target="_blank"
              rel="noreferrer"
              className="footer__icon border rounded-full p-3"
            >
              <img src={tiktok} alt="tiktok" className="w-6 hover:opacity-80" />
            </a>
          </div>

          {/* Copy text */}
          <p className="text-sm text-gray-300">
            © SaliaTravel all Rights Reserved. 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
