import video from '../../assets/img/video.mp4'

function Videos() {

  
  return (
    <div className="relative h-[50dvh] overflow-hidden my-16 flex justify-center items-center">
      {/* ტექსტი */}
      <h2 className="absolute text-center font-colasta w-[90%] text-3xl md:w-auto md:text-4xl lg:text-6xl text-white px-8 py-6 rounded-2xl shadow-lg backdrop-blur-lg bg-white/5 z-10">
        Where the <span className='text-primary'>heart</span> finds its home   
      </h2>

      {/* ვიდეო ფონად */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

export default Videos;
